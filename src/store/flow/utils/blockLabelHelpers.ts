import {IBlock} from '@floip/flow-runner'

/**
 * @example
 * 'AAA' -> '(Copy) AAA' -> '(Copy 2) AAA', etc.
 */
export function incrementBlockLabelCopyNumber(oldLabel: string): string {
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

/**
 * 'Next available' = ignore any previous missing copy numbers,
 * to indicate original vs duplicate blocks.
 *
 * E.g. if we have a block called '(Copy 2) AAA', we don't want to call its duplicate 'AAA' even if that label is available.
 */
// eslint-disable-next-line import/prefer-default-export
export function prefixBlockLabelWithNextAvailableCopyNumber(blockLabel: string, allBlockLabels: IBlock['label'][]): string {
  do {
    blockLabel = incrementBlockLabelCopyNumber(blockLabel)
  } while (!allBlockLabels.includes(blockLabel))
  return blockLabel
}
