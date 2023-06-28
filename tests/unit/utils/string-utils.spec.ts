import {getModifiedLabelForDuplicatedBlock} from '@/utils/string-utils'

describe('getModifiedLabelForDuplicatedBlock', () => {
  it('generates a proper label for duplicated block', () => {
    let originalLabel = 'My block'
    let duplicatedLabel = getModifiedLabelForDuplicatedBlock(originalLabel)
    expect(duplicatedLabel).toBe('(Copy) My block')

    originalLabel = duplicatedLabel
    duplicatedLabel = getModifiedLabelForDuplicatedBlock(originalLabel)
    expect(duplicatedLabel).toBe('(Copy 2) My block')

    originalLabel = duplicatedLabel
    duplicatedLabel = getModifiedLabelForDuplicatedBlock(originalLabel)
    expect(duplicatedLabel).toBe('(Copy 3) My block')
  })
})
