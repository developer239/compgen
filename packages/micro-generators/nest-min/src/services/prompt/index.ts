import { askYesNo } from '@compgen/core'

export const askIsDatabase = () =>
  askYesNo('Do you want to use database?')
