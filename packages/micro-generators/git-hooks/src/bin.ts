import {
  AppType,
  askAppType,
  execute,
  getProjectFolder,
  logger,
} from '@compgen/core'
import { askIsEslint, askIsPrettier, askIsStylelint } from './services/prompt'
import { createSchema } from './index'

const run = async () => {
  const projectFolder = getProjectFolder() ?? '.'
  const appType = await askAppType()
  const isEslint = await askIsEslint()
  const isPrettier = await askIsPrettier()

  let isStylelint = false

  if (appType !== AppType.NODE) {
    isStylelint = await askIsStylelint()
  }

  const schema = createSchema({
    appType,
    isEslint,
    isPrettier,
    isStylelint,
  })

  await execute(schema, projectFolder)
}

run().catch(logger.error)
