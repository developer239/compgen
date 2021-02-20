/* eslint-disable max-lines,max-lines-per-function */
import { builder } from './builder'

describe('[services][schema] builder', () => {
  it('should set name', () => {
    const name = 'some-name'
    const schema = builder(name)

    expect(schema.toJson()).toStrictEqual({
      name,
      commands: [],
      dependencies: {
        add: {
          dev: [],
          prod: [],
        },
        move: {
          prod: [],
        },
        remove: [],
      },
      files: {
        add: [],
      },
      jsonFiles: {},
    })
  })

  describe('when working with commands', () => {
    it('should add commands', () => {
      const name = 'some-name'

      const schema = builder(name)
      schema.addCommand({
        command: 'npx some first command',
        successMessage: '[npx] yay',
        priority: 99,
      })
      schema.addCommand({
        command: 'npx command with higher priority',
        successMessage: '[npx] priority 999 run in project',
        priority: 999,
        shouldRunInProject: true,
      })

      expect(schema.toJson()).toStrictEqual({
        name,
        commands: [
          {
            command: 'npx some first command',
            priority: 99,
            successMessage: '[npx] yay',
          },
          {
            command: 'npx command with higher priority',
            priority: 999,
            shouldRunInProject: true,
            successMessage: '[npx] priority 999 run in project',
          },
        ],
        dependencies: {
          add: {
            dev: [],
            prod: [],
          },
          move: {
            prod: [],
          },
          remove: [],
        },
        files: {
          add: [],
        },
        jsonFiles: {},
      })
    })
  })

  describe('when working with dependencies', () => {
    it('should add dependencies', () => {
      const name = 'some-name'

      const schema = builder(name)
      schema.addDependencies(['first-dependency', 'second'])
      schema.addDependencies(['third-added-later'])

      expect(schema.toJson()).toStrictEqual({
        name,
        commands: [],
        dependencies: {
          add: {
            dev: [],
            prod: ['first-dependency', 'second', 'third-added-later'],
          },
          move: {
            prod: [],
          },
          remove: [],
        },
        files: {
          add: [],
        },
        jsonFiles: {},
      })
    })

    it('should add dev dependencies', () => {
      const name = 'some-name'

      const schema = builder(name)
      schema.addDependencies(['dev-first-dependency', 'dev-second'])
      schema.addDependencies(['dev-third-added-later'])

      expect(schema.toJson()).toStrictEqual({
        name,
        commands: [],
        dependencies: {
          add: {
            dev: [],
            prod: [
              'dev-first-dependency',
              'dev-second',
              'dev-third-added-later',
            ],
          },
          move: {
            prod: [],
          },
          remove: [],
        },
        files: {
          add: [],
        },
        jsonFiles: {},
      })
    })

    it('should move prod to dev dependencies', () => {
      const name = 'some-name'

      const schema = builder(name)
      schema.moveDependencies(['first-dependency', 'second'])
      schema.moveDependencies(['third-added-later'])

      expect(schema.toJson()).toStrictEqual({
        name,
        commands: [],
        dependencies: {
          add: {
            dev: [],
            prod: [],
          },
          move: {
            prod: ['first-dependency', 'second', 'third-added-later'],
          },
          remove: [],
        },
        files: {
          add: [],
        },
        jsonFiles: {},
      })
    })
  })

  describe('when working with json files', () => {
    it('should add json property', () => {
      const name = 'some-name'

      const schema = builder(name)
      schema.addJsonFileProperty('some-file.json', {
        path: ['some', 'path', 'in', 'json'],
        value: 'some value',
      })
      schema.addJsonFileProperty('some-file.json', {
        path: ['another', 'path', 'in', 'another', 'json'],
        value: 'another value',
      })

      expect(schema.toJson()).toStrictEqual({
        name,
        commands: [],
        dependencies: {
          add: {
            dev: [],
            prod: [],
          },
          move: {
            prod: [],
          },
          remove: [],
        },
        files: {
          add: [],
        },
        jsonFiles: {
          'some-file.json': {
            add: [
              {
                path: ['some', 'path', 'in', 'json'],
                value: 'some value',
              },
              {
                path: ['another', 'path', 'in', 'another', 'json'],
                value: 'another value',
              },
            ],
          },
        },
      })
    })

    it('should remove json property', () => {
      const name = 'some-name'

      const schema = builder(name)
      schema.removeJsonFileProperty('some-file.json', [
        'some',
        'path',
        'in',
        'json',
      ])
      schema.removeJsonFileProperty('some-file.json', [
        'another',
        'path',
        'in',
        'another',
        'json',
      ])

      expect(schema.toJson()).toStrictEqual({
        name,
        commands: [],
        dependencies: {
          add: {
            dev: [],
            prod: [],
          },
          move: {
            prod: [],
          },
          remove: [],
        },
        files: {
          add: [],
        },
        jsonFiles: {
          'some-file.json': {
            remove: [
              ['some', 'path', 'in', 'json'],
              ['another', 'path', 'in', 'another', 'json'],
            ],
          },
        },
      })
    })

    it('should add package.json scripts', () => {
      const name = 'some-name'

      const schema = builder(name)
      schema.addScript('lint', 'files')
      schema.addScript('prettier', 'files')

      expect(schema.toJson()).toStrictEqual({
        name,
        commands: [],
        dependencies: {
          add: {
            dev: [],
            prod: [],
          },
          move: {
            prod: [],
          },
          remove: [],
        },
        files: {
          add: [],
        },
        jsonFiles: {
          'package.json': {
            add: [
              {
                path: ['scripts', 'lint'],
                value: 'files',
              },
              {
                path: ['scripts', 'prettier'],
                value: 'files',
              },
            ],
          },
        },
      })
    })

    it('should remove package.json scripts', () => {
      const name = 'some-name'

      const schema = builder(name)
      schema.removeScript('lint')
      schema.removeScript('prettier')

      expect(schema.toJson()).toStrictEqual({
        name,
        commands: [],
        dependencies: {
          add: {
            dev: [],
            prod: [],
          },
          move: {
            prod: [],
          },
          remove: [],
        },
        files: {
          add: [],
        },
        jsonFiles: {
          'package.json': {
            remove: [
              ['scripts', 'lint'],
              ['scripts', 'prettier'],
            ],
          },
        },
      })
    })
  })

  describe('when working with file system', () => {
    it('should add files', () => {
      const name = 'some-name'

      const schema = builder(name)
      schema.addFolder({
        label: 'path/to/dest',
        source: 'path/to/source',
        context: { projectName: name },
      })

      expect(schema.toJson()).toStrictEqual({
        commands: [],
        dependencies: {
          add: {
            dev: [],
            prod: [],
          },
          move: {
            prod: [],
          },
          remove: [],
        },
        files: {
          add: [
            {
              context: {
                projectName: 'some-name',
              },
              label: 'path/to/dest',
              source: 'path/to/source',
            },
          ],
        },
        name: 'some-name',
        jsonFiles: {},
      })
    })
  })
})
