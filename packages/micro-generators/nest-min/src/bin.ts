import {
  askProjectName,
  execute,
  logger,
} from '@compgen/core'
import { askIsDatabase } from './services/prompt'
import { createSchema } from './index'

const run = async () => {
  const { projectFolder } = await askProjectName()
  const isDatabase = await askIsDatabase()

  const nestJsSchema = createSchema({
    projectFolder,
    isDatabase,
  })

  await execute(nestJsSchema, projectFolder)
}

run().catch(logger.error)
