import { logger, execute, askProjectName, toAlphanumeric } from '@compgen/core'
import { createSchema } from './index'

const run = async () => {
  const { projectFolder } = await askProjectName()

  const schema = createSchema({ projectFolder: toAlphanumeric(projectFolder) })

  await execute(schema, toAlphanumeric(projectFolder))
}

run().catch(logger.error)
