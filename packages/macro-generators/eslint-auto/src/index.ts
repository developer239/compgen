import { builder, detectAppType } from '@compgen/core'
import { createSchema as createEslintSchema } from '@compgen/eslint'

export interface IOptions {
  projectFolder: string
}

export const createSchema = async ({ projectFolder }: IOptions) => {
  const schema = builder('eslint-auto')
  const appType = await detectAppType({ projectFolder })

  schema.combineSchema(createEslintSchema({ appType, projectFolder }))

  return schema.toJson()
}
