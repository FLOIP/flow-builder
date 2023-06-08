import { Location } from 'vue-router';
import { IRootState } from '../../store';
import { IFlowsState } from '../../store/flow';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
export interface ISnapshotModules {
    flows: IFlowsState;
}
export interface ISnapshot {
    modules: ISnapshotModules;
    routeName: Location['name'] | null;
    routeParams: Location['params'] | null;
    timestamp: number;
}
export interface IUndoRedoState {
    snapshots: ISnapshot[];
    position: number;
}
export declare const stateFactory: () => IUndoRedoState;
export declare const getters: GetterTree<IUndoRedoState, IRootState>;
export declare const mutations: MutationTree<IUndoRedoState>;
export declare const actions: ActionTree<IUndoRedoState, IRootState>;
export declare const store: Module<IUndoRedoState, IRootState>;
export default store;
