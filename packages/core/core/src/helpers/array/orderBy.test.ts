import { orderBy } from './orderBy'

describe('[helpers][object] deepMerge', () => {
  it('should order object by property', () => {
    const first = { name: 'first', priority: 9 }
    const second = { name: 'second', priority: 5 }
    const third = { name: 'third', priority: 15 }

    const data = [first, second, third]
    const expected = [third, first, second]

    expect(orderBy('priority')(data)).toStrictEqual(expected)
  })
})
