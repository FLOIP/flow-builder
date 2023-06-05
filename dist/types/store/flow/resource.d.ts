import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { IFlowsState } from '../../store/flow/index';
import { IRootState } from '../../store';
export declare const getters: GetterTree<IFlowsState, IRootState>;
export declare const mutations: MutationTree<IFlowsState>;
export declare const actions: ActionTree<IFlowsState, IRootState>;
