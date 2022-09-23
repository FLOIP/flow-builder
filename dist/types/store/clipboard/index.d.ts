import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { IRootState } from '@/store';
import { IPrompt } from '@floip/flow-runner';
export interface BlocksData {
    isFocused: boolean;
    prompt: IPrompt;
}
export interface IClipboardState {
    isSimulatorActive: boolean;
    blocksData: BlocksData[];
}
export declare const stateFactory: () => IClipboardState;
export declare const getters: GetterTree<IClipboardState, IRootState>;
export declare const mutations: MutationTree<IClipboardState>;
export declare const actions: ActionTree<IClipboardState, IRootState>;
export declare const store: Module<IClipboardState, IRootState>;
export default store;
