import path from 'path'
import { AppType, builder } from '@compgen/core'

export interface IOptions {
  appType: AppType
  isPrettier: boolean
  isEslint: boolean
  isStylelint: boolean
}

export const createSchema = ({
  appType,
  isPrettier,
  isEslint,
  isStylelint,
}: IOptions) => {
  const schema = builder('git-hooks')
  schema.addFolder({
    label: 'git-hooks',
    source: path.join(__dirname, 'templates', 'base'),
  })

  switch (appType) {
    case AppType.REACT_NATIVE:
    case AppType.REACT:
      schema.addFolder({
        label: 'git-hooks',
        source: path.join(__dirname, 'templates', 'react-and-react-native'),
        context: {
          isPrettier,
          isEslint,
          isStylelint,
        },
      })
      break
    case AppType.NODE:
      schema.addFolder({
        label: 'git-hooks',
        source: path.join(__dirname, 'templates', 'node'),
        context: {
          isPrettier,
          isEslint,
        },
      })
      break
    case AppType.ANGULAR:
      schema.addFolder({
        label: 'git-hooks',
        source: path.join(__dirname, 'templates', 'angular'),
        context: {
          isPrettier,
          isEslint,
          isStylelint,
        },
      })
      break
  }

  schema.addDevDependencies([
    'husky',
    'lint-staged',
    '@commitlint/cli',
    '@linters/commitlint-config',
  ])

  return schema.toJson()
}
