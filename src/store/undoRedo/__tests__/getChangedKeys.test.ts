/* eslint-disable @typescript-eslint/no-explicit-any */
import {getChangedKeys} from '../getChangedKeys'

describe('getChangedKeys', () => {
  it('should return an empty array when given two equal objects', () => {
    const a = {foo: 1, bar: {baz: 2}}
    const b = {foo: 1, bar: {baz: 2}}
    expect(getChangedKeys(a, b)).toEqual([])
  })

  it('should return an array of changed keys when given two different objects', () => {
    const a = {foo: 1, bar: {baz: 2}}
    const b = {foo: 2, bar: {baz: 3}}
    expect(getChangedKeys(a, b)).toEqual(['foo~', 'bar.baz~'])
  })

  it('should handle objects with different keys', () => {
    const a = {foo: 1, bar: {baz: 2}}
    const b = {foo: 1, bar: {baz: 2, qux: 3}}
    expect(getChangedKeys(a, b)).toEqual(['bar.qux+'])
  })

  it('should handle objects with null values', () => {
    const a = {foo: null}
    const b = {foo: 1}
    expect(getChangedKeys(a, b)).toEqual(['foo~'])
  })

  it('should handle objects with undefined values', () => {
    const a = {foo: 1}
    const b = {foo: undefined}
    expect(getChangedKeys(a, b)).toEqual(['foo-'])
  })

  it('should handle objects with arrays', () => {
    const a = {foo: [1, 2, 3]}
    const b = {foo: [1, 2, 4]}
    expect(getChangedKeys(a, b)).toEqual(['foo.2~'])
  })

  it('should handle objects with nested arrays', () => {
    const a = {foo: [[1, 2], [3, 4]]}
    const b = {foo: [[1, 2], [3, 5]]}
    expect(getChangedKeys(a, b)).toEqual(['foo.1.1~'])
  })

  it('should handle nested objects', () => {
    const a = {
      foo: {
        bar: {
          baz: 1,
          boo: 2,
        },
      },
    }

    const b = {
      foo: {
        bar: {
          baz: 3,
          uwu: 4,
        },
      },
    }

    expect(getChangedKeys(a, b)).toEqual(['foo.bar.baz~', 'foo.bar.boo-', 'foo.bar.uwu+'])
  })

  it('should handle deleted array items', () => {
    const a = {foo: {bar: [1, 2, 3]}}
    const b = {foo: {bar: [1, 3]}}

    expect(getChangedKeys(a, b)).toEqual(['foo.bar.1~', 'foo.bar.2-'])
  })
})
