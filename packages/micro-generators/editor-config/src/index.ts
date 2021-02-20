import path from 'path'
import { builder } from '@compgen/core'

export const createSchema = () => {
  const schema = builder('editorconfig')
  schema.addFolder({
    label: 'editorconfig',
    source: path.join(__dirname, 'templates'),
  })

  return schema.toJson()
}
