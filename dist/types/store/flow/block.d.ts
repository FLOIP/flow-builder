import { IBlock, IBlockExit } from '@floip/flow-runner';
import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { IRootState } from '../../store';
import { IFlowsState } from '.';
export declare type BlockConfigFieldType = object | string | number | boolean | undefined | null;
export declare const getters: GetterTree<IFlowsState, IRootState>;
export declare const mutations: MutationTree<IFlowsState>;
export declare const actions: ActionTree<IFlowsState, IRootState>;
export interface IDeepBlockExitIdWithinFlow {
    blockId: IBlock['uuid'];
    exitId: IBlockExit['uuid'];
}
/**
 * Is the block interactive ?
 * Another meaning: will the user get response when interacting with it?
 * @param block
 */
export declare function isBlockInteractive(block: IBlock): boolean;
