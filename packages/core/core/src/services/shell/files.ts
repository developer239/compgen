import { execInProjectWithSpinner } from './execProject'

export const removeProjectFiles = ({
  projectFolder,
  message,
  files,
  recursive = false,
}: {
  projectFolder: string
  message: string
  files: string[]
  recursive?: boolean
}) =>
  execInProjectWithSpinner(projectFolder)(
    `rm ${recursive ? '-r' : ''} ${files.join(' ')}`,
    `[files][remove project files] ${message}`
  )
