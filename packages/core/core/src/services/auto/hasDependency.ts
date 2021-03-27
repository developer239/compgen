import fs from 'fs/promises'
import path from 'path'
import ora from 'ora'

export interface IOptions {
  fileName?: string
  projectFolder: string
  dependencies: string[]
}

export interface IPackageJson {
  dependencies: {
    [key: string]: string
  }
  peerDependencies: {
    [key: string]: string
  }
  devDependencies: {
    [key: string]: string
  }
}

// TODO: there is quite a lot of duplication here and in services/updateJson
export const hasDependency = async <TResult>({
  fileName = 'package.json',
  projectFolder,
  dependencies,
}: IOptions): Promise<TResult> => {
  const message = 'Detecting dependencies'
  const messageSuccess = 'Finished dependencies detection'

  const spinner = ora()
  spinner.start(message)

  const jsonFilePath = path.join(process.cwd(), projectFolder, fileName)

  // We need to check if file exist
  try {
    await fs.readFile(jsonFilePath)
  } catch (error) {
    spinner.warn(`${messageSuccess} -- FAILED ${error.message}`)
    throw error
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires,security/detect-non-literal-require
  const jsonFile = require(jsonFilePath) as IPackageJson

  const result = {} as { [key: string]: boolean }

  for (const dependency of dependencies) {
    // TODO: use regex and simplify detectAppType
    result[dependency] = Boolean(
      jsonFile.dependencies?.[dependency] ||
        jsonFile.devDependencies?.[dependency] ||
        jsonFile.peerDependencies?.[dependency]
    )
  }

  spinner.succeed(messageSuccess)

  return (result as unknown) as TResult
}
