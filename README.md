# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

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
