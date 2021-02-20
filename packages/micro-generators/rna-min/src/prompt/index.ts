import inquirer from 'inquirer'
import { NavigationType } from '../'

export const askNavigationType = async (): Promise<NavigationType> => {
  const { answer } = await inquirer.prompt({
    name: 'answer',
    type: 'list',
    message: 'Do you want to use navigation?',
    choices: [
      { name: 'None', value: NavigationType.NONE },
      { name: 'React Navigation', value: NavigationType.REACT_NAVIGATION },
    ],
  })

  return answer
}
