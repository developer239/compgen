import { createSchema as createCodeQualitySchema } from '@compgen/code-quality'
import { AppType, builder } from '@compgen/core'
import { createSchema as createGitHooksSchema } from '@compgen/git-hooks'
import { createSchema as createRNASchema } from '@compgen/rna-min'

export interface IOptions {
  projectFolder: string
}

export const createSchema = ({ projectFolder }: IOptions) => {
  const appType = AppType.REACT_NATIVE

  const schema = builder('cra')

  schema.combineSchema(
    createRNASchema({
      projectFolder,
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

  return schema.toJson()
}
