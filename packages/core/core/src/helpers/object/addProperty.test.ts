import { addProperty } from './addProperty'

describe('[helpers][object] add property', () => {
  it('should delete property', () => {
    const target = {}

    expect(addProperty(['first', 'second'], 'third')(target)).toStrictEqual({
      first: { second: 'third' },
    })
  })
})
