# Composable Generators

![release](https://github.com/developer239/compgen/workflows/release/badge.svg)

> Replace your big boilerplate repositories with small composable generators.

_@compgen_ is an alternative to Yeoman and other libraries that help you to kickstart new projects, prescribe best practices and configure tools to help you stay productive.

This library is unique though because **_@compgen_ generators are small and composable**. You can use generators separately to create small chunks of code, or you can compose them together so that you can create bigger and more opinionated codebase.

## Core Packages

Use these to build your own generators.

| Type         | Package                             | Version                                  |
| ------------ | ----------------------------------- | ---------------------------------------- |
| Library Core | [@compgen/core](packages/core/core) | [![@compgen/core][core-badge]][core-npm] |

## Full App Generators

These will create whole application setup.

| Type             | Package                                               | Version                                                     |
| ---------------- | ----------------------------------------------------- | ----------------------------------------------------------- |
| Angular          | [@compgen/angular](packages/macro-generators/angular) | [![@compgen/angular][angular-badge]][angular-npm]           |
| Nest.js          | [@compgen/nest](packages/macro-generators/nest)       | [![@compgen/nest-min-full][nest-full-badge]][nest-full-npm] |
| Create React App | [@compgen/cra](packages/macro-generators/cra)         | [![@compgen/cra-full][cra-full-badge]][cra-full-npm]        |
| Next.js          | [@compgen/next](packages/macro-generators/next)       | [![@compgen/next-min-full][next-full-badge]][next-full-npm] |
| React Native     | [@compgen/rna](packages/macro-generators/rna)         | [![@compgen/rna][rna-badge]][rna-npm]                       |

## Macro Generators

Multiple micro generators composed into robust generators. These generators are useful for opinionated codebase setup.

| Type  | Package                                                         | Version                                                       |
| ----- | --------------------------------------------------------------- | ------------------------------------------------------------- |
| Macro | [@compgen/code-quality](packages/macro-generators/code-quality) | [![@compgen/code-quality][cc-badge]][cc-npm]                  |
| Macro | [@compgen/eslint-auto](packages/macro-generators/eslint-auto)   | [![@compgen/eslint-auto][eslint-auto-badge]][eslint-auto-npm] |

## Micro Generators

You can easily selectively add code quality tools and other useful libraries to your existing codebase.

| Type         | Package                                                           | Version                                                   |
| ------------ | ----------------------------------------------------------------- | --------------------------------------------------------- |
| Application  | [@compgen/angular-min](packages/micro-generators/angular-min)     | [![@compgen/cra-min][angular-min-badge]][angular-min-npm] |
| Application  | [@compgen/cra-min](packages/micro-generators/cra-min)             | [![@compgen/cra-min][cra-badge]][cra-npm]                 |
| Application  | [@compgen/nest-min](packages/micro-generators/nest-min)           | [![@compgen/nest-min][nest-badge]][nest-npm]              |
| Application  | [@compgen/next-min](packages/micro-generators/next-min)           | [![@compgen/next-min][next-badge]][next-npm]              |
| Application  | [@compgen/rna-min](packages/micro-generators/rna-min)             | [![@compgen/rna-min][rna-min-badge]][rna-min-npm]         |
| Application  | [@compgen/ts-node](packages/micro-generators/ts-node)             | [![@compgen/ts-node][tsnode-badge]][tsnode-npm]           |
| Deployment   | [@compgen/heroku](packages/micro-generators/heroku)               | [![@compgen/heroku][he-badge]][he-npm]                    |
| Code Quality | [@compgen/editor-config](packages/micro-generators/editor-config) | [![@compgen/editor-config][ef-badge]][ef-npm]             |
| Code Quality | [@compgen/browserlist](packages/micro-generators/browserlist)     | [![@compgen/browserlist][bl-badge]][bl-npm]               |
| Code Quality | [@compgen/eslint](packages/micro-generators/eslint)               | [![@compgen/eslint][es-badge]][es-npm]                    |
| Code Quality | [@compgen/stylelint](packages/micro-generators/stylelint)         | [![@compgen/stylelint][stylelint-badge]][stylelint-npm]   |
| Code Quality | [@compgen/prettier](packages/micro-generators/prettier)           | [![@compgen/prettier][prettier-badge]][prettier-npm]      |
| Code Quality | [@compgen/git-hooks](packages/micro-generators/git-hooks)         | [![@compgen/git-hooks][gh-badge]][gh-npm]                 |

## Programmable Examples

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

[angular-min-badge]: https://badge.fury.io/js/%40compgen%2Fangular-min.svg
[angular-min-npm]: https://badge.fury.io/js/%40compgen%2Fangular-min
[core-badge]: https://badge.fury.io/js/%40compgen%2Fcore.svg
[core-npm]: https://badge.fury.io/js/%40compgen%2Fcore
[cc-badge]: https://badge.fury.io/js/%40compgen%2Fcode-quality.svg
[cc-npm]: https://badge.fury.io/js/%40compgen%2Fcode-quality
[eslint-auto-badge]: https://badge.fury.io/js/%40compgen%2Feslint-auto.svg
[eslint-auto-npm]: https://badge.fury.io/js/%40compgen%2Feslint-auto
[bl-badge]: https://badge.fury.io/js/%40compgen%2Fbrowserlist.svg
[bl-npm]: https://badge.fury.io/js/%40compgen%2Fbrowserlist
[cra-badge]: https://badge.fury.io/js/%40compgen%2Fcra-min.svg
[cra-npm]: https://badge.fury.io/js/%40compgen%2Fcra-min
[ef-badge]: https://badge.fury.io/js/%40compgen%2Feditor-config.svg
[ef-npm]: https://badge.fury.io/js/%40compgen%2Feditor-config
[es-badge]: https://badge.fury.io/js/%40compgen%2Feslint.svg
[es-npm]: https://badge.fury.io/js/%40compgen%2Feslint
[gh-badge]: https://badge.fury.io/js/%40compgen%2Fgit-hooks.svg
[gh-npm]: https://badge.fury.io/js/%40compgen%2Fgit-hooks
[he-badge]: https://badge.fury.io/js/%40compgen%2Fheroku.svg
[he-npm]: https://badge.fury.io/js/%40compgen%2Fheroku
[nest-badge]: https://badge.fury.io/js/%40compgen%2Fnest-min.svg
[nest-npm]: https://badge.fury.io/js/%40compgen%2Fnest-min
[next-badge]: https://badge.fury.io/js/%40compgen%2Fnext-min.svg
[next-npm]: https://badge.fury.io/js/%40compgen%2Fnext-min
[rna-badge]: https://badge.fury.io/js/%40compgen%2Frna.svg
[rna-npm]: https://badge.fury.io/js/%40compgen%2Frna
[prettier-badge]: https://badge.fury.io/js/%40compgen%2Fprettier.svg
[prettier-npm]: https://badge.fury.io/js/%40compgen%2Fprettier
[rna-min-badge]: https://badge.fury.io/js/%40compgen%2Frna-min.svg
[rna-min-npm]: https://badge.fury.io/js/%40compgen%2Frna-min
[stylelint-badge]: https://badge.fury.io/js/%40compgen%2Fstylelint.svg
[stylelint-npm]: https://badge.fury.io/js/%40compgen%2Fstylelint
[tsnode-badge]: https://badge.fury.io/js/%40compgen%2Fts-node.svg
[tsnode-npm]: https://badge.fury.io/js/%40compgen%2Fts-node
[cra-full-badge]: https://badge.fury.io/js/%40compgen%2Fcra.svg
[cra-full-npm]: https://badge.fury.io/js/%40compgen%2Fcra
[nest-full-badge]: https://badge.fury.io/js/%40compgen%2Fnest.svg
[nest-full-npm]: https://badge.fury.io/js/%40compgen%2Fnest
[next-full-badge]: https://badge.fury.io/js/%40compgen%2Fnext.svg
[next-full-npm]: https://badge.fury.io/js/%40compgen%2Fnext
[angular-badge]: https://badge.fury.io/js/%40compgen%2Fangular.svg
[angular-npm]: https://badge.fury.io/js/%40compgen%2Fangular
