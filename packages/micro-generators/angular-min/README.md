# @compgen/angular-min

**Unless you are building custom Angular generator then you probably want to use: [@compgen/angular](packages/macro-generators/angular)**

This is a micro generator for minimal [Angular](https://reactjs.org/docs/create-a-new-react-app.html) application.

- without boilerplate
- with [eslint](https://github.com/eslint/eslint)
- with [jest](https://github.com/facebook/jest)

### CLI

I highly recommend using `npx` so that you don't have to install anything globally, and you can always get the latest version from npm.

- **optional** `--path=target_folder`

```bash
npx @compgen/angular-min
```

### Programmatically

You have to generate JSON schema and use `execute` function from `@compgen/core`:

```ts
// src/index.ts
import { execute, askProjectName } from '@compgen/core'
import { createSchema } from '@compgen/angular-min'

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
