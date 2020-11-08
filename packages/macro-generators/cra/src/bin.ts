import { logger, execute, askProjectName, askYesNo } from '@compgen/core'
import { createSchema } from './index'

const run = async () => {
  const { projectFolder } = await askProjectName()
  const isRouter = await askYesNo('Do you want to configure router?')
  const isHeroku = await askYesNo(
    'Do you want to generate Heroku configuration?'
  )

  const schema = createSchema({ projectFolder, isHeroku, isRouter })

  await execute(schema, projectFolder)
}

run().catch(logger.error)
