/* eslint-disable no-await-in-loop */
import { getProjectFolder, logger, execute, askAppType } from '@compgen/core'
import { createSchema } from './index'

const run = async () => {
  const projectFolder = getProjectFolder() ?? '.'
  const appType = await askAppType()

  const codeQualitySchema = createSchema({ appType, projectFolder })

  await execute(codeQualitySchema, projectFolder)
}

run().catch(logger.error)
