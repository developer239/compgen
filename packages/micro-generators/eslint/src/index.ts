import path from 'path'
import { AppType, builder } from '@compgen/core'

interface IOptions {
  appType: AppType
  projectFolder: string
}

export const createSchema = ({ appType, projectFolder }: IOptions) => {
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
    case AppType.ANGULAR: {
      const dependenciesAngular = [
        'eslint',
        '@angular-eslint/builder',
        '@linters/eslint-config-angular',
        '@linters/eslint-config-jest',
      ]

      schema.addDevDependencies(dependenciesAngular)
      schema.addScript('lint:ts', 'ng lint')

      schema.addJsonFileProperty('angular.json', {
        path: ['projects', projectFolder, 'architect', 'lint'],
        value: {
          builder: '@angular-eslint/builder:lint',
          options: {
            lintFilePatterns: ['src/**/*.ts', 'src/**/*.component.html'],
          },
        },
      })

      break
    }
  }

  schema.addFolder({
    label: 'eslint',
    source: path.join(__dirname, 'templates', appType),
  })

  return schema.toJson()
}
