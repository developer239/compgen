# @compgen/cra-min

A micro generator for generating minimal create-react-app configuration.

### CLI

I highly recommend using `npx` so that you don't have to install anything globally, and you can always get the latest version from npm.

- **optional** `--path=target_folder`

```bash
npx @compgen/cra-min
```

### Programmatically

You have to generate JSON schema and use `execute` function from `@compgen/core`:

```ts
// src/index.ts
import { execute, getProjectFolder, askProjectName } from '@compgen/core'
import { askYesNo } from '@compgen/core'
import { createSchema } from '@compgen/cra-min'

export const askIsRouter = () => askYesNo('Do you want to use React Router?')

const generate = async () => {
  const { projectFolder } = await askProjectName()
  const isRouter = await askIsRouter()

  const schema = createSchema({ isRouter, projectFolder })
  await execute(schema, projectFolder)
}

generate()
```

Now all you have to do is run:

```
ts-node src/index.ts
```
