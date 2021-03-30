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
  const projectFolder = getProjectFolder() ?? '.'
  const componentName = await askQuestion('What is the components name?')
  const hasReadme = await askYesNo('Do you want to generate Readme.md?')

  const tsNodeSchema = createSchema({
    hasReadme,
    componentName: capitalize(componentName),
  })

  await execute(tsNodeSchema, projectFolder)
}

run().catch(logger.error)
