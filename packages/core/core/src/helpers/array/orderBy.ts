import * as R from 'ramda'

export const orderBy = <TObject>(property: string) => (object: TObject[]) =>
  R.sort<TObject>(R.descend(R.prop(property)), object)
