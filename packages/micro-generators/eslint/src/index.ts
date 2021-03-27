import path from 'path'
import { AppType, builder } from '@compgen/core'

interface IOptions {
  appType: AppType
  projectFolder: string
  hasPrettier: boolean
}

export const createSchema = ({
  appType,
  projectFolder,
  hasPrettier,
}: IOptions) => {
  const schema = builder('eslint')

  const dependenciesShared = [
    'eslint',
    'eslint-plugin-import',
    '@linters/eslint-config-typescript',
    '@linters/eslint-config-jest',
  ]

  if (hasPrettier) {
    dependenciesShared.push('eslint-config-prettier')
  }

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

      const projectKey =
        projectFolder === '.' ? process.cwd().split('/').pop()! : projectFolder

      schema.addJsonFileProperty('angular.json', {
        path: ['projects', projectKey, 'architect', 'lint'],
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
    context: { hasPrettier },
  })

  return schema.toJson()
}
