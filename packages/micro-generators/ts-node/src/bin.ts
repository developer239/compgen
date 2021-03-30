import { execute, getProjectFolder, logger } from '@compgen/core'
import { createSchema } from './index'

const run = async () => {
  const projectFolder = getProjectFolder() ?? '.'

  const schema = createSchema()

  await execute(schema, projectFolder)
}

run().catch(logger.error)
