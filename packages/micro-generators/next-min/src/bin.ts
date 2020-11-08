import { askProjectName, execute, logger } from '@compgen/core'
import { createSchema } from './index'

const run = async () => {
  const { projectFolder } = await askProjectName()

  const nextJsSchema = createSchema({
    projectFolder,
  })

  await execute(nextJsSchema, projectFolder)
}

run().catch(logger.error)
