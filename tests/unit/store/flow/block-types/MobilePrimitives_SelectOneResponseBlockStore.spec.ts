// mutations.spec.js
import { convertResponseChoiceMappingToTest } from '@/store/flow/block-types/MobilePrimitives_SelectOneResponseBlockStore'

describe('convertResponseChoiceMappingToTest', () => {
  it('should correctly generate a test expression from response to choice mappings', () => {
    const responseChoiceMapping = {
    }
    const choiceTest = convertResponseChoiceMappingToTest(responseChoiceMapping)
    // assert result
    expect(choiceTest).toEqual('')
  })
})
