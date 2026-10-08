---
title: "LogicMix: AI Vocal Chain Engineering for Logic Pro"
description: A native Swift 6 macOS tool that designs vocal chains from a plain-English sonic intent, using only the plugins installed on the Mac, and injects the settings straight into Logic Pro.
tags: [audio, logic-pro, swift, macos, ai-agents, mcp, mixing]
sidebar:
  label: "LogicMix"
  order: 2
---

**LogicMix** is a macOS tool for audio engineers that designs and applies vocal chains in Apple Logic Pro. Describe what you want ("modern pop vocal, tight low end, opto compression"), and it proposes a full channel strip from the plugins that are actually installed on your Mac, then sets their parameters inside Logic.

It is the project where my two worlds meet: ten years of mixing habits on one side and the agent tooling from [Life OS](life-os.md) on the other.

*Source is kept private for now. This page describes the design.*

## The Problem

A vocal chain is a long list of small decisions: which compressor, in what order, how fast the attack, how much saturation, which reverb goes on a parallel bus. Generic AI advice fails here in two ways. It recommends plugins you do not own, and it hands you numbers you still have to type into a dozen skeuomorphic knobs.

## How It Works

1. **Scan**: LogicMix inventories the Audio Unit plugins installed on the machine, plus Apple's stock processors. The result is a strict whitelist, so it can never suggest something you do not have.
2. **Understand**: it classifies each plugin by sonic role (a fast peak-catching compressor versus an optical leveler, a plate reverb versus a short room), using web evidence and a language model.
3. **Plan**: given your intent and the track, it designs a chain with signal-flow logic baked in. Time-based effects go on parallel aux returns to protect transients, and dynamics are staged serially, with a fast catch followed by smooth leveling.
4. **Review**: the plan is shown as a terminal signal-flow diagram with parameter cards before anything touches Logic.
5. **Refine**: you critique it conversationally ("cut 3 dB at 400 Hz", "slower attack"), see a diff of what changed, and can undo or redo any step.
6. **Inject**: the approved plan is written into Logic Pro, reporting plugins inserted separately from parameters configured, so a partial run is labelled as partial.

## Highlights

- **Whitelist-bounded**: recommendations come only from verified local plugins.
- **Studio-style terminal console**: an interactive wizard with track inspection, presets, signal-flow graphs and one-key injection.
- **Several ways in**: the console, a scriptable CLI with JSON output, a local REST API and an MCP server, so my agents can drive it too.
- **Reliable injection**: parameters are set through Logic's native Controls view as numbers, instead of by dragging virtual knobs with the mouse.
- **Persistent sessions**: refinement history survives restarts.

## Engineering Notes

- **Swift 6, package-first.** The code is split into small libraries (models, hardware scanner, track inspector, chain engineer, DAW injector, settings, server), so each concern can be tested alone.
- **Headless verification suite.** A single test runner exercises the scanner, planner and injection logic without opening Logic.
- **Models are configuration, not code.** The language model and the search service are plugged in through settings, in line with the rest of my stack.
- **Plan, then apply.** Refining only changes the plan. Nothing reaches the session until I approve it.
