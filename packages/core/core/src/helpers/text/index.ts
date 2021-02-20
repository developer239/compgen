export const capitalize = (word: string) =>
  word.charAt(0).toUpperCase() + word.substring(1)

export const capitalizeAll = (name: string) => {
  const words = name.match(/[A-Za-z][a-z]*/gu) ?? []

  return words.map(capitalize).join(' ')
}

export const toAlphanumeric = (string: string) =>
  string.replace(/[^0-9a-z]/giu, '')
