import { createSchema as createBrowserlistSchema } from '@compgen/browserlist'
import { createSchema as createCodeQualitySchema } from '@compgen/code-quality'
import { AppType, builder } from '@compgen/core'
import { createSchema as createReactAppSchema } from '@compgen/cra-min'
import { createSchema as createGitHooksSchema } from '@compgen/git-hooks'
import { createSchema as createHerokuSchema } from '@compgen/heroku'

export interface IOptions {
  projectFolder: string
  isHeroku: boolean
  isRouter: boolean
}

export const createSchema = ({
  projectFolder,
  isRouter,
  isHeroku,
}: IOptions) => {
  const appType = AppType.WEB

  const schema = builder('cra')

  schema.combineSchema(createReactAppSchema({
    projectFolder,
    isRouter,
  }))
  schema.combineSchema(createBrowserlistSchema())
  schema.combineSchema(createCodeQualitySchema({ appType }))
  schema.combineSchema(createGitHooksSchema({
    appType,
    isEslint: true,
    isPrettier: true,
    isStylelint: true,
  }))

  if (isHeroku) {
    schema.combineSchema(createHerokuSchema({
      appType,
      projectFolder,
      isCRA: true,
      isDatabase: false,
    }))
  }

  return schema.toJson()
}
