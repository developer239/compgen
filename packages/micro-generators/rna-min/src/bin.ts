import { askProjectName, execute, logger, toAlphanumeric } from '@compgen/core'
import { askNavigationType } from './prompt'
import { createSchema } from './index'

const run = async () => {
  const projectInfo = await askProjectName()
  const navigationType = await askNavigationType()
  const { projectFolder } = projectInfo

  const schema = createSchema({
    projectFolder: toAlphanumeric(projectFolder),
    navigationType,
  })

  await execute(schema, toAlphanumeric(projectFolder))
}

run().catch(logger.error)
