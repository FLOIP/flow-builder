import {generateBlockCodeFromLabel} from '@/utils/string-utils'

describe('generateBlockCodeFromLabel', () => {
  it('should return null/undefined if null/undefined is passed', () => {
    expect(generateBlockCodeFromLabel(null)).toBeNull()
    expect(generateBlockCodeFromLabel(undefined)).toBeUndefined()
  })

  it('should return the same string if no spaces or parentheses are present', () => {
    expect(generateBlockCodeFromLabel('1message')).toBe('1message')
    expect(generateBlockCodeFromLabel('message_1')).toBe('message_1')
  })

  it('should replace spaces with underscores', () => {
    expect(generateBlockCodeFromLabel('message 1')).toBe('message_1')
  })

  it('should replace parentheses with underscores', () => {
    expect(generateBlockCodeFromLabel('(Copy) AAA')).toBe('copy__aaa')
    expect(generateBlockCodeFromLabel('(Copy 2) AAA')).toBe('copy_2__aaa')
  })
})
