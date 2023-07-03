import {incrementBlockLabelCopyNumber, prefixBlockLabelWithNextAvailableCopyNumber} from '@/store/flow/utils/blockLabelHelpers'

describe('getModifiedLabelForDuplicatedBlock', () => {
  it('generates a proper label for duplicated block', () => {
    let originalLabel = 'My block'
    let duplicatedLabel = incrementBlockLabelCopyNumber(originalLabel)
    expect(duplicatedLabel).toBe('(Copy) My block')

    originalLabel = duplicatedLabel
    duplicatedLabel = incrementBlockLabelCopyNumber(originalLabel)
    expect(duplicatedLabel).toBe('(Copy 2) My block')

    originalLabel = duplicatedLabel
    duplicatedLabel = incrementBlockLabelCopyNumber(originalLabel)
    expect(duplicatedLabel).toBe('(Copy 3) My block')
  })
})

describe('prefixBlockLabelWithNextAvailableCopyNumber', () => {
  it('generates label using subsequent "gaps"', () => {
    const originalLabel = 'AAA'
    const allBlockLabels = [
      'AAA',
      // (Copy) AAA - missing
      '(Copy 3) AAA',
      '(Copy 2) AAA',
    ]
    expect(prefixBlockLabelWithNextAvailableCopyNumber(originalLabel, allBlockLabels))
      .toBe('(Copy) AAA')
  })

  it('generates label ignoring preceding "gaps"', () => {
    const originalLabel = '(Copy 3) AAA'
    const allBlockLabels = [
      'AAA',
      // (Copy) AAA - missing
      '(Copy 3) AAA',
      '(Copy 2) AAA',
      '(Copy 4) AAA',
    ]
    expect(prefixBlockLabelWithNextAvailableCopyNumber(originalLabel, allBlockLabels))
      .toBe('(Copy 5) AAA')
  })
})
