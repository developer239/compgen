import { deepMerge } from './deepMerge'

describe('[helpers][object] deepMerge', () => {
  it('should NOT modify arguments', () => {
    const left = { first: 'first' }
    const right = { second: 'second' }

    deepMerge(left, right)
    deepMerge(left, right)
    deepMerge(left, right)

    expect(left).toStrictEqual({ first: 'first' })
    expect(right).toStrictEqual({ second: 'second' })
  })

  it('should merge properties', () => {
    const left = { first: 'first' }
    const right = { second: 'second' }

    expect(deepMerge(left, right)).toStrictEqual({
      ...left,
      ...right,
    })
  })

  it('should merge arrays', () => {
    const left = { first: ['first'] }
    const right = { first: ['second'] }

    expect(deepMerge(left, right)).toStrictEqual({
      first: [...left.first, ...right.first],
    })
  })

  it('should merge objects', () => {
    const left = { first: { first: 'first' } }
    const right = { first: { second: 'second' } }

    expect(deepMerge(left, right)).toStrictEqual({
      first: {
        ...left.first,
        ...right.first,
      },
    })
  })
})
