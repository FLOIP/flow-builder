/**
 * Snake case on spaces only
 * eg:
 *  - 1message >>> 1message (no changes)
 *  - message_1 >>> message_1 (no changes)
 *  - message 1 >>> message_1 (with changes)
 * @param value
 * @param char
 */
// todo: rename
export function snakeCaseOnSpaces(value?: string | null, char = '_'): string | null | undefined {
  if (value === null || value === undefined) {
    return value
  }

  return value
    // replace spaces and parentheses
    .replaceAll(/[ )(]/g, char)
    // remove all underscores at the beginning
    .replace(/^_+/, '')
    .toLowerCase()
}

export function getModifiedLabelForDuplicatedBlock(oldLabel: string): string {
  const FIRST_COPY_REGEX = /^\(Copy\)/
  const NUMBERED_COPY_REGEX = /^\(Copy (\d+)\)/

  if (FIRST_COPY_REGEX.test(oldLabel)) {
    return oldLabel.replace(FIRST_COPY_REGEX, '(Copy 2)')
  } else if (NUMBERED_COPY_REGEX.test(oldLabel)) {
    return oldLabel.replace(NUMBERED_COPY_REGEX, (_match, copyNumber) => `(Copy ${Number(copyNumber) + 1})`)
  } else {
    return `(Copy) ${oldLabel}`
  }
}
