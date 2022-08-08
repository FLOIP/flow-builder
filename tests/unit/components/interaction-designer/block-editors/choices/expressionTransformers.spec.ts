import {choicesToExpression} from '@/components/interaction-designer/block-editors/choices/expressionTransformers'

describe('choicesToExpression', () => {
  it('should return a valid expression for STRING choices', () => {
    const propertyValueMapping = {
      one: 'apple',
      two: 'banana',
    }
    expect(choicesToExpression(propertyValueMapping))
      .toBe("@CONCATENATE(\nIF(block.value = 'one', 'apple', ''),\nIF(block.value = 'two', 'banana', '')\n)")
  })

  it('should return a valid expression for NUMERIC choices', () => {
    const propertyValueMapping = {
      one: 1,
      two: 2,
    }
    expect(choicesToExpression(propertyValueMapping))
      .toBe("@CONCATENATE(\nIF(block.value = 'one', 1, ''),\nIF(block.value = 'two', 2, '')\n)")
  })
})
