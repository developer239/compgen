# @compgen/angular

A robust generator for generating full [Angular](https://angular.io/) application.

#### Micro Generators Included

- [@compgen/angular-min](/packages/micro-generators/angular-min)
- [@compgen/browserlist](/packages/micro-generators/browserlist)
- [@compgen/editor-config](/packages/micro-generators/editor-config)
- [@compgen/eslint](/packages/micro-generators/eslint)
- [@compgen/stylelint](/packages/micro-generators/stylelint)
- [@compgen/prettier](/packages/micro-generators/prettier)
- [@compgen/git-hooks](/packages/micro-generators/git-hooks)

### CLI

I highly recommend using `npx` so that you don't have to install anything globally, and you can always get the latest version from npm.

- **optional** `--path=target_folder`

```bash
npx @compgen/angular
```

### Programmatically

You have to generate JSON schema and use `execute` function from `@compgen/core`:

```ts
// src/index.ts
import { execute, askProjectName } from '@compgen/core'
import { createSchema } from '@compgen/angular'

const generate = async () => {
  const { projectFolder } = await askProjectName()

  const schema = createSchema({ projectFolder })

  await execute(schema, projectFolder)
}

generate()
```

Now all you have to do is run:

```
ts-node src/index.ts
```
