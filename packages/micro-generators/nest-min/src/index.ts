import path from 'path'
import { builder } from '@compgen/core'

interface IOptions {
  projectFolder: string
  isDatabase: boolean
}

export const createSchema = ({ projectFolder, isDatabase }: IOptions) => {
  const schema = builder('nestjs')

  schema.addCommand({
    command: `npx @nestjs/cli new ${projectFolder} --package-manager yarn`,
    successMessage: '[nest.js] initialize',
    priority: 99,
  })

  schema.addDependencies([
    '@nestjs/config',
    'class-transformer',
    '@nestjs/swagger',
    'swagger-ui-express',
    '@godaddy/terminus',
    '@nestjs/terminus',
  ])

  schema.addCommand({
    command: 'rm -rf src test .eslintrc.js .prettierrc README.md',
    successMessage: '[fs][remove files] old project structure',
    priority: 98,
    shouldRunInProject: true,
  })

  schema.removeJsonFileProperty('package.json', ['jest'])
  schema.removeJsonFileProperty('package.json', ['scripts', 'lint'])
  schema.removeJsonFileProperty('package.json', ['scripts', 'test:e2e])'])

  schema.addScript('start:dev', 'NODE_ENV=development nest start --watch')

  schema.addScript('nestjs-postbuild', 'npm run build')

  schema.addFolder({
    label: 'nest.js base',
    source: path.join(__dirname, 'templates/base'),
    context: {
      isDatabase,
      projectFolder,
    },
  })

  if (isDatabase) {
    schema.addDependencies([
      'pg',
      'typeorm',
      '@nestjs/typeorm',
      'pg-connection-string',
    ])
    schema.addDevDependencies(['@types/pg-connection-string'])

    schema.addFolder({
      label: 'nest.js base',
      source: path.join(__dirname, 'templates/typeorm'),
      context: {
        isDatabase,
        projectFolder,
      },
    })
  }

  return schema.toJson()
}
