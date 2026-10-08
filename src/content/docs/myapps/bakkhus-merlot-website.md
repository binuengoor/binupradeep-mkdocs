---
title: "Bakkhus Merlot: Migrating a Family Business Website from WordPress to Astro on Cloudflare"
description: A case study in replacing a WordPress site on a rented server with a fast, free-to-host static Astro site that the owner can edit without code.
tags: [astro, cloudflare, migration, wordpress, static-site, cms, case-study]
sidebar:
  label: "Bakkhus Merlot Website"
  order: 11
---

I rebuilt the website for **Bakkhus Merlot Industries**, a family business, moving it from WordPress on a paid cloud server to a static [Astro](https://astro.build) site on Cloudflare. The goal was to cut cost and maintenance to near zero without making the site harder for the owner to update.

- **Live site**: [bakkhusmerlot.com](https://www.bakkhusmerlot.com)
- **Source**: [suresh-bm-site](https://github.com/binuengoor/suresh-bm-site)

## Why Migrate

- **Cost**: a small server plus a WordPress stack is a monthly bill for a brochure site.
- **Maintenance**: a PHP site with plugins needs constant updates and is a regular target for bots. This one had no reason to run code on every request.
- **Speed**: a catalog of product pages is the ideal fit for pre-built static pages served from a CDN.

## What I Built

- **Static site with Astro.** Every page is generated at build time. There is no database, no PHP, no cookies, no analytics and no forms. Contact is by email only.
- **Content as files.** Products, categories, clients, testimonials and page text are plain content files. Adding a product means adding one file, and a new category appears in the filters, footer and brands page automatically.
- **No-code editing.** A browser-based CMS lets the owner edit text and products without touching code. Each save becomes a Git commit, and the site redeploys in about a minute.
- **Cloudflare hosting.** Static assets are served from the edge on the free tier. Every push to `main` deploys, and every pull request gets a preview URL.
- **Placeholders by default.** Until a product photo exists, the site shows a tinted placeholder, so the build never breaks over missing images.

## Migration Details That Mattered

- **301 redirects for old WordPress URLs.** Product, shop, category, feed and admin paths all map to their new equivalents, so existing links and search rankings survive.
- **Email left alone.** Company mail runs on a separate provider, so the cutover touched web records only, and the old host stayed up until the new site was verified.
- **Scraper-resistant contact details.** Email addresses are assembled in the browser, so they are not sitting in the HTML for harvesters.
- **Age notice without cookies.** The age gate this industry needs stores a single flag in local storage.
- **Security and caching headers** are defined in the repo, alongside the content.
- **Image pipeline.** Photos are optimized at build time, and the original WordPress crawl and source images are kept out of Git.

## Result

A fast, secure site that costs nothing to host, has nothing to patch, and can be edited by its owner. It is a small project, but it applies the same habits as the bigger ones: pick boring technology, keep state in files, and make the safe thing the default.
