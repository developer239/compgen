import path from 'path'
import { AppType, builder } from '@compgen/core'

export const createSchema = ({ appType }: { appType: AppType }) => {
  const schema = builder('prettier')

  schema.addFolder({
    name: 'prettier',
    source: path.join(__dirname, 'templates'),
  })

  if (appType === 'node') {
    schema.addScript('format', "prettier --write '*/**/*.{ts,md,json}'")
  } else {
    schema.addScript('format', "prettier --write '*/**/*.{ts,tsx,css,md,json}'")
  }

  schema.addDevDependencies(['prettier', '@linters/prettier-config'])

  return schema.toJson()
}
