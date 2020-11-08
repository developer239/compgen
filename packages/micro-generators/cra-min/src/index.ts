import path from 'path'
import { builder } from '@compgen/core'

interface IOptions {
  projectFolder: string
  isRouter: boolean
}

export const createSchema = ({
  projectFolder,
  isRouter,
}: IOptions) => {
  const schema = builder('create-react-app')
  schema.addCommand({
    command: `npx create-react-app ${projectFolder} --template typescript`,
    successMessage: '[create react app] initialize',
    priority: 99,
  })
  schema.addCommand({
    command: 'rm -rf src/*',
    successMessage: '[fs][remove files] old project structure',
    priority: 98,
    shouldRunInProject: true,
  })
  // TODO: remove when they fix their 💩
  // https://github.com/facebook/create-react-app/issues/8714
  schema.addCommand({
    command: 'yarn upgrade typescript --latest',
    successMessage: '[dependencies] updated to latest typescript',
    priority: 97,
    shouldRunInProject: true,
  })

  schema.moveDependencies([
    '@types/jest',
    '@types/node',
    '@types/react',
    '@types/react-dom',
    '@testing-library/jest-dom',
    '@testing-library/react',
    '@testing-library/user-event',
  ])
  schema.addDevDependencies([
    '@types/webpack-env',
    '@types/styled-components',
    'jest-styled-components',
  ])
  schema.addDependencies(['styled-components', 'sanitize.css'])

  schema.addJsonFileProperty('tsconfig.json', {
    path: ['compilerOptions', 'baseUrl'],
    value: 'src',
  })

  schema.removeJsonFileProperty('package.json', ['private'])
  schema.removeJsonFileProperty('package.json', ['browserslist'])
  schema.removeJsonFileProperty('package.json', ['eslintConfig'])
  schema.removeJsonFileProperty('package.json', ['scripts', 'eject'])
  schema.removeJsonFileProperty('package.json', ['scripts', 'start'])

  schema.addScript('dev', 'react-scripts start')

  schema.addFolder({
    name: 'create react app base',
    source: path.join(__dirname, 'templates/base'),
    context: {
      projectFolder,
    },
  })

  if (isRouter) {
    schema.addDependencies(['react-router', 'react-router-dom'])
    schema.addDevDependencies(['@types/react-router-dom'])

    schema.addFolder({
      name: 'create react app router',
      source: path.join(__dirname, 'templates/react-router'),
      context: {
        projectFolder,
      },
    })
  }

  return schema.toJson()
}
