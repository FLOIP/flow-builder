import { IRootState } from '../../../store';
import { IBlock, SetContactProperty } from '@floip/flow-runner';
import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { IFlowsState } from '../index';
export interface ISetContactPropertyBlockKey {
    blockId: IBlock['uuid'];
    key: SetContactProperty['property_key'];
}
export interface ISetContactPropertyBlockKeyWithValue extends ISetContactPropertyBlockKey {
    value: SetContactProperty['property_value'];
}
export declare const getters: GetterTree<IFlowsState, IRootState>;
export declare const mutations: MutationTree<IFlowsState>;
export declare const actions: ActionTree<IFlowsState, IRootState>;
