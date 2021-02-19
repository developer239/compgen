# @compgen/git-hooks

A micro generator for essential git hooks:

- [husky](https://github.com/typicode/husky)
- [lint-staged](https://github.com/okonet/lint-staged)
- [commitlint](https://github.com/conventional-changelog/commitlint)

### CLI

I highly recommend using `npx` so that you don't have to install anything globally, and you can always get the latest version from npm.

- **optional** `--path=target_folder`

```bash
npx @compgen/git-hooks
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
} from '@compgen/core'
import { createSchema } from '@compgen/git-hooks'

export const askIsEslint = () => askYesNo('Do you use eslint?')

export const askIsPrettier = () => askYesNo('Do you use prettier?')

export const askIsStylelint = () => askYesNo('Do you use stylelint?') // only ask in web projects

const generate = async () => {
  const projectFolder = getProjectFolder() ?? '.'
  const appType = await askAppType()
  const isEslint = await askIsEslint()
  const isPrettier = await askIsPrettier()

  let isStylelint = false

  if (appType !== AppType.NODE) {
    isStylelint = await askIsStylelint()
  }

  const schema = createSchema({
    appType,
    isEslint,
    isPrettier,
    isStylelint,
  })
  await execute(schema, projectFolder)
}

generate()
```

Now all you have to do is run:

```
ts-node src/index.ts
```
