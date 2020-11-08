import path from 'path'
import { AppType, builder } from '@compgen/core'

interface IOptions {
  appType: AppType
  isCRA: boolean
  projectFolder: string
  isDatabase?: boolean
}

export const createSchema = ({
  appType,
  isCRA,
  projectFolder,
  isDatabase,
}: IOptions) => {
  const schema = builder('heroku')

  schema.addScript('heroku-postbuild', 'npm run build')

  if (isCRA) {
    schema.addDependencies(['serve'])
    schema.addScript('start', 'node node_modules/.bin/serve -s build')
  }

  schema.addFolder({
    name: 'heroku',
    source: path.join(__dirname, 'templates', appType),
    context: {
      projectFolder,
      isDatabase: Boolean(isDatabase),
    },
  })

  return schema.toJson()
}
