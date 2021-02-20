import { AppType, builder } from '@compgen/core'
import { createSchema as createEditorConfigSchema } from '@compgen/editor-config'
import { createSchema as createEslintSchema } from '@compgen/eslint'
import { createSchema as createPrettierSchema } from '@compgen/prettier'
import {
  createSchemaForReact,
  createSchemaForAngular,
  createSchemaForReactNative as createStylelintSchemaForMobile,
} from '@compgen/stylelint'

export interface IOptions {
  appType: AppType
  projectFolder: string
}

export const createSchema = ({ appType, projectFolder }: IOptions) => {
  const schema = builder('codequality')
  const hasPrettier = true

  schema.combineSchema(createEditorConfigSchema())
  schema.combineSchema(createPrettierSchema({ appType }))
  schema.combineSchema(createEslintSchema({ appType, projectFolder }))

  switch (appType) {
    case AppType.REACT_NATIVE:
      schema.combineSchema(createStylelintSchemaForMobile({ hasPrettier }))
      break
    case AppType.REACT:
      schema.combineSchema(createSchemaForReact({ hasPrettier }))
      break
    case AppType.ANGULAR:
      schema.combineSchema(createSchemaForAngular())
      break
  }

  return schema.toJson()
}
