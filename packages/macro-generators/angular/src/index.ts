import { createSchema as createAngularAppSchema } from '@compgen/angular-min'
import { createSchema as createBrowserlistSchema } from '@compgen/browserlist'
import { createSchema as createCodeQualitySchema } from '@compgen/code-quality'
import { AppType, builder } from '@compgen/core'
import { createSchema as createGitHooksSchema } from '@compgen/git-hooks'

export interface IOptions {
  projectFolder: string
}

export const createSchema = ({ projectFolder }: IOptions) => {
  const appType = AppType.REACT

  const schema = builder('angular')

  schema.combineSchema(
    createAngularAppSchema({
      projectFolder,
    })
  )
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

  return schema.toJson()
}
