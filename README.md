# CodeCrush

Interview prep, but with fewer tabs and more reps.

CodeCrush is a small, fully-functional React app that helps you drill common (and intentionally challenging) algorithm + JavaScript interview prompts. It’s organized by topic, searchable, and built around an accordion format where each item expands into a clear prompt plus a corresponding code solution.

## Features

- Topic tabs: Arrays, Trees, Graphs, Dynamic Programming, JavaScript
- Search with keyboard shortcut: `Ctrl+K` focuses search
- Random pick: jumps to a random question in the current category
- Accordion Q&A: short title, expanded prompt + code snippet solution
- Progress tracking: mark solved and persist via `localStorage`

## Tech

- Vite + React + TypeScript
- Tailwind CSS (tokenized via CSS variables)

## Design workflow (Pencil)

The UI was first prototyped in a Pencil `.pen` design file (including palette, spacing, and component layout), then implemented in React/Tailwind to match the design and remain fully interactive.

If you’re reviewing this repo as an interview exercise: the goal is “practice fast, practice often” with a clean UI and real interactions — not a static mock.

## Getting started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
