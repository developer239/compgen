/* eslint-disable @typescript-eslint/prefer-regexp-exec */
import fs from 'fs'
import path from 'path'

export const isValidAppName = (name: string) =>
  Boolean(name.match('[^0-9a-z\\-]'))

export const isValidAngularAppName = (name: string) =>
  Boolean(name.match('[^a-z\\-]'))

export const isValidReactNativeAppName = (name: string) =>
  Boolean(name.match('[^a-z]'))

export const validateProjectFolder = (validator: (name: string) => boolean) => (
  value: string
) => {
  if (validator(value)) {
    return 'Invalid name.'
  }

  if (fs.existsSync(path.resolve(value.toLowerCase()))) {
    return 'Project with this name already exists.'
  }

  return true
}
