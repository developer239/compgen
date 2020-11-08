# @compgen/code-quality

A robust generator for installing your favorite code quality tools for your project.

#### Micro Generators Included

- [@compgen/editor-config](/packages/micro-generators/editor-config)
- [@compgen/eslint](/packages/micro-generators/eslint)
- [@compgen/prettier](/packages/micro-generators/prettier)
- [@compgen/stylelint](/packages/micro-generators/stylelint)

### CLI

I highly recommend using `npx` so that you don't have to install anything globally, and you can always get the latest version from npm.

- **optional** `--path=target_folder`

```bash
npx @compgen/code-quality
```

### Programmatically

You have to generate JSON schema and use `execute` function from `@compgen/core`:

```ts
// src/index.ts
import {
  execute,
  AppType,
  askAppType,
  getProjectFolder,
} from '@compgen/core'
import { createSchema } from '@compgen/code-quality'

const generate = async () => {
  const projectFolder = getProjectFolder() ?? '.'
  const appType = await askAppType()

  const codeQualitySchema = createSchema({ appType })
  await execute(codeQualitySchema, projectFolder)
}

generate()
```

Now all you have to do is run:

```
ts-node src/index.ts
```

