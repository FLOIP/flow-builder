import { StoreOptions } from 'vuex';
import { IClipboardState } from '../store/clipboard';
import { IFlowsState } from './flow';
import { IBuilderState } from './builder';
import { IResourceViewerState } from './resource-viewer';
import { IValidationState } from './validation';
export interface IRootState {
    builder: IBuilderState;
    resourceViewer: IResourceViewerState;
    flow: IFlowsState;
    validation: IValidationState;
    trees: any;
    audio: any;
    clipboard: IClipboardState;
}
export declare const store: StoreOptions<IRootState>;
export default store;
