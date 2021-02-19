# @compgen/heroku

A micro generator for generating [Heroku](https://github.com/heroku) configuration.

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
  AppType,
  askProjectName,
  logger,
} from '@compgen/core'
import { createSchema } from '@compgen/heroku'

export const askIsCRA = () => askYesNo('Is this Create React App APP?')

export const askPostgreAddon = () =>
  askYesNo('Do you use heroku-postgresql addon?')

const generate = async () => {
  const appType = await askAppType()

  if (appType === AppType.MOBILE) {
    return logger.error(`${appType} not supported`)
  }

  const projectFolder = getProjectFolder() ?? '.'
  let projectName = projectFolder
  let isCRA = false
  let isDatabase = false

  if (projectName === '.') {
    const projectInfo = await askProjectName('How is your project called?')
    projectName = projectInfo.projectFolder
  }

  if (appType === AppType.NODE) {
    isDatabase = await askPostgreAddon()
  } else {
    isCRA = await askIsCRA()
  }

  const herokuSchema = createSchema({
    appType,
    projectName,
    isCRA,
    isDatabase,
  })

  await execute(herokuSchema, projectFolder)
}

generate()
```

Now all you have to do is run:

```
ts-node src/index.ts
```
