import { IBlock, IChoice, IFlow, IBlockExit } from '@floip/flow-runner';
export declare type ConfigFieldType = object | string | number | boolean | undefined | null;
export declare function updateBlockValueByPath(state: unknown, blockId: IBlock['uuid'], path: string, value: ConfigFieldType): void;
export declare function updateBlockExitValueByPath(state: unknown, blockId: IBlock['uuid'], exitId: IBlockExit['uuid'], path: string, value: ConfigFieldType): void;
export declare function removeBlockExitValueByPath(state: unknown, blockId: IBlock['uuid'], exitId: IBlockExit['uuid'], path: string): void;
export declare function deleteChoiceValueByPath(state: unknown, choice: IChoice, path: string): void;
export declare function removeBlockValueByPath(state: unknown, blockId: IBlock['uuid'], path: string): void;
export declare function updateFlowValueByPath(state: unknown, flowId: IFlow['uuid'], path: string, value: ConfigFieldType): void;
export declare function removeFlowValueByPath(state: unknown, flowId: IFlow['uuid'], path: string): void;
