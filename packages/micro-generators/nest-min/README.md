# @compgen/nest-min

A micro generator for generating [nestjs](https://github.com/nestjs/nest.git) configuration.

### CLI

I highly recommend using `npx` so that you don't have to install anything globally, and you can always get the latest version from npm.

- **optional** `--path=target_folder`

```bash
npx @compgen/nest-min
```

### Programmatically

You have to generate JSON schema and use `execute` function from `@compgen/core`:

```ts
// src/index.ts
import { execute, getProjectFolder, askYesNo } from '@compgen/core'
import { createSchema } from '@compgen/nest-min'

export const askIsDatabase = () => askYesNo('Do you want to use database?')

const generate = async () => {
  const projectFolder = getProjectFolder() ?? '.'
  const isDatabase = await askIsDatabase()

  const schema = createSchema({
    projectFolder,
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
