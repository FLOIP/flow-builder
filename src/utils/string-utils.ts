// eslint-disable-next-line import/prefer-default-export
export function removeUnderScoreCharBeforeDigits(value: string) {
  const charBeforeDigits = value.match(/_[0-9]/g) || []
  let finalValue = value
  if (charBeforeDigits === null) {
    return value
  } else {
    charBeforeDigits.forEach((foundChar: string) => {
      finalValue = finalValue.replaceAll(foundChar, foundChar.split('_')[1])
    })

    return finalValue
  }
}
