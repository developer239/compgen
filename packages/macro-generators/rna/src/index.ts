import { createSchema as createCodeQualitySchema } from '@compgen/code-quality'
import { AppType, builder } from '@compgen/core'
import { createSchema as createGitHooksSchema } from '@compgen/git-hooks'
import {
  createSchema as createRNASchema,
  NavigationType,
} from '@compgen/rna-min'

export interface IOptions {
  projectFolder: string
  navigationType: NavigationType
}

export const createSchema = ({ projectFolder, navigationType }: IOptions) => {
  const appType = AppType.REACT_NATIVE

  const schema = builder('rna')

  schema.combineSchema(
    createRNASchema({
      projectFolder,
      navigationType,
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
