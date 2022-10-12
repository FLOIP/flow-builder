import { ILanguage } from '@floip/flow-runner';
import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { IRootState } from '../../store';
import { IFlowsState } from '.';
export declare function orderLanguages(LanguagesList: ILanguage[]): ILanguage[];
export declare const getters: GetterTree<IFlowsState, IRootState>;
export declare const mutations: MutationTree<IFlowsState>;
export declare const actions: ActionTree<IFlowsState, IRootState>;
