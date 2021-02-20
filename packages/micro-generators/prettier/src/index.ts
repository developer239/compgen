import path from 'path'
import { AppType, builder } from '@compgen/core'

export const createSchema = ({ appType }: { appType: AppType }) => {
  const schema = builder('prettier')

  schema.addFolder({
    label: 'prettier',
    source: path.join(__dirname, 'templates'),
  })

  switch (appType) {
    case AppType.REACT:
    case AppType.REACT_NATIVE:
      schema.addScript(
        'format',
        "prettier --write '*/**/*.{ts,tsx,css,md,json}'"
      )
      break
    case AppType.NODE:
      schema.addScript('format', "prettier --write '*/**/*.{ts,md,json}'")
      break
    case AppType.ANGULAR:
      schema.addScript('format', "prettier --write '*/**/*.{ts,scss,md,json}'")
      break
  }

  schema.addDevDependencies(['prettier', '@linters/prettier-config'])

  return schema.toJson()
}
