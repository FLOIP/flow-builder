// eslint-disable-next-line import/prefer-default-export
export function choicesToExpression(propertyValueMapping: Record<string, string | number>): string {
  const individualLines = Object.entries(propertyValueMapping).map(([choiceKey, choiceValue]) =>
    (typeof choiceValue === 'string'
      ? `IF(block.value = '${choiceKey}', '${choiceValue}', '')`
      : `IF(block.value = '${choiceKey}', ${choiceValue}, '')`))

  return `@CONCATENATE(\n${individualLines.join(',\n')}\n)`
}
