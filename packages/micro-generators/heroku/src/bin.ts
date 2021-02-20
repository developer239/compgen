import {
  AppType,
  askAppType,
  askProjectName,
  execute,
  getProjectFolder,
  logger,
} from '@compgen/core'
import { askIsCRA, askPostgreAddon } from './services/prompt'
import { createSchema } from './index'

const run = async () => {
  // TODO: ask only if web/node
  const appType = await askAppType()

  if (appType === AppType.REACT_NATIVE) {
    return logger.error(`${appType} not supported`)
  }

  const projectFolder = getProjectFolder() ?? '.'
  let projectName = projectFolder
  let isCRA = false
  let isDatabase = false

  if (projectName === '.') {
    const projectInfo = await askProjectName('How is your project called?')
    projectName = projectInfo.projectFolder
  }

  if (appType === AppType.NODE) {
    isDatabase = await askPostgreAddon()
  } else if (appType === AppType.REACT) {
    isCRA = await askIsCRA()
  }

  const herokuSchema = createSchema({
    appType,
    projectName,
    isCRA,
    isDatabase,
  })

  await execute(herokuSchema, projectFolder)
}

run().catch(logger.error)
