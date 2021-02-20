import path from 'path'
import { AppType, builder } from '@compgen/core'

interface IOptions {
  appType: AppType
}

export const createSchema = ({ appType }: IOptions) => {
  const schema = builder('eslint')

  const dependenciesShared = [
    'eslint',
    'eslint-plugin-import',
    '@linters/eslint-config-typescript',
    '@linters/eslint-config-jest',
    'eslint-config-prettier',
  ]

  switch (appType) {
    case AppType.REACT_NATIVE: {
      const dependenciesMobile = ['@linters/eslint-config-react-native']
      const dependencies = [...dependenciesShared, ...dependenciesMobile]

      schema.addDevDependencies(dependencies)
      schema.addScript('lint:ts', 'eslint --ext .ts,.tsx src')

      break
    }
    case AppType.REACT: {
      const dependenciesWeb = ['@linters/eslint-config-react']
      const dependencies = [...dependenciesShared, ...dependenciesWeb]

      schema.addDevDependencies(dependencies)
      schema.addScript('lint:ts', 'eslint --ext .ts,.tsx src')

      break
    }
    case AppType.NODE: {
      const dependenciesNode = ['@linters/eslint-config-node']
      const dependencies = [...dependenciesShared, ...dependenciesNode]

      schema.addDevDependencies(dependencies)
      schema.addScript('lint:ts', 'eslint --ext .ts src')

      break
    }
  }

  schema.addFolder({
    label: 'eslint',
    source: path.join(__dirname, 'templates', appType),
  })

  return schema.toJson()
}
