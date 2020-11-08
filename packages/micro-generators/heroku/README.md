# @compgen/heroku

A micro generator for generating heroku configuration.

### CLI

I highly recommend using `npx` so that you don't have to install anything globally, and you can always get the latest version from npm.

- **optional** `--path=target_folder`

```bash
npx @compgen/heroku
```

### Programmatically

You have to generate JSON schema and use `execute` function from `@compgen/core`:

```ts
// src/index.ts
import {
  execute,
  getProjectFolder,
  askYesNo,
  askAppType,
} from '@compgen/core'
import { createSchema } from '@compgen/heroku'

export const askIsCRA = () => askYesNo('Is this Create React App APP?')

export const askPostgreAddon = () =>
  askYesNo('Do you use heroku-postgresql addon?')

const generate = async () => {
  const projectFolder = getProjectFolder() ?? '.'
  const appType = await askAppType()
  const isCRA = await askIsCRA()

  let isDatabase = false

  if (!isCRA) {
    isDatabase = await askPostgreAddon()
  }

  const schema = createSchema({
    appType,
    projectFolder,
    isCRA,
    isDatabase,
  })
  await execute(schema, projectFolder)
}

generate()
```

Now all you have to do is run:

```
ts-node src/index.ts
```
