<div align="center">

# @tc⚡96/biome-config

Shared Biome configuration preset for JavaScript/TypeScript projects.

[![npm version](https://img.shields.io/npm/v/@tc96/biome-config?logo=npm)](https://www.npmjs.com/package/@tc96/biome-config)
[![npm downloads](https://img.shields.io/npm/dw/@tc96/biome-config)](https://www.npmjs.com/package/@tc96/biome-config)

</div>

## Overview

This package provides an opinionated, reusable Biome config you can extend in your projects to get consistent formatting, linting, and Assist actions out of the box.

Highlights:
- Biome Formatter and Linter enabled with sensible defaults
- Assist actions for organize imports, sorted JSX/HTML attributes, and sorted object keys
- Works with VS Code (and any LSP-enabled editor)

## Install

Using pnpm:

```sh
pnpm add -D @tc96/biome-config @biomejs/biome@2.3.4
```

Using npm:

```sh
npm i -D @tc96/biome-config @biomejs/biome@2.3.4
```

Peer dependency: `@biomejs/biome@2.3.4`.

## Quick start

Create `biome.json` in your project root and extend this preset:

```json
{
  "extends": ["@tc96/biome-config"]
}
```

Recommended package.json scripts:

```jsonc
{
  "scripts": {
    "lint:check": "biome check .",              // Lint & diagnostics only
    "lint:fix": "biome check --write .",        // Apply safe fixes (code + formatting)
    "lint:format": "biome format --write .",    // Format only
    "lint:staged": "biome check . --staged --fix", // Fix only staged files (pre-commit)
    "lint:ci": "biome check --error-on-warnings ." // Fail CI on warnings
  }
}
```

If you use `lint-staged` + Husky, you can add (already in this repo):

```jsonc
{
  "lint-staged": {
    "src/**/*.{ts,tsx,js,jsx}": ["biome check --write"],
    "src/**/*.{json}": ["biome format --write"]
  }
}
```

## VS Code (on-save actions)

Add to `.vscode/settings.json` (or User Settings) if you want actions to run on save:

```jsonc
{
  "editor.codeActionsOnSave": {
    "source.fixAll.biome": "explicit",
    "source.organizeImports.biome": "explicit",
    "source.action.useSortedAttributes.biome": "explicit"
  }
}
``;

## What’s included (preset behavior)

The preset enables the following Assist actions and options (excerpt):

```jsonc
{
  "assist": {
    "enabled": true,
    "actions": {
      "source": {
        "organizeImports": {
          "level": "on",
          "options": {
            "groups": [":NODE:", ":ALIAS:", ":PACKAGE:"]
          }
        },
        "useSortedAttributes": "on",
        "useSortedKeys": "on"
      }
    }
  }
}
```

You can customize import groups in your app if needed (e.g. add `:RELATIVE:`). See Biome docs below.

## Links

- npm: https://www.npmjs.com/package/@tc96/biome-config
- Docs: https://biomejs.dev/guides/configure-biome/
- Assist: https://biomejs.dev/assist/
- JS Assist actions: https://biomejs.dev/assist/javascript/actions/
- organizeImports: https://biomejs.dev/assist/actions/organize-imports/
- useSortedAttributes: https://biomejs.dev/assist/actions/use-sorted-attributes/
- Repository: https://github.com/gblsmlo/tc96-biome-config
