import { AppType } from '../../types'
import { hasDependency } from './hasDependency'

interface IOptions {
  projectFolder: string
}

export const detectAppType = async ({ projectFolder }: IOptions) => {
  const react = 'react'
  const reactNative = 'react-native'
  const angular = '@angular/core'

  const detectionResult = await hasDependency<{
    react: boolean
    'react-native': boolean
    '@angular/core': boolean
  }>({ projectFolder, dependencies: [react, reactNative, angular] })

  if (detectionResult['react-native']) {
    return AppType.REACT_NATIVE
  }

  if (detectionResult.react) {
    return AppType.REACT
  }

  if (detectionResult['@angular/core']) {
    return AppType.ANGULAR
  }

  return AppType.NODE
}
