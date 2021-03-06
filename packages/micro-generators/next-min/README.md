# @compgen/next-min

**Unless you are building custom CRA generator then you probably want to use: [@compgen/next](packages/macro-generators/next)**

This is a micro generator for minimal [CRA](https://github.com/vercel/next.js) configuration.

### CLI

I highly recommend using `npx` so that you don't have to install anything globally, and you can always get the latest version from npm.

- **optional** `--path=target_folder`

```bash
npx @compgen/next-min
```

### Programmatically

You have to generate JSON schema and use `execute` function from `@compgen/core`:

```ts
// src/index.ts
import { execute, askProjectName } from '@compgen/core'
import { createSchema } from '@compgen/next-min'

const generate = async () => {
  const { projectFolder } = await askProjectName()

  const schema = createSchema({
    projectFolder,
  })
  await execute(schema, projectFolder)
}

generate()
```

Now all you have to do is run:

```
ts-node src/index.ts
```
