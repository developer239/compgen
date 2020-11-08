import { createSchema as createBrowserlistSchema } from '@compgen/browserlist'
import { createSchema as createCodeQualitySchema } from '@compgen/code-quality'
import { AppType, builder } from '@compgen/core'
import { createSchema as createGitHooksSchema } from '@compgen/git-hooks'
import { createSchema as createHerokuSchema } from '@compgen/heroku'
import { createSchema as createNextJsSchema } from '@compgen/next-min'

export interface IOptions {
  projectFolder: string
  isHeroku: boolean
}

export const createSchema = ({ projectFolder, isHeroku }: IOptions) => {
  const appType = AppType.WEB

  const schema = builder('nextjs')

  schema.combineSchema(createNextJsSchema({ projectFolder }))
  schema.combineSchema(createBrowserlistSchema())
  schema.combineSchema(createCodeQualitySchema({ appType }))
  schema.combineSchema(
    createGitHooksSchema({
      appType,
      isEslint: true,
      isPrettier: true,
      isStylelint: true,
    })
  )

  if (isHeroku) {
    schema.combineSchema(
      createHerokuSchema({
        appType,
        isCRA: false,
        projectFolder,
        isDatabase: false,
      })
    )
  }

  return schema.toJson()
}
