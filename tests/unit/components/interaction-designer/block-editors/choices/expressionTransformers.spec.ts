import {choicesToExpression} from '@/components/interaction-designer/block-editors/choices/expressionTransformers'
import {IChoice} from '@floip/flow-runner'

const choices: IChoice[] = [
  {prompt: 'b86fc9fd-1511-4690-87c4-2cf79e02da3f', name: 'one'},
  {prompt: '69ea35af-4d04-4c69-ad60-146006df45b3', name: 'two'},
  {prompt: '882f5fee-3752-494f-a598-eaa95f4d500f', name: 'three'},
]

describe('choicesToExpression', () => {
  it('should return a valid expression for STRING choices', () => {
    const propertyValueMapping_string = {
      'b86fc9fd-1511-4690-87c4-2cf79e02da3f': 'apple',
      '69ea35af-4d04-4c69-ad60-146006df45b3': 'banana',
      '882f5fee-3752-494f-a598-eaa95f4d500f': 'don\'t like fruits',
    }
    expect(choicesToExpression(choices, propertyValueMapping_string))
      .toBe('@CONCATENATE('
        + "IF(block.value = 'one', 'apple', ''),"
        + "IF(block.value = 'two', 'banana', ''),"
        + "IF(block.value = 'three', 'don\\'t like fruits', '')"
        + ')')
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
