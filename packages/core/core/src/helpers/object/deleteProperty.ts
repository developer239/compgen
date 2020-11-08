export type IObject = any

export const deleteProperty = (object: IObject, path: string[]) => {
  const currentObject = JSON.parse(JSON.stringify(object))
  let currentPath = currentObject
  const last = path.pop() as string

  for (const key of path) {
    currentPath = currentObject[key]

    if (!currentObject) {
      return
    }
  }

  delete currentPath[last]

  return currentObject
}
