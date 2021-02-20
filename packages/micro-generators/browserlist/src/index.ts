import path from 'path'
import { builder } from '@compgen/core'

export const createSchema = () => {
  const schema = builder('browserlist')
  schema.addFolder({
    label: 'browserlist',
    source: path.join(__dirname, 'templates'),
  })

  return schema.toJson()
}
