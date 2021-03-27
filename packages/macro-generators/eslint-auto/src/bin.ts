/* eslint-disable no-await-in-loop */
import { getProjectFolder, logger, execute, askYesNo } from '@compgen/core'
import { createSchema } from './index'

const run = async () => {
  const projectFolder = getProjectFolder() ?? '.'
  const hasPrettier = await askYesNo('Do you use prettier?')

  const schema = await createSchema({ projectFolder, hasPrettier })

  await execute(schema, projectFolder)
}

run().catch(logger.error)
