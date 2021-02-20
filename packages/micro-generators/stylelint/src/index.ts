import path from 'path'
import { builder } from '@compgen/core'

interface IOptions {
  hasPrettier: boolean
}

export const createCommonSchema = ({ hasPrettier }: IOptions) => {
  const schema = builder('stylelint')
  schema.addScript('lint:css', "stylelint '**/*.{ts,tsx}'")
  schema.addDevDependencies(['stylelint'])

  if (hasPrettier) {
    schema.addDevDependencies(['stylelint-config-prettier'])
  }

  return schema
}

export const createSchemaForWeb = (options: IOptions) => {
  const schema = createCommonSchema(options)

  schema.addFolder({
    label: 'stylelint',
    source: path.join(__dirname, 'templates/web'),
  })

  schema.addDevDependencies(['@linters/stylelint-css-in-js-config'])

  return schema.toJson()
}

export const createSchemaForMobile = (options: IOptions) => {
  const schema = createCommonSchema(options)

  schema.addFolder({
    label: 'stylelint',
    source: path.join(__dirname, 'templates/mobile'),
  })

  schema.addDevDependencies([
    '@linters/stylelint-css-in-js-react-native-config',
  ])

  return schema.toJson()
}
