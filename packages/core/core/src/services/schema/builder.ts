import { deepMerge } from '../../helpers/object/deepMerge'
import {
  ISchemaAddFile,
  ISchema,
  ISchemaAddProperty,
  ISchemaCommand,
} from '../../types'

export const builder = (name: string) => {
  let schema = {
    name,
    commands: [],
    files: {
      add: [],
    },
    jsonFiles: {},
    dependencies: {
      add: {
        prod: [],
        dev: [],
      },
      move: {
        prod: [],
      },
      remove: [],
    },
  } as ISchema

  const addCommand = (command: ISchemaCommand) => {
    schema.commands = [...schema.commands, command]
  }

  const removeDependencies = (dependencies: string[]) => {
    schema.dependencies.remove = [
      ...schema.dependencies.remove,
      ...dependencies,
    ]
  }

  const addDependencies = (dependencies: string[]) => {
    schema.dependencies.add.prod = [
      ...schema.dependencies.add.prod,
      ...dependencies,
    ]
  }

  const addDevDependencies = (dependencies: string[]) => {
    schema.dependencies.add.dev = [
      ...schema.dependencies.add.dev,
      ...dependencies,
    ]
  }

  const moveDependencies = (dependencies: string[]) => {
    schema.dependencies.move.prod = [
      ...schema.dependencies.move.prod,
      ...dependencies,
    ]
  }

  const addJsonFileProperty = (file: string, property: ISchemaAddProperty) => {
    const targetFile = schema.jsonFiles[file]

    if (targetFile?.add) {
      targetFile.add.push(property)
    } else if (targetFile) {
      targetFile.add = [property]
    } else {
      schema.jsonFiles[file] = {
        add: [property],
      }
    }
  }

  const removeJsonFileProperty = (file: string, pathToProperty: string[]) => {
    const targetFile = schema.jsonFiles[file]

    if (targetFile?.remove) {
      targetFile.remove.push(pathToProperty)
    } else if (targetFile) {
      targetFile.remove = [pathToProperty]
    } else {
      schema.jsonFiles[file] = {
        remove: [pathToProperty],
      }
    }
  }

  const addScript = (key: string, value: string) =>
    addJsonFileProperty('package.json', {
      path: ['scripts', key],
      value,
    })

  const removeScript = (key: string) =>
    removeJsonFileProperty('package.json', ['scripts', key])

  const addFolder = (file: ISchemaAddFile) => schema.files.add.push(file)

  const combineSchema = (newSchema: ISchema) => {
    const oldSchemaName = schema.name
    schema = deepMerge(schema, newSchema)
    schema.name = oldSchemaName
  }

  const toJson = (): ISchema => schema

  return {
    addCommand,
    removeDependencies,
    addDependencies,
    addDevDependencies,
    moveDependencies,
    addScript,
    removeScript,
    addJsonFileProperty,
    removeJsonFileProperty,
    combineSchema,
    addFolder,
    toJson,
  }
}
