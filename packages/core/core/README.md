# @compgen/core

This documentation will help you get started with writing your own generators. You can start writing your own generators in matter of minutes.

## Creating Prettier Generator

Personally I prefer practical examples. @compgen/core is small and thanks to typescript you can figure out pretty much everything yourself.

With that said I will create an actual documentation in the future.

### 1) Initialize builder

Every generator uses `builder` to generate `ISchema`. The schema holds information about what commands we want to run, what files we want to create and what dependencies we want to install.

```ts
import { builder } from '@compgen/core'

export const createPrettierSchema = () => {
  const schema = builder('prettier')
}
```

### 2) Add CLI Commands

If we want to create project directory, run create-react-app cli or run any other command we can use `addCommand` helper.

```ts
import { builder } from '@compgen/core'

export const createPrettierSchema = () => {
  const schema = builder('prettier')

  schema.addCommand({
    command: 'yarn init -y',
    successMessage: 'Initializing package.json',
    priority: 99,
    shouldRunInProject: true,
  })
}
```

### 3) Create files

If we want to add prettier to our project we need to create `.prettierrc.js`. We have to make directory `templates` and create config file:

```ts
// templates/.prettierrc.js
module.exports = require('@linters/prettier-config')
```

then we just have to call `addFolder` in our generator:

```ts
import path from 'path'
import { builder } from '@compgen/core'

export const createPrettierSchema = () => {
  const schema = builder('prettier')

  // ...

  schema.addFolder({
    name: 'prettier',
    source: path.join(__dirname, 'templates'),
  })
}
```

### 4) Add dependencies

Prettier will not work unless we install npm dependencies. That is where functions

- `addDependencies`
- `addDevDependencies`

are going to help us.

```ts
import { builder } from '@compgen/core'

export const createPrettierSchema = () => {
  const schema = builder('prettier')

  // ...

  schema.addDevDependencies(['prettier', '@linters/prettier-config'])
}
```

### 5) Add scripts to package.json

Our developers shouldn't have to figure out themselves that they can use prettier in our project. We can add `format` script to package.json.

```ts
import { builder } from '@compgen/core'

export const createPrettierSchema = () => {
  const schema = builder('prettier')

  // ...

  schema.addScript('format', "prettier --write '*/**/*.{ts,tsx,css,md,json}'")
}
```

### 7) Creating CLI application

That is pretty much it. All we have to do us return JSON schema:

```ts
import { builder } from '@compgen/core'

export const createPrettierConfig = () => {
  const schema = builder('prettier')

  // ...

  return schema.toJson()
}
```

now we can create another function that will use use `execute` function to acutally run the schema:

```ts
import { execute, builder } from '@compgen/core'

export const createPrettierConfig = () => {
  const schema = builder('prettier')

  // ...

  return schema.toJson()
}

const run = async () => {
  const prettierSchema = createPrettierConfig()

  await execute(prettierSchema, '.')
}

run()
```

Easy, isn't it? 🚀 Now you don't have to configure prettier yourselves ever again...
