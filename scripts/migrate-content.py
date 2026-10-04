#!/usr/bin/env python3
"""One-off migration: MkDocs docs/ -> Astro Starlight src/content/docs/.

Kept in the repo for provenance; safe to delete after cutover.
Run from repo root: python3 scripts/migrate-content.py  (reads legacy-mkdocs/docs)
"""
import json, re, shutil, sys
from pathlib import Path

SRC, DST = Path("legacy-mkdocs/docs"), Path("src/content/docs")
SKIP = {"index.md", "tags.md", ".pages"}

def kebab(part: str) -> str:
    return re.sub(r"[ _]+", "-", part).lower()

def split_fm(text):
    m = re.match(r"---\n(.*?)\n---\n?(.*)", text, re.S)
    return (m.group(1), m.group(2)) if m else ("", text)

def fix_images(body):
    body = body.replace("../assets/images/20241226_openwrt_vlan/", "../../../assets/images/openwrt-vlan/")
    # encode spaces in image URLs; drop attr_list suffixes (loading/width are handled by Astro)
    def img(m):
        alt, url = m.group(1), m.group(2).strip()
        url = url.replace(" ", "%20")
        return f"![{alt}]({url})"
    body = re.sub(r"!\[([^\]]*)\]\(([^)]*)\)(\{[^}]*\})?", img, body)
    return body

MATH_FILES = {"universal-tts", "universal-reader", "event-track-manager", "interval-timer-app"}

def fix_math(body):
    """Inline $...$ math (arithmatex) -> plain Unicode. Only outside code fences/spans."""
    def tex(m):
        e = m.group(1)
        for a, b in ((r"\pm", "±"), (r"\times", "×"), (r"\to", "→")):
            e = e.replace(a, b)
        return e.replace("{", "").replace("}", "").strip()
    parts = re.split(r"(^```.*?^```|`[^`\n]*`)", body, flags=re.S | re.M)
    for k in range(0, len(parts), 2):
        parts[k] = re.sub(r"\$([^$\n]{1,40}?)\$", tex, parts[k])
    return "".join(parts)

def fix_mermaid(body):
    """Quote edge labels containing ()<> so strict Mermaid 11 parsing accepts them."""
    def fence(m):
        return re.sub(r'\|([^|"\n]*[()<>][^|"\n]*)\|', r'|"\1"|', m.group(0))
    return re.sub(r"^```mermaid.*?^```", fence, body, flags=re.S | re.M)

def fix_admonition(body):
    def adm(m):
        kind, title, content = m.group(1), m.group(2), m.group(3)
        content = "\n".join(l[4:] if l.startswith("    ") else l for l in content.splitlines()).strip()
        t = {"info": "note", "note": "note", "tip": "tip", "warning": "caution", "danger": "danger"}.get(kind, "note")
        return f":::{t}[{title}]\n{content}\n:::\n"
    return re.sub(r'!!! (\w+) "([^"]*)"\n((?:\n|    .*\n?)+)', adm, body)

def fix_icons(body):
    # inline icon shortcodes in prose: drop the icon, keep the text/link
    return re.sub(r":(?:material|simple|fontawesome)-[a-z0-9-]+:\s?", "", body)

def fix_tabs(body):
    out, i, lines = [], 0, body.split("\n")
    tabs = []
    def flush():
        nonlocal tabs
        if tabs:
            out.append("<Tabs>")
            for title, content in tabs:
                out.append(f'<TabItem label="{title}">\n')
                out.extend(content)
                out.append("\n</TabItem>")
            out.append("</Tabs>")
            tabs = []
    while i < len(lines):
        m = re.match(r'=== "([^"]+)"\s*$', lines[i])
        if m:
            i += 1
            content = []
            while i < len(lines) and (lines[i].startswith("    ") or lines[i] == ""):
                content.append(lines[i][4:] if lines[i].startswith("    ") else "")
                i += 1
            while content and content[-1] == "":
                content.pop()
            tabs.append((m.group(1), content))
            continue
        if tabs and lines[i].strip() == "":
            i += 1
            continue
        flush()
        out.append(lines[i]); i += 1
    flush()
    return "\n".join(out)

def promote_h1(fm, body):
    """Starlight renders the frontmatter title as the page H1: promote the body H1 to title,
    keep the old short title as the sidebar label, and drop the duplicate heading."""
    m = re.match(r"\s*# (.+?)\s*\n", body)
    t = re.search(r"^title:\s*(.+)$", fm, re.M)
    if not m or not t:
        return fm, body
    old = t.group(1).strip().strip("\"'")
    h1 = m.group(1).strip()
    fm = re.sub(r"^title:.*$", "title: " + json.dumps(h1, ensure_ascii=False), fm, flags=re.M)
    if old != h1:
        fm += "\nsidebar:\n  label: " + json.dumps(old, ensure_ascii=False)
    return fm, body[m.end():].lstrip("\n")

def convert_doc(rel: Path, text: str):
    fm, body = split_fm(text)
    body = fix_images(fix_math(body) if rel.stem in MATH_FILES else body)
    fm, body = promote_h1(fm, body)
    ext = ".md"
    if "=== \"" in body:
        body = fix_tabs(body)
        # MDX: self-close <br>, escape bare "<" in prose outside code fences
        parts = re.split(r"(^```.*?^```|`[^`\n]*`)", body, flags=re.S | re.M)
        for k in range(0, len(parts), 2):
            parts[k] = parts[k].replace("<br>", "<br />")
            parts[k] = re.sub(r"<(?=[0-9=\s])", "&lt;", parts[k])
        body = "".join(parts)
        body = "import { Tabs, TabItem } from '@astrojs/starlight/components';\n\n" + body
        ext = ".mdx"
    body = fix_icons(fix_admonition(fix_mermaid(body)))
    return fm, body, ext

def fix_missing_images(body):
    """Images that never existed in the repo (Flickr thumbnails in tour-de-west) -> plain Flickr links."""
    from urllib.parse import unquote
    def repl(m):
        alt, img, link = m.group(1), unquote(m.group(2)), m.group(3)
        if (SRC / "blog/posts" / img).exists():
            return m.group(0)
        return f"[📷 {alt or 'Photo'}]({link})"
    body = re.sub(r"\\\[/?caption[^\]]*\\\]", "", body)  # legacy WordPress [caption] shortcodes
    def fallback(m):
        alt, img = m.group(1), unquote(m.group(2))
        fid = re.match(r"images/(\d+)_\w+_z\.jpg$", img)
        if (SRC / "blog/posts" / img).exists() or not fid:
            return m.group(0)
        return f"[📷 {alt or 'Photo'}](https://www.flickr.com/photos/128677822@N03/{fid.group(1)}/)"
    body = re.sub(r'\[!\[([^\]]*)\]\(([^)]+)\)\]\((https?://[^\s)]+)(?:\s+"[^"]*")?\)', repl, body)
    return re.sub(r'!\[([^\]]*)\]\(([^)]+)\)', fallback, body)

def convert_post(text):
    fm, body = split_fm(text)
    cats = re.search(r"categories:\s*\[([^\]]*)\]", fm)
    tags = re.search(r"tags:\s*\[([^\]]*)\]", fm)
    items = [t.strip() for t in ((cats.group(1) if cats else "") + "," + (tags.group(1) if tags else "")).split(",") if t.strip()]
    fm = re.sub(r"^(categories|tags|slug|draft):.*\n?", "", fm, flags=re.M)
    fm += "\ntags: [" + ", ".join(dict.fromkeys(items)) + "]"
    fm = re.sub(r"\n{2,}", "\n", fm).strip()
    body = fix_images(body)
    body = fix_missing_images(body)
    body = re.sub(r"<!--\s*more\s*-->", "<!-- excerpt -->", body)
    return fm, body

def main():
    n = 0
    for p in sorted(SRC.rglob("*")):
        if p.is_dir() or p.name in SKIP or p.relative_to(SRC).parts[0] in ("stylesheets",):
            continue
        rel = p.relative_to(SRC)
        if rel.parts[0] == "assets":
            continue
        if rel.parts[:2] == ("blog", "index.md"):
            continue
        if rel.parts[:2] == ("blog", "posts"):
            sub = rel.relative_to("blog/posts")
            if sub.parts[0] == "images":
                dest = DST / "blog" / sub
                dest.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(p, dest)
                continue
            text = p.read_text()
            fm, body = convert_post(text)
            slug = re.search(r"^slug:\s*(\S+)", split_fm(text)[0], re.M)
            name = (slug.group(1) if slug else re.sub(r"^\d{4}-\d{2}-\d{2}-", "", p.stem))
            dest = DST / "blog" / f"{name}.md"
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_text(f"---\n{fm}\n---\n\n{body.lstrip()}")
            n += 1
            continue
        if p.suffix != ".md":
            continue
        fm, body, ext = convert_doc(rel, p.read_text())
        dest = DST.joinpath(*[kebab(x) for x in rel.parent.parts], kebab(rel.stem) + ext)
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(f"---\n{fm}\n---\n\n{body.lstrip()}")
        n += 1
    print(f"migrated {n} files")

main()
