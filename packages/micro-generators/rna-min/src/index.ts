import path from 'path'
import { builder } from '@compgen/core'

interface IOptions {
  projectFolder: string
}

const formatRNAName = (projectFolder: string) => projectFolder.replace('-', '')

export const createSchema = ({ projectFolder }: IOptions) => {
  const schema = builder('rna-min')

  schema.addFolder({
    label: 'base codebase',
    source: path.join(__dirname, 'templates/base'),
    context: {
      projectFolder,
    },
  })

  schema.addCommand({
    command: `npx react-native init ${formatRNAName(
      projectFolder
    )} --version 0.61.5`,
    successMessage: '[create react app] initialize',
    priority: 99,
  })
  schema.addCommand({
    command:
      'rm .eslintrc.js .flowconfig .prettierrc.js App.js babel.config.js index.js',
    successMessage: '[fs][remove files] default files',
    priority: 98,
    shouldRunInProject: true,
  })
  schema.addCommand({
    command: 'rm -rf __tests__',
    successMessage: '[fs][remove files] __tests__',
    priority: 97,
    shouldRunInProject: true,
  })

  schema.removeScript('android')
  schema.removeScript('ios')
  schema.removeScript('start')
  schema.removeScript('lint')

  schema.addScript('start', 'react-native start --reset-cache')
  schema.addScript('start:android', 'react-native run-android')
  schema.addScript('start:ios', 'react-native run-ios')

  schema.addDependencies(['styled-components'])
  schema.addDevDependencies([
    'typescript',
    'babel-plugin-inline-import',
    'metro-react-native-babel-preset',
    '@types/jest @types/react',
    '@types/react-native',
    '@testing-library/react-native',
    '@types/node @types/styled-components',
    'babel-plugin-module-resolver',
    'react-test-renderer',
    '@types/react-test-renderer',
  ])
  schema.removeDependencies(['@react-native-community/eslint-config'])

  return schema.toJson()
}
