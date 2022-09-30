import { IRootState } from '../../../store';
import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { IEmptyState } from '../../../store/flow/block-types/BaseBlock';
export declare const BLOCK_RESPONSE_EXPRESSION = "block.response";
export declare function textValueToExpression(value: string): string;
export declare const getters: GetterTree<IEmptyState, IRootState>;
export declare const mutations: MutationTree<IEmptyState>;
export declare const actions: ActionTree<IEmptyState, IRootState>;
