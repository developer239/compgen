export type IMergeObject = any

export const deepMerge = <TObject>(
  target: IMergeObject,
  ...sources: IMergeObject[]
): TObject => {
  const currentTarget = { ...target }

  for (const source of sources) {
    for (const key in source) {
      const valueSource = source[key]
      const valueTarget = currentTarget[key]

      if (Array.isArray(valueSource) && Array.isArray(valueTarget)) {
        currentTarget[key] = [...valueTarget, ...valueSource]
        continue
      }

      if (
        Object(valueSource) === valueSource &&
        Object(valueTarget) === valueTarget
      ) {
        currentTarget[key] = deepMerge(Object(valueSource), Object(valueTarget))
        continue
      }

      currentTarget[key] = source[key]
    }
  }
  return currentTarget
}
