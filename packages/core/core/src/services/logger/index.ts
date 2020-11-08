/* eslint-disable no-console */
import chalk from 'chalk'
import figlet from 'figlet'

export const logger = {
  info: console.log,
  error: console.error,
  success: (text: string) => console.log(chalk.green(figlet.textSync(text, { horizontalLayout: 'full' }))),
}
