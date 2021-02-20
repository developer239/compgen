import {
  AppType,
  askAppTypeFE,
  execute,
  getProjectFolder,
  logger,
} from '@compgen/core'
import { askHasPrettier } from './services/prompt'
import { createSchemaForMobile, createSchemaForWeb } from './index'

const run = async () => {
  const projectFolder = getProjectFolder() ?? '.'
  const type = await askAppTypeFE()
  const hasPrettier = await askHasPrettier()

  const stylelintSchema =
    type === AppType.REACT
      ? createSchemaForWeb({ hasPrettier })
      : createSchemaForMobile({ hasPrettier })

  await execute(stylelintSchema, projectFolder)
}

run().catch(logger.error)
