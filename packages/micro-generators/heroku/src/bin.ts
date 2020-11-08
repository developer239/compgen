import {
  askAppType,
  execute,
  getProjectFolder,
  logger,
} from '@compgen/core'
import { askIsCRA, askPostgreAddon } from './services/prompt'
import { createSchema } from './index'

const run = async () => {
  const projectFolder = getProjectFolder() ?? '.'
  const appType = await askAppType()
  const isCRA = await askIsCRA()

  let isDatabase = false

  if (!isCRA) {
    isDatabase = await askPostgreAddon()
  }

  const herokuSchema = createSchema({
    appType,
    projectFolder,
    isCRA,
    isDatabase,
  })

  await execute(herokuSchema, projectFolder)
}

run().catch(logger.error)
