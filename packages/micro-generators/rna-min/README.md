# @compgen/rna-min

**Unless you are building custom RNA generator then you probably want to use: [@compgen/rna](packages/macro-generators/rna)**

This is a micro generator for minimal [RNA](https://reactnative.dev/) configuration.

### CLI

I highly recommend using `npx` so that you don't have to install anything globally, and you can always get the latest version from npm.

- **optional** `--path=target_folder`

```bash
npx @compgen/rna-min
```

### Programmatically

You have to generate JSON schema and use `execute` function from `@compgen/core`:

```ts
// src/index.ts
import { execute, askProjectName, toAlphanumeric } from '@compgen/core'
import { createSchema, askNavigationType } from '@compgen/rna-min'

const generate = async () => {
  const projectInfo = await askProjectName()
  const projectFolder = projectInfo.projectFolder
  const navigationType = await askNavigationType()

  const schema = createSchema({
    projectFolder: toAlphanumeric(projectFolder),
    navigationType,
  })

  await execute(schema, toAlphanumeric(projectFolder))
}

generate()
```

Now all you have to do is run:

```
ts-node src/index.ts
```
