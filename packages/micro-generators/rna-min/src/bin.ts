import {
  askProjectName,
  execute,
  logger,
  isValidReactNativeAppName,
} from '@compgen/core'
import { askNavigationType } from './prompt'
import { createSchema } from './index'

const run = async () => {
  const projectInfo = await askProjectName(
    'How do you want to call your project?',
    isValidReactNativeAppName
  )
  const navigationType = await askNavigationType()
  const { projectFolder } = projectInfo

  const schema = createSchema({
    projectFolder,
    navigationType,
  })

  await execute(schema, projectFolder)
}

run().catch(logger.error)
