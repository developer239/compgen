# @compgen/nest

A robust generator for generating full Nest.js project.

#### Micro Generators Included

- [@compgen/nest-min](/packages/micro-generators/nest-min)
- [@compgen/editor-config](/packages/micro-generators/editor-config)
- [@compgen/eslint](/packages/micro-generators/eslint)
- [@compgen/prettier](/packages/micro-generators/prettier)
- [@compgen/git-hooks](/packages/micro-generators/git-hooks)
- [@compgen/heroku](/packages/micro-generators/heroku)

### CLI

I highly recommend using `npx` so that you don't have to install anything globally, and you can always get the latest version from npm.

- **optional** `--path=target_folder`

```bash
npx @compgen/nest
```

### Programmatically

You have to generate JSON schema and use `execute` function from `@compgen/core`:

```ts
// src/index.ts
import { execute, askProjectName, askYesNo } from '@compgen/core'
import { createSchema } from '@compgen/nest'

const generate = async () => {
  const { projectFolder } = await askProjectName()
    const isDatabase = await askYesNo('Do you want to setup database?')
    const isHeroku = await askYesNo('Do you want to generate Heroku configuration?')
  
    const schema = createSchema({ projectFolder, isHeroku, isDatabase })
  
    await execute(schema, projectFolder)
}

generate()
```

Now all you have to do is run:

```
ts-node src/index.ts
```
