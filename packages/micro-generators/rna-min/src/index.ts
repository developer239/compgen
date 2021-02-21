import path from 'path'
import { builder } from '@compgen/core'

export { askNavigationType } from './prompt'

export enum NavigationType {
  NONE = 'NONE',
  REACT_NAVIGATION = 'REACT_NAVIGATION',
}

export interface IOptions {
  projectFolder: string
  navigationType: NavigationType
}

export const createSchema = ({ projectFolder, navigationType }: IOptions) => {
  const schema = builder('rna-min')

  schema.addFolder({
    label: 'base codebase',
    source: path.join(__dirname, 'templates/base'),
    context: {
      projectFolder,
    },
  })

  schema.addCommand({
    command: `npx react-native init ${projectFolder} --version 0.61.5`,
    successMessage: '[create react app] initialize',
    priority: 99,
  })
  schema.addCommand({
    command:
      'rm .eslintrc.js.hbs .flowconfig .prettierrc.js App.js babel.config.js index.js e2e',
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
  schema.addScript('postinstall', 'pod install --project-directory=ios')

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

  switch (navigationType) {
    case NavigationType.REACT_NAVIGATION:
      schema.addDependencies([
        'react-navigation',
        'react-native-reanimated',
        'react-native-gesture-handler',
        'react-native-screens',
        'react-native-safe-area-context',
        'react-navigation-stack',
        'react-navigation-tabs',
      ])
      schema.addFolder({
        label: 'react navigation codebase',
        source: path.join(__dirname, 'templates/react-navigation'),
        context: {
          projectFolder,
        },
      })
      break
  }

  return schema.toJson()
}
