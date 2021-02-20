import { logger, execute, askProjectName, toAlphanumeric } from '@compgen/core'
import { askNavigationType } from '@compgen/rna-min'
import { createSchema } from './index'

const run = async () => {
  const { projectFolder } = await askProjectName()
  const navigationType = await askNavigationType()

  const schema = createSchema({
    projectFolder: toAlphanumeric(projectFolder),
    navigationType,
  })

  await execute(schema, toAlphanumeric(projectFolder))
}

run().catch(logger.error)
