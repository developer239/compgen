# @compgen/stylelint

A micro generator for generating stylelint configuration.

### CLI

I highly recommend using `npx` so that you don't have to install anything globally, and you can always get the latest version from npm.

- **optional** `--path=target_folder`

```bash
npx @compgen/stylelint
```

### Programmatically

You have to generate JSON schema and use `execute` function from `@compgen/core`:

```ts
// src/index.ts
import {
  execute,
  getProjectFolder,
  askAppTypeFE,
  AppType,
  logError,
  askYesNo,
} from '@compgen/core'
import {
  createSchemaForMobile,
  createSchemaForWeb,
} from '@compgen/stylelint'

export const askHasPrettier = () => askYesNo('Do you use prettier?')

const generate = async () => {
  const projectFolder = getProjectFolder() ?? '.'
  const type = await askAppTypeFE()
  const hasPrettier = await askHasPrettier()

  if (type !== AppType.WEB && type !== AppType.MOBILE) {
    logError('App type is not supported!')
  }

  const stylelintSchema =
    type === AppType.WEB
      ? createSchemaForWeb({ hasPrettier })
      : createSchemaForMobile({ hasPrettier })

  await execute(stylelintSchema, projectFolder)
}

generate()
```

Now all you have to do is run:

```
ts-node src/index.ts
```
