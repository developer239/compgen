import { askYesNo } from '@compgen/core'

export const askIsEslint = () => askYesNo('Do you use eslint?')

export const askIsPrettier = () => askYesNo('Do you use prettier?')

export const askIsStylelint = () => askYesNo('Do you use stylelint?')
