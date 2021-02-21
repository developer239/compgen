import {
  logger,
  execute,
  askProjectName,
  isValidReactNativeAppName,
} from '@compgen/core'
import { askNavigationType } from '@compgen/rna-min'
import { createSchema } from './index'

const run = async () => {
  const { projectFolder } = await askProjectName(
    'How do you want to call your project?',
    isValidReactNativeAppName
  )
  const navigationType = await askNavigationType()

  const schema = createSchema({
    projectFolder,
    navigationType,
  })

  await execute(schema, projectFolder)
}

run().catch(logger.error)
