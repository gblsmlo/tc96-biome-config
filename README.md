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

## VS Code Integration

You can configure your editor to automatically fix issues and apply specific actions on save.

### Fix all issues on save

To automatically fix all fixable issues on save, add the following to your VS Code `settings.json`. You can do this at the workspace level (`.vscode/settings.json`) or globally in your user settings.

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.biome": "explicit"
  }
}
```

### Apply specific assist actions on save

Biome has "assist actions" that can be configured to run on save. Each action has a specific code. For example, the `organizeImports` action has the code `source.organizeImports.biome`.

You can add these codes to your `settings.json` to have them run on save.

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.biome": "explicit",
    "source.organizeImports.biome": "explicit"
  }
}
```

You can find the code for each action in the Biome documentation.