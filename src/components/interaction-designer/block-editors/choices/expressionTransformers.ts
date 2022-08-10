import {IChoice} from '@floip/flow-runner'

// eslint-disable-next-line import/prefer-default-export
export function choicesToExpression(choices: IChoice[], propertyValueMapping: Record<string, string | number>): string {
  const individualLines = Object.entries(propertyValueMapping)
    .map(([choicePrompt, choiceValue]) => {
      const choiceName = choices.find(choice => choice.prompt === choicePrompt)?.name
      if (typeof choiceValue === 'string') {
        return `IF(block.value = '${choiceName}', '${choiceValue}', '')`
      } else {
        return `IF(block.value = '${choiceName}', ${choiceValue}, '')`
      }
    })

  return `@CONCATENATE(\n${individualLines.join(',\n')}\n)`
}
