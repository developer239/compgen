import { exec, execWithSpinner } from './exec'

export const execInProject = (projectFolder: string) => (command: string) =>
  exec(`cd ${projectFolder} && ${command}`)

export const execInProjectWithSpinner = (projectFolder: string) => (
  command: string,
  successMessage: string
) => {
  const goToProjectDir = `cd ${projectFolder} && `
  return execWithSpinner(`${goToProjectDir}${command}`, successMessage, {
    trim: goToProjectDir,
  })
}
