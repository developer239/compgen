import { AppType, builder } from '@compgen/core'
import { createSchema as createEditorConfigSchema } from '@compgen/editor-config'
import { createSchema as createEslintSchema } from '@compgen/eslint'
import { createSchema as createPrettierSchema } from '@compgen/prettier'
import {
  createSchemaForWeb as createStylelintSchemaForWeb,
  createSchemaForMobile as createStylelintSchemaForMobile,
} from '@compgen/stylelint'

export interface IOptions {
  appType: AppType
}

export const createSchema = ({ appType }: IOptions) => {
  const schema = builder('codequality')
  const hasPrettier = true

  schema.combineSchema(createEditorConfigSchema())
  schema.combineSchema(createPrettierSchema({ appType }))
  schema.combineSchema(createEslintSchema({ appType }))

  if (AppType.MOBILE) {
    schema.combineSchema(createStylelintSchemaForWeb({ hasPrettier }))
  }

  if (AppType.WEB) {
    schema.combineSchema(createStylelintSchemaForMobile({ hasPrettier }))
  }

  return schema.toJson()
}
