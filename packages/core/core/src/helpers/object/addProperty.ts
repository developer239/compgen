import * as R from 'ramda'

export const addProperty = (path: string[], value: any) => (content: any) =>
  R.assocPath(path, value)(content)
