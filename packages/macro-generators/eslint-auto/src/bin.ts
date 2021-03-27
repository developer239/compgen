/* eslint-disable no-await-in-loop */
import { getProjectFolder, logger, execute } from '@compgen/core'
import { createSchema } from './index'

const run = async () => {
  const projectFolder = getProjectFolder() ?? '.'
  const schema = await createSchema({ projectFolder })

  await execute(schema, projectFolder)
}

run().catch(logger.error)
