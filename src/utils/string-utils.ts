import {snakeCase} from 'lodash'

/**
 * Snake case only non digit text
 * eg:
 *  - input: "01 a23 b45 c67c 89de"
 *  - output: "01_a23_b45_c67_c89_de"
 * @param value
 */
// eslint-disable-next-line import/prefer-default-export
export function snakeCaseNonDigits(value?: string | null) {
  if (value === null || value === undefined) {
    return value
  }

  return snakeCase(value).replace(/_(\d+)/g, '$1')
}

/**
 * Snake case on spaces only
 * eg:
 *  - 1message >>> 1message (no changes)
 *  - message_1 >>> message_1 (no changes)
 *  - message 1 >>> message_1 (with changes)
 * @param value
 * @param char
 */
export function snakeCaseOnSpaces(value?: string | null, char = '_') {
  if (value === null || value === undefined) {
    return value
  }

  return value.replaceAll(' ', char).toLowerCase()
}
