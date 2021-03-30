import path from 'path'
import { builder } from '@compgen/core'

export interface IOptions {
  hasReadme: boolean
  componentName: string
}

export const createSchema = ({ hasReadme, componentName }: IOptions) => {
  const schema = builder('react-component')

  schema.addFolder({
    label: 'react-component',
    source: path.join(__dirname, 'templates', 'base'),
    context: {
      componentName,
    },
  })

  if (hasReadme) {
    schema.addFolder({
      label: 'react-component-readme',
      source: path.join(__dirname, 'templates', 'base'),
      context: {
        componentName,
      },
    })
  }

  return schema.toJson()
}
