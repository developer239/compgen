import { execInProjectWithSpinner } from './execProject'

export const addDependencies = ({
  projectFolder,
  libraries,
  isDev = false,
}: {
  projectFolder: string
  libraries: string[]
  isDev?: boolean
}) =>
  execInProjectWithSpinner(projectFolder)(
    `yarn add ${libraries.join(' ')} ${isDev ? '-D' : ''}`,
    `[dependencies][add] ${libraries.join(' ')}`
  )

export const removeDependencies = ({
  projectFolder,
  libraries,
}: {
  projectFolder: string
  libraries: string[]
}) =>
  execInProjectWithSpinner(projectFolder)(
    `yarn remove ${libraries.join(' ')}`,
    `[dependencies][remove] ${libraries.join(' ')}`
  )

export const moveToDevDependencies = ({
  projectFolder,
  libraries,
}: {
  projectFolder: string
  libraries: string[]
}) =>
  execInProjectWithSpinner(projectFolder)(
    `yarn remove ${libraries.join(' ')} && yarn add ${libraries.join(' ')} -D`,
    `[dependencies][move] ${libraries.join(' ')}`
  )
