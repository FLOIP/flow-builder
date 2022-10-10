import {IChoice} from '@floip/flow-runner'

export function escapeQuotes(value: string): string {
  return value.replace(/(['"])/g, '\\$1')
}

export function unescapeQuotes(value: string): string {
  return value.replace(/\\(['"])/g, '$1')
}

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

export function testExpressionToChoice(expression: string): string {
  const regex = /^@block\.response = '(?<choice>.+)'$/
  const parsedGroups = regex.exec(expression)?.groups as {choice: string} | undefined

  if (parsedGroups !== undefined) {
    const {choice} = parsedGroups
    return unescapeQuotes(choice)
  } else {
    return expression
  }
}

export function choiceToTestExpression(value: string): string {
  if (value.includes('@')) {
    return value
  } else {
    return `@block.response = '${escapeQuotes(value)}'`
  }
}
