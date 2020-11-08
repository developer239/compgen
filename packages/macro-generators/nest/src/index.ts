import { createSchema as createCodeQualitySchema } from '@compgen/code-quality'
import { AppType, builder } from '@compgen/core'
import { createSchema as createGitHooksSchema } from '@compgen/git-hooks'
import { createSchema as createHerokuSchema } from '@compgen/heroku'
import { createSchema as createNestJsSchema } from '@compgen/nest-min'

export interface IOptions {
  projectFolder: string
  isHeroku: boolean
  isDatabase: boolean
}

export const createSchema = ({
  projectFolder,
  isHeroku,
  isDatabase,
}: IOptions) => {
  const appType = AppType.NODE

  const schema = builder('nestjs')
  schema.combineSchema(
    createNestJsSchema({
      projectFolder,
      isDatabase,
    })
  )
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
        isDatabase,
      })
    )
  }

  return schema.toJson()
}
