/* eslint-disable security/detect-non-literal-fs-filename */
import fs from 'fs/promises'
import path from 'path'
import ora from 'ora'

interface IOptions {
  fileName: string
  projectFolder: string
  message: string
  messageSuccess: string
}

type jsonFileType = any

export const updateJson = async (
  { fileName, projectFolder, message, messageSuccess }: IOptions,
  updateFile: (packageJson: jsonFileType) => Promise<jsonFileType>
) => {
  const spinner = ora()
  spinner.start(message)

  const jsonFilePath = path.join(process.cwd(), projectFolder, fileName)

  try {
    await fs.readFile(jsonFilePath)
  } catch (error) {
    spinner.warn(`${messageSuccess} -- FAILED ${error.message}`)
    throw error
  }

  if (require?.cache[jsonFilePath]) {
    delete require.cache[jsonFilePath]
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires,security/detect-non-literal-require
  const jsonFile = require(jsonFilePath)

  const updatedJsonFile = await updateFile(jsonFile)

  await fs.writeFile(jsonFilePath, JSON.stringify(updatedJsonFile, null, 2))
  spinner.succeed(messageSuccess)
}
