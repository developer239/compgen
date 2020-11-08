import yargs from 'yargs'

export const getProjectFolder = () => yargs.argv.path as string | undefined
