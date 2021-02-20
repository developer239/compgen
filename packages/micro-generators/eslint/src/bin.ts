import { askAppType, execute, getProjectFolder, logger } from '@compgen/core'
import { createSchema } from './index'

const run = async () => {
  const projectFolder = getProjectFolder() ?? '.'
  const appType = await askAppType()

  const eslintSchema = createSchema({ appType, projectFolder })

  await execute(eslintSchema, projectFolder)
}

run().catch(logger.error)
