import {getUniqueObjectValuesFromArray} from '@/store/validation'

describe('getUniqueObjectValuesFromArray', () => {
  it('should return unique values', () => {
    const listWithDuplicates = [{message: 'error 1'}, {message: 'error 1'}, {message: 'error 2'}]
    const withoutDuplicates = getUniqueObjectValuesFromArray(listWithDuplicates, 'message')
    expect(withoutDuplicates.sort())
      .toEqual([{message: 'error 1'}, {message: 'error 2'}].sort())
  })

  it('should return empty array if undefined', () => {
    const listWithDuplicates = [] as Object[]
    const withoutDuplicates = getUniqueObjectValuesFromArray(listWithDuplicates, 'message')
    expect(withoutDuplicates)
      .toEqual([])
  })

  it('should return same array if no key provided', () => {
    const listWithDuplicates = [{message: 'error 1'}, {message: 'error 1'}, {message: 'error 2'}]
    const withoutDuplicates = getUniqueObjectValuesFromArray(listWithDuplicates, '')
    expect(withoutDuplicates)
      .toEqual(listWithDuplicates)
  })
})
