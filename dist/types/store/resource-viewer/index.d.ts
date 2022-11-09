import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { IRootState } from '../../store';
import { IBlock } from '@floip/flow-runner';
export interface IResourceViewerState {
    /**
     * Block uuids to hide,
     * Will be used for resource-viewer component, so the consumer repo can set a custom filters and override this state if needed
     *
     * By default, it's empty, meaning there is no filter at all
     */
    blockUuidsToHide: IBlock['uuid'][];
}
export declare const resourceViewerStateFactory: () => IResourceViewerState;
export declare const resourceViewerGetters: GetterTree<IResourceViewerState, IRootState>;
export declare const resourceViewerMutations: MutationTree<IResourceViewerState>;
export declare const resourceViewerActions: ActionTree<IResourceViewerState, IRootState>;
export declare const resourceViewerStore: Module<IResourceViewerState, IRootState>;
export default resourceViewerStore;
