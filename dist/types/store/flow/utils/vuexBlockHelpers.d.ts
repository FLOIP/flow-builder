import { IBlock, IChoice } from '@floip/flow-runner';
export declare function updateBlockValueByPath(state: unknown, blockId: IBlock['uuid'], path: string, value: boolean | number | string | object | null | undefined): void;
export declare function deleteChoiceValueByPath(state: unknown, choice: IChoice, path: string): void;
export declare function removeBlockValueByPath(state: unknown, blockId: IBlock['uuid'], path: string): void;
