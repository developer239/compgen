import { logger, execute, askProjectName } from '@compgen/core'
import { createSchema } from './index'

const run = async () => {
  const { projectFolder } = await askProjectName()

  const schema = createSchema({ projectFolder })

  await execute(schema, projectFolder)
}

run().catch(logger.error)
