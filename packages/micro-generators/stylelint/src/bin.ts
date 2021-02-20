import {
  AppType,
  askAppTypeFE,
  execute,
  getProjectFolder,
  logger,
} from '@compgen/core'
import { askHasPrettier } from './services/prompt'
import { createSchemaForReactNative, createSchemaForReact } from './index'

const run = async () => {
  const projectFolder = getProjectFolder() ?? '.'
  const type = await askAppTypeFE()
  const hasPrettier = await askHasPrettier()

  const stylelintSchema =
    type === AppType.REACT
      ? createSchemaForReact({ hasPrettier })
      : createSchemaForReactNative({ hasPrettier })

  await execute(stylelintSchema, projectFolder)
}

run().catch(logger.error)
