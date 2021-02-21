import ora from 'ora'
import { copyFiles } from './copyFiles'

interface IOptions {
  name: string
  projectFolder?: string
  source: string
  context?: Object
  destination?: string
}

export const createFilesFromFolder = async ({
  name,
  projectFolder = '.',
  source,
  context,
  destination = '.',
}: IOptions) => {
  const spinner = ora()
  spinner.start(`[generator] running ${name}`)

  try {
    await copyFiles(source, destination, projectFolder, context)
    spinner.succeed(`[generator] create ${name}`)
  } catch (error) {
    spinner.warn(`[generator] ${name} error: ${error}`)
    throw error
  }
}
