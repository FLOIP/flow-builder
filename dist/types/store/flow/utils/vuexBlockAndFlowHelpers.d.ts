import { IBlock, IChoice, IFlow } from '@floip/flow-runner';
import { ConfigFieldType } from '../../../store/flow/block';
export declare function updateBlockValueByPath(state: unknown, blockId: IBlock['uuid'], path: string, value: ConfigFieldType): void;
export declare function deleteChoiceValueByPath(state: unknown, choice: IChoice, path: string): void;
export declare function removeBlockValueByPath(state: unknown, blockId: IBlock['uuid'], path: string): void;
export declare function updateFlowValueByPath(state: unknown, flowId: IFlow['uuid'], path: string, value: ConfigFieldType): void;
export declare function removeFlowValueByPath(state: unknown, flowId: IFlow['uuid'], path: string): void;
