import {IChoice} from '@floip/flow-runner'

export function escapeQuotes(value: string): string {
  return value.replace(/(['"])/g, '\\$1')
}

// eslint-disable-next-line import/prefer-default-export
export function choicesToExpression(choices: IChoice[], propertyValueMapping: Record<string, string | number>): string {
  const individualLines = Object.entries(propertyValueMapping)
    .map(([choicePrompt, choiceValue]) => {
      const choiceName = escapeQuotes(choices.find(choice => choice.prompt === choicePrompt)!.name)

      if (typeof choiceValue === 'string') {
        return `IF(block.value = '${choiceName}', '${escapeQuotes(choiceValue)}', '')`
      } else {
        return `IF(block.value = '${choiceName}', ${choiceValue}, '')`
      }
    })

  return `@CONCATENATE(${individualLines.join(',')})`
}
