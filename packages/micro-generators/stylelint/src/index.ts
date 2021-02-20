import path from 'path'
import { builder } from '@compgen/core'

interface IOptions {
  hasPrettier: boolean
}

export const createSchemaForAngular = () => {
  const schema = builder('stylelint')
  schema.addScript('lint:css', "stylelint 'src/**/*.scss' --syntax scss")

  schema.addFolder({
    label: 'stylelint',
    source: path.join(__dirname, 'templates/angular'),
  })

  schema.addDevDependencies(['stylelint', '@linters/stylelint-scss-config'])

  return schema.toJson()
}

export const createCommonReactSchema = ({ hasPrettier }: IOptions) => {
  const schema = builder('stylelint')
  schema.addScript('lint:css', "stylelint '**/*.{ts,tsx}'")
  schema.addDevDependencies(['stylelint'])

  if (hasPrettier) {
    schema.addDevDependencies(['stylelint-config-prettier'])
  }

  return schema
}

export const createSchemaForReact = (options: IOptions) => {
  const schema = createCommonReactSchema(options)

  schema.addFolder({
    label: 'stylelint',
    source: path.join(__dirname, 'templates/react'),
  })

  schema.addDevDependencies(['@linters/stylelint-css-in-js-config'])

  return schema.toJson()
}

export const createSchemaForReactNative = (options: IOptions) => {
  const schema = createCommonReactSchema(options)

  schema.addFolder({
    label: 'stylelint',
    source: path.join(__dirname, 'templates/react-native'),
  })

  schema.addDevDependencies([
    '@linters/stylelint-css-in-js-react-native-config',
  ])

  return schema.toJson()
}
