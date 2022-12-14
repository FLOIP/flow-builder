import { ILanguage, SupportedMode } from '@floip/flow-runner';
import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { IRootState } from '../../store';
import { IFlowsState } from '.';
export declare const getters: GetterTree<IFlowsState, IRootState>;
export declare const mutations: MutationTree<IFlowsState>;
export declare const actions: ActionTree<IFlowsState, IRootState>;
/**
 * Sort languages to display them in a particular order
 *
 * Caution: use this in the UI only, "on the surface" - for consistent UX when the languages get rearranged.
 * In other cases, avoid sorting or relying on their order because the flow spec doesn't enforce it.
 */
export declare function orderLanguages(languages: ILanguage[]): ILanguage[];
/**
 * Sort modes to display them in a particular order
 *
 * Caution: use this in the UI only, "on the surface" - for consistent UX when the modes get rearranged.
 * In other cases, avoid sorting or relying on their order because the flow spec doesn't enforce it.
 */
export declare function orderModes(modes: SupportedMode[]): SupportedMode[];
