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