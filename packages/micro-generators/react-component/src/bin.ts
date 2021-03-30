import {
  execute,
  getProjectFolder,
  logger,
  askYesNo,
  askQuestion,
  capitalize,
} from '@compgen/core'
import { createSchema } from './index'

const run = async () => {
  const componentName = await askQuestion('What is the components name?')
  const projectFolder = getProjectFolder() ?? componentName
  const hasReadme = await askYesNo('Do you want to generate Readme.md?')

  const schema = createSchema({
    hasReadme,
    componentName: capitalize(componentName),
  })

  await execute(schema, projectFolder)
}

run().catch(logger.error)
