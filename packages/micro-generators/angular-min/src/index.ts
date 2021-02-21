import path from 'path'
import { builder } from '@compgen/core'

interface IOptions {
  projectFolder: string
}

export const createSchema = ({ projectFolder }: IOptions) => {
  const schema = builder('angular-min')

  schema.addFolder({
    label: 'base codebase',
    source: path.join(__dirname, 'templates/base'),
    context: {
      projectFolder,
    },
  })

  schema.addCommand({
    command: `npx ng new ${projectFolder} --package-manager=yarn --routing --skip-git --strict --style=scss`,
    successMessage: '[ng] new',
    priority: 99,
  })

  schema.addJsonFileProperty('angular.json', {
    path: ['projects', projectFolder, 'architect', 'test'],
    value: {
      builder: '@angular-builders/jest:run',
      options: {
        modulePathIgnorePatterns: ['dist/'],
        testTimeout: 10000,
        passWithNoTests: true,
        coverageReporters: ['json-summary', 'text', 'lcov'],
      },
    },
  })

  // TODO: remove property instead
  schema.addJsonFileProperty('angular.json', {
    path: ['projects', projectFolder, 'architect', 'e2e'],
    value: 'not implemented',
  })

  schema.addCommand({
    command:
      'rm -rf e2e karma.conf.js tslint.json README.md src/test.ts .browserslistrc .editorconfig',
    successMessage: '[fs][remove files] project files',
    priority: 97,
    shouldRunInProject: true,
  })

  schema.removeScript('lint')
  schema.removeScript('e2e')

  schema.removeDependencies([
    '@types/jasmine',
    'jasmine-core',
    'jasmine-spec-reporter',
    'karma',
    'karma-chrome-launcher',
    'karma-coverage',
    'karma-jasmine',
    'karma-jasmine-html-reporter',
    'protractor',
  ])

  schema.addDevDependencies([
    'jest',
    '@types/jest',
    '@angular-builders/jest',
    'jest-preset-angular',
  ])

  return schema.toJson()
}
