import {
  askAppType,
  execute,
  getProjectFolder,
  logger,
} from '@compgen/core'
import { createSchema } from './index'

const run = async () => {
  const projectFolder = getProjectFolder() ?? '.'
  const appType = await askAppType()

  const prettierSchema = createSchema({ appType })

  await execute(prettierSchema, projectFolder)
}

run().catch(logger.error)
