import {
  askAppType,
  askYesNo,
  execute,
  getProjectFolder,
  logger,
} from '@compgen/core'
import { createSchema } from './index'

const run = async () => {
  const projectFolder = getProjectFolder() ?? '.'
  const appType = await askAppType()
  const hasPrettier = await askYesNo('Do you use prettier?')

  const eslintSchema = createSchema({ appType, projectFolder, hasPrettier })

  await execute(eslintSchema, projectFolder)
}

run().catch(logger.error)
