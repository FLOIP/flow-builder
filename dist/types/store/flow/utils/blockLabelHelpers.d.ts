import { IBlock } from '@floip/flow-runner';
/**
 * @example
 * 'AAA' -> '(Copy) AAA' -> '(Copy 2) AAA', etc.
 */
export declare function incrementBlockLabelCopyNumber(oldLabel: string): string;
/**
 * 'Next available' = ignore any previous missing copy numbers,
 * to indicate original vs duplicate blocks.
 *
 * E.g. if we have a block called '(Copy 2) AAA', we don't want to call its duplicate 'AAA' even if that label is available.
 */
export declare function prefixBlockLabelWithNextAvailableCopyNumber(blockLabel: string, allBlockLabels: IBlock['label'][]): string;
