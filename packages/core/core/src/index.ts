export { orderBy } from './helpers/array/orderBy'
export { addProperty } from './helpers/object/addProperty'
export { deepMerge } from './helpers/object/deepMerge'
export { deleteProperty } from './helpers/object/deleteProperty'
export { getProjectFolder } from './services/arguments'
export { copyFiles } from './services/files/copyFiles'
export { createFilesFromFolder } from './services/files/createFromFolder'
export { logger } from './services/logger'
export { updateJson } from './services/updateJson'
export {
  askAppType,
  askAppTypeFE,
  askYesNo,
  askCIType,
  askCDType,
  askDatabaseType,
  askQuestion,
  askProjectName,
} from './services/prompt'
export { builder } from './services/schema/builder'
export { execute } from './services/schema/executor'
export {
  addDependencies,
  removeDependencies,
  moveToDevDependencies,
} from './services/shell/dependencies'
export { execWithSpinner, exec, runLongExec } from './services/shell/exec'
export {
  execInProject,
  execInProjectWithSpinner,
} from './services/shell/execProject'
export { removeProjectFiles } from './services/shell/files'
export * from './services/validator/validateProjectFolder'
export {
  AppType,
  ISchemaCommand,
  ISchemaAddFile,
  ISchemaAddProperty,
  ISchema,
  CDType,
  CIType,
  DatabaseType,
} from './types'
export { detectAppType } from './services/auto/detectAppType'
export { hasDependency } from './services/auto/hasDependency'
export { capitalize, capitalizeAll } from './helpers/text'

// TODO: write custom recursive-copy

// eslint-disable-next-line
const originalError = console.error

// [DEP0128] DeprecationWarning: Invalid 'main' field in '/compgen/packages/core/core/node_modules/emitter-mixin/package.json'
// eslint-disable-next-line no-console
console.error = (...args) => {
  if (/DeprecationWarning: Invalid 'main' field in/u.test(args[0])) {
    return
  }
  originalError.call(console, ...args)
}
