# @compgen/editor-config

A micro generator for generating [editor-config](https://editorconfig.org/) configuration.

### CLI

I highly recommend using `npx` so that you don't have to install anything globally, and you can always get the latest version from npm.

- **optional** `--path=target_folder`

```bash
npx @compgen/editor-config
```

### Programmatically

You have to generate JSON schema and use `execute` function from `@compgen/core`:

```ts
// src/index.ts
import { execute, getProjectFolder } from '@compgen/core'
import { createSchema } from '@compgen/editor-config'

const generate = async () => {
  const projectFolder = getProjectFolder() ?? '.'

  const schema = createSchema()
  await execute(schema, projectFolder)
}

generate()
```

Now all you have to do is run:

```
ts-node src/index.ts
```
