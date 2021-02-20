# @compgen/rna

A robust generator for generating complete [react native](https://reactnative.dev/) project.

#### Micro Generators Included

- [@compgen/rna-min](/packages/micro-generators/rna-min)
- [@compgen/editor-config](/packages/micro-generators/editor-config)
- [@compgen/eslint](/packages/micro-generators/eslint)
- [@compgen/stylelint](/packages/micro-generators/stylelint)
- [@compgen/prettier](/packages/micro-generators/prettier)
- [@compgen/git-hooks](/packages/micro-generators/git-hooks)

### CLI

I highly recommend using `npx` so that you don't have to install anything globally, and you can always get the latest version from npm.

- **optional** `--path=target_folder`

```bash
npx @compgen/rna
```

### Programmatically

You have to generate JSON schema and use `execute` function from `@compgen/core`:

```ts
// src/index.ts
import { execute, askProjectName, toAlphanumeric } from '@compgen/core'
import { askNavigationType } from '@compgen/rna-min'
import { createSchema } from '@compgen/rna'

const generate = async () => {
  const { projectFolder } = await askProjectName()
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
