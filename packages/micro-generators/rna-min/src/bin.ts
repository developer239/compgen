import { askProjectName, execute, logger, toAlphanumeric } from '@compgen/core'
import { createSchema } from './index'

const run = async () => {
  const projectInfo = await askProjectName()
  const { projectFolder } = projectInfo

  const schema = createSchema({ projectFolder: toAlphanumeric(projectFolder) })

  await execute(schema, toAlphanumeric(projectFolder))
}

run().catch(logger.error)
