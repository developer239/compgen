import path from 'path'
import { AppType, builder } from '@compgen/core'

interface IOptions {
  appType: AppType
}

export const createSchema = ({ appType }: IOptions) => {
  const schema = builder('eslint')

  if (appType === AppType.NODE) {
    schema.addScript('lint:ts', 'eslint --ext .ts src')
  } else {
    schema.addScript('lint:ts', 'eslint --ext .ts,.tsx src')
  }

  const dependenciesShared = [
    'eslint',
    'eslint-plugin-import',
    '@linters/eslint-config-typescript',
    '@linters/eslint-config-jest',
    'eslint-config-prettier',
  ]
  const dependenciesMobile = ['@linters/eslint-config-react-native']
  const dependenciesWeb = ['@linters/eslint-config-react']
  const dependenciesNode = ['@linters/eslint-config-node']

  switch (appType) {
    case AppType.MOBILE: {
      const dependencies = [...dependenciesShared, ...dependenciesMobile]
      schema.addDevDependencies(dependencies)
      break
    }
    case AppType.WEB: {
      const dependencies = [...dependenciesShared, ...dependenciesWeb]
      schema.addDevDependencies(dependencies)
      break
    }
    case AppType.NODE: {
      const dependencies = [...dependenciesShared, ...dependenciesNode]
      schema.addDevDependencies(dependencies)
      break
    }
  }

  schema.addFolder({
    label: 'eslint',
    source: path.join(__dirname, 'templates', appType),
  })

  return schema.toJson()
}
