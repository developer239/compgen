# Composable Generators

![release](https://github.com/developer239/compgen/workflows/release/badge.svg)

> Replace your big boilerplate repositories with small composable generators.

_@compgen_ is alternative to Yeoman and other generators that help you to kickstart new projects, prescribe best practices and tools to help you stay productive.

This library is unique though because **_@compgen_ generators are small and composable**. You can use generators separately to generate small chunks of code, or you can compose them together so that you can easily create bigger and more opinionated codebase. 

## Core Packages

You can use these to build your own generators. All packages are written in TypeScript and designed to be easy to use.

|Type          | Package                                         | Version                                       | 
|------------- | ----------------------------------------------- | ----------------------------------------------
|Library Core  | [@compgen/core](packages/core/core) | [![@compgen/core][core-badge]][core-npm] |  

## Generators

Multiple micro generators composed into robust generators. These generators are useful for opinionated codebase setup. For example when we are setting up CRA the first thing we do is to remove service worker and install code quality tools.

|Type          | Package                                         | Version                                       | 
|------------- | ----------------------------------------------- | ----------------------------------------------
|Macro | [@compgen/code-quality](packages/macro-generators/code-quality) | [![@compgen/code-quality][cc-badge]][cc-npm] |  
|Macro | [@compgen/cra-full](packages/macro-generators/cra-full) | [![@compgen/cra-full][cra-full-badge]][cra-full-npm] |    
|Macro | [@compgen/nestjs-full](packages/macro-generators/nestjs-full) | [![@compgen/nestjs-full][nest-full-badge]][nest-full-npm] |    
|Macro | [@compgen/nextjs-full](packages/macro-generators/nextjs-full) | [![@compgen/nextjs-full][next-full-badge]][next-full-npm] |    

## Micro Generators

You can easily selectively add code quality tools and other useful libraries to your existing codebase.

|Type          | Package                                         | Version                                       | 
|------------- | ----------------------------------------------- | ----------------------------------------------
|Micro | [@compgen/browserlist](packages/micro-generators/browserlist) | [![@compgen/browserlist][bl-badge]][bl-npm] |
|Micro | [@compgen/create-react-app](packages/micro-generators/create-react-app) | [![@compgen/create-react-app][cra-badge]][cra-npm] |
|Micro | [@compgen/editor-config](packages/micro-generators/editor-config) | [![@compgen/editor-config][ef-badge]][ef-npm] | 
|Micro | [@compgen/eslint](packages/micro-generators/eslint) | [![@compgen/eslint][es-badge]][es-npm] |
|Micro | [@compgen/git-hooks](packages/micro-generators/git-hooks) | [![@compgen/git-hooks][gh-badge]][gh-npm] |
|Micro | [@compgen/heroku](packages/micro-generators/heroku) | [![@compgen/heroku][he-badge]][he-npm] |
|Micro | [@compgen/nestjs](packages/micro-generators/nestjs) | [![@compgen/nestjs][nest-badge]][nest-npm] |
|Micro | [@compgen/nextjs](packages/micro-generators/nextjs) | [![@compgen/nextjs][next-badge]][next-npm] |
|Micro | [@compgen/prettier](packages/micro-generators/prettier) | [![@compgen/prettier][prettier-badge]][prettier-npm] |
|Micro | [@compgen/stylelint](packages/micro-generators/stylelint) | [![@compgen/stylelint][stylelint-badge]][stylelint-npm] |
|Micro | [@compgen/ts-node](packages/micro-generators/ts-node) | [![@compgen/ts-node][tsnode-badge]][tsnode-npm] |

## Examples

### Minimal micro generator

This is how many lines of code you have to write to add prettier to all your projects in the future:

```js
// src/templates/.prettierrc.js

module.exports = require('@linters/prettier-config')
```

```ts
// src/index.ts

import path from 'path'
import { builder, execute } from '@compgen/core'

export const createPrettierSchema = () => {
  const schema = builder('prettier')

  schema.addFolder({
    name: 'prettier',
    source: path.join(__dirname, 'templates'),
  })

  schema.addScript('format', "prettier --write '*/**/*.{ts,tsx,css,md,json}'")
  schema.addDevDependencies(['prettier', '@linters/prettier-config'])

  return schema.toJson()
}

const projectFolder = '.'
execute(createPrettierSchema(), projectFolder)
```

### Composing multiple micro generators

We can easily use existing micro generators and bundle them together into bigger generator.

#### Micro generators

- [@compgen/editor-config](/packages/micro-generators/editor-config)
- [@compgen/eslint](/packages/micro-generators/eslint)
- [@compgen/prettier](/packages/micro-generators/prettier)
- [@compgen/stylelint](/packages/micro-generators/stylelint)

#### Generator implementation

```ts
import { AppType, builder } from '@compgen/core'
import { createEditorConfigSchema } from '@compgen/editor-config'
import { createEslintSchema } from '@compgen/eslint'
import { createPrettierConfig } from '@compgen/prettier'
import { createStylelintWebConfig } from '@compgen/stylelint'

export const createWebCodeQualitySchema = () => {
  const schema = builder('codequality')
  const hasPrettier = true

  schema.combineSchema(createEditorConfigSchema())
  schema.combineSchema(createEslintSchema({ appType: AppType.WEB }))
  schema.combineSchema(createPrettierConfig({ appType: AppType.WEB }))
  schema.combineSchema(createStylelintWebConfig({ hasPrettier }))

  return schema.toJson()
}

const projectFolder = '.'
execute(createWebCodeQualitySchema(), projectFolder)
```

[core-badge]: https://badge.fury.io/js/%40compgen%2Fcore.svg
[core-npm]: https://badge.fury.io/js/%40compgen%2Fcore

[cc-badge]: https://badge.fury.io/js/%40compgen%2Fcode-quality.svg
[cc-npm]: https://badge.fury.io/js/%40compgen%2Fcode-quality

[bl-badge]: https://badge.fury.io/js/%40compgen%2Fbrowserlist.svg
[bl-npm]: https://badge.fury.io/js/%40compgen%2Fbrowserlist

[cra-badge]: https://badge.fury.io/js/%40compgen%2Fcreate-react-app.svg
[cra-npm]: https://badge.fury.io/js/%40compgen%2Fcreate-react-app

[ef-badge]: https://badge.fury.io/js/%40compgen%2Feditor-config.svg
[ef-npm]: https://badge.fury.io/js/%40compgen%2Feditor-config

[es-badge]: https://badge.fury.io/js/%40compgen%2Feslint.svg
[es-npm]: https://badge.fury.io/js/%40compgen%2Feslint

[gh-badge]: https://badge.fury.io/js/%40compgen%2Fgit-hooks.svg
[gh-npm]: https://badge.fury.io/js/%40compgen%2Fgit-hooks

[he-badge]: https://badge.fury.io/js/%40compgen%2Fheroku.svg
[he-npm]: https://badge.fury.io/js/%40compgen%2Fheroku

[nest-badge]: https://badge.fury.io/js/%40compgen%2Fnestjs.svg
[nest-npm]: https://badge.fury.io/js/%40compgen%2Fnestjs

[next-badge]: https://badge.fury.io/js/%40compgen%2Fnextjs.svg
[next-npm]: https://badge.fury.io/js/%40compgen%2Fnextjs

[prettier-badge]: https://badge.fury.io/js/%40compgen%2Fprettier.svg
[prettier-npm]: https://badge.fury.io/js/%40compgen%2Fprettier

[stylelint-badge]: https://badge.fury.io/js/%40compgen%2Fstylelint.svg
[stylelint-npm]: https://badge.fury.io/js/%40compgen%2Fstylelint

[tsnode-badge]: https://badge.fury.io/js/%40compgen%2Fts-node.svg
[tsnode-npm]: https://badge.fury.io/js/%40compgen%2Fts-node

[cra-full-badge]: https://badge.fury.io/js/%40compgen%2Fcra-full.svg
[cra-full-npm]: https://badge.fury.io/js/%40compgen%2Fcra-full

[nest-full-badge]: https://badge.fury.io/js/%40compgen%2Fnestjs-full.svg
[nest-full-npm]: https://badge.fury.io/js/%40compgen%2Fnestjs-full

[next-full-badge]: https://badge.fury.io/js/%40compgen%2Fnextjs-full.svg
[next-full-npm]: https://badge.fury.io/js/%40compgen%2Fnextjs-full
