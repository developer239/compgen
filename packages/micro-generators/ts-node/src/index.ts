import path from 'path'
import { builder } from '@compgen/core'

export const createSchema = () => {
  const schema = builder('ts-node')
  schema.addScript('start', 'ts-node -r tsconfig-paths/register src/index.ts')
  schema.addScript('build', 'tsc')
  schema.addDevDependencies([
    'typescript',
    'ts-node',
    'tsconfig-paths',
    '@types/node',
  ])

  schema.addFolder({
    name: 'ts-node',
    source: path.join(__dirname, 'templates'),
  })

  return schema.toJson()
}
