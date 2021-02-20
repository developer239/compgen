import { askProjectName, execute, logger } from '@compgen/core'
import { createSchema } from './index'

const run = async () => {
  const projectInfo = await askProjectName()
  const { projectFolder } = projectInfo

  const schema = createSchema({ projectFolder })

  await execute(schema, projectFolder)
}

run().catch(logger.error)
