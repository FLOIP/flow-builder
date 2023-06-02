import { IBlock, IFlow } from '@floip/flow-runner';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { IRootState } from '..';
export interface IFlowsState {
    isCreated: boolean;
    savedAt?: string | null;
    specification_version: string;
    container_uuid: string;
    flows: IFlow[];
    first_flow_id: string | null;
    nested_flow_block_interaction_id_stack: string[];
    selectedBlocks: IBlock['uuid'][];
}
export declare const getters: GetterTree<IFlowsState, IRootState>;
export declare const mutations: MutationTree<IFlowsState>;
export declare const actions: ActionTree<IFlowsState, IRootState>;
export declare const store: Module<IFlowsState, IRootState>;
export default store;
