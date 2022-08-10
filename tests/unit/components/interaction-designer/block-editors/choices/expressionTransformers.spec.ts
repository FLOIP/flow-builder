import {choicesToExpression} from '@/components/interaction-designer/block-editors/choices/expressionTransformers'
import {IChoice} from '@floip/flow-runner'

const choices: IChoice[] = [
  {prompt: 'b86fc9fd-1511-4690-87c4-2cf79e02da3f', name: 'one'},
  {prompt: '69ea35af-4d04-4c69-ad60-146006df45b3', name: 'two'},
]

describe('choicesToExpression', () => {
  it('should return a valid expression for STRING choices', () => {
    const propertyValueMapping_string = {
      'b86fc9fd-1511-4690-87c4-2cf79e02da3f': 'apple',
      '69ea35af-4d04-4c69-ad60-146006df45b3': 'banana',
    }
    expect(choicesToExpression(choices, propertyValueMapping_string))
      .toBe("@CONCATENATE(IF(block.value = 'one', 'apple', ''),IF(block.value = 'two', 'banana', ''))")
  })

  it('should return a valid expression for NUMERIC choices', () => {
    const propertyValueMapping_number = {
      'b86fc9fd-1511-4690-87c4-2cf79e02da3f': 1,
      '69ea35af-4d04-4c69-ad60-146006df45b3': 2,
    }
    expect(choicesToExpression(choices, propertyValueMapping_number))
      .toBe("@CONCATENATE(IF(block.value = 'one', 1, ''),IF(block.value = 'two', 2, ''))")
  })
})
