import { deleteProperty } from './deleteProperty'

describe('[helpers][object] delete property', () => {
  it('should delete property', () => {
    const target = {
      first: {
        second: {
          third: 'third',
        },
      },
    }

    const result = deleteProperty(target, ['first', 'second'])

    expect(target).toStrictEqual(target)
    expect(result).toStrictEqual({
      first: {},
    })
  })
})
