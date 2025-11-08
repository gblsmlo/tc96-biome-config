# @tc⚡96/biome-config
Shared configuration file for projects [Biome.js](https://biomejs.dev/guides/configure-biome/)

## Prerequisites
Before installing `@tc96/biome-config`, ensure you have the following installed:

1. **Node.js** 
2. **Biome.js**

## 📦 Installation
Using pnpm

```sh
pnpm add -D @tc96/biome-config
```

Using npm
```sh
npm install --save-dev @tc96/biome-config
```

Using yarn
```sh
yarn add -D @tc96/biome-config
```

## 🛠️ Usage
After installing `@tc96/biome-config`, create a `biome.json` file in the project root and the config in `extends`, like this: 

<project-root>/biome.json
```sh
{
  "extends": ["@tc96/biome-config"]
}
```

Add now, add scripts to your package.json if you haven't already:
```json
"scripts": {
  "lint": "biome check",
  "lint:fix": "biome check . --write",
  "lint:staged": "biome check . --staged --write",
  "lint:ci": "biome ci",
}
```

## Assist

Biome Assist is the engine that performs automatic code transformations and code actions. It exposes code actions via LSP (VS Code, Zed, etc.) and can:

- Apply all safe fixes ("fix all")
- Run specific targeted actions (e.g. organize imports, sort JSX/HTML attributes, sort object keys)
- Help maintain style and consistency without stacking multiple overlapping tools

It works whenever the Biome LSP server is active in your editor. You decide which actions run automatically on save, or trigger them manually through the code actions menu.

### VS Code configuration (workspace or user)

Add the following to your project `.vscode/settings.json` (or your global user settings) to run actions on save:

```jsonc
{
  "editor.codeActionsOnSave": {
    // Apply all safe Biome fixes
    "source.fixAll.biome": "explicit",
    // Organize and group imports according to biome.json configuration
    "source.organizeImports.biome": "explicit",
    // Sort JSX/HTML attributes
    "source.action.useSortedAttributes.biome": "explicit"
  }
}
```

Use "explicit" to avoid running potentially expensive actions implicitly. Add or remove actions as needed.

## JavaScript Assist Actions

Actions specific to JavaScript/TypeScript that improve ordering, cleanliness, and readability.

### organizeImports

Groups, sorts, and normalizes import declarations. Your `biome.json` defines groups:

```jsonc
{
  "assist": {
    "actions": {
      "source": {
        "organizeImports": {
          "level": "on",
          "options": {
            "groups": [":NODE:", ":ALIAS:", ":PACKAGE:"]
          }
        }
      }
    },
    "enabled": true
  }
}
```

Groups used:
- `:NODE:` native Node.js modules (`fs`, `path`, etc.)
- `:ALIAS:` aliased paths (e.g. `@/utils/...`)
- `:PACKAGE:` external packages from node_modules

You can add other tokens (e.g. `:RELATIVE:` for relative imports). The order in the array defines the final block order.

To enable automatic execution in VS Code we include `source.organizeImports.biome` in `editor.codeActionsOnSave`.

### useSortedAttributes

Sorts attributes in JSX/HTML elements for consistency (e.g. className, disabled, id, type, onClick). In the project it's enabled simply as:

```jsonc
{
  "assist": {
    "actions": {
      "source": {
        "useSortedAttributes": "on"
      }
    }
  }
}
```

Transformation example:

Before:
```jsx
<button onClick={handleClick} disabled={true} className="btn" id="submit" type="submit">Send</button>
```

After:
```jsx
<button className="btn" disabled={true} id="submit" type="submit" onClick={handleClick}>Send</button>
```

### Other relevant actions

- `useSortedKeys` (also enabled) sorts object keys to improve readability and produce stable diffs.
