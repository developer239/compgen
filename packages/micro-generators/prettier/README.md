# @compgen/prettier

A micro generator for generating [prettier](https://github.com/prettier/prettier) configuration.

### CLI

I highly recommend using `npx` so that you don't have to install anything globally, and you can always get the latest version from npm.

- **optional** `--path=target_folder`

```bash
npx @compgen/prettier
```

### Programmatically

You have to generate JSON schema and use `execute` function from `@compgen/core`:

```ts
// src/index.ts
import { execute, getProjectFolder, askAppType } from '@compgen/core'
import { createSchema } from '@compgen/prettier'

const generate = async () => {
  const projectFolder = getProjectFolder() ?? '.'
  const appType = await askAppType()

  const schema = createSchema({ appType })
  await execute(schema, projectFolder)
}

generate()
```

Now all you have to do is run:

```
ts-node src/index.ts
```
