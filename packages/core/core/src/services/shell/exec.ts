import childProcess from 'child_process'
import chalk from 'chalk'
import ora from 'ora'
import shelljs from 'shelljs'

// https://stackoverflow.com/questions/46354368/how-to-have-cli-spinner-run-during-shelljs-command-exec
export const runLongExec = (command: string) => {
  return new Promise((resolve, reject) => {
    const spawnedProcess = childProcess.spawn(command, { shell: true })

    spawnedProcess.on('exit', resolve)
    spawnedProcess.on('error', reject)
  })
}

export const execWithSpinner = async (
  command: string,
  successMessage: string,
  options?: { trim: string }
) => {
  const spinner = ora()
  spinner.start(
    `Running: ${chalk.yellow(
      options?.trim ? command.replace(options.trim, '') : command
    )}`
  )

  const response = await runLongExec(command)
  spinner.succeed(successMessage)

  return response
}

export const exec = (command: string, silent = true) => {
  return shelljs.exec(command, { silent })
}
