import {
  logger,
  execute,
  askProjectName,
  isValidAngularAppName,
} from '@compgen/core'
import { createSchema } from './index'

const run = async () => {
  const { projectFolder } = await askProjectName(
    'How do you want to call your project?',
    isValidAngularAppName
  )

  const schema = createSchema({ projectFolder })

  await execute(schema, projectFolder)
}

run().catch(logger.error)
