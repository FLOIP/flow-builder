/**
 * Snake case on spaces only
 * eg:
 *  - 1message >>> 1message (no changes)
 *  - message_1 >>> message_1 (no changes)
 *  - message 1 >>> message_1 (with changes)
 * @param value
 * @param char
 */
function snakeCaseOnSpaces(value: string, char = '_'): string {
  // we are not using replaceAll because it is not available in Node 14 that Jest uses
  return value.replace(/ /g, char).toLowerCase()
}

function snakeCaseOnParentheses(value: string, char = '_'): string {
  return value
    // replace parentheses
    .replace(/[)(]/g, char)
    // remove all underscores at the beginning
    .replace(/^_+/, '')
    .toLowerCase()
}

// eslint-disable-next-line import/prefer-default-export
export function generateBlockCodeFromLabel(label: string | undefined): string {
  return snakeCaseOnParentheses(snakeCaseOnSpaces(label ?? ''))
}
