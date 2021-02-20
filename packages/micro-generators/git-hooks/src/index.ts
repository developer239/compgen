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
    source: path.join(__dirname, 'templates'),
    context: {
      isPrettier,
      isEslint,
      isStylelint,
      isWeb: appType === AppType.REACT,
    },
  })
  schema.addDevDependencies([
    'husky',
    'lint-staged',
    '@commitlint/cli',
    '@linters/commitlint-config',
  ])

  return schema.toJson()
}
