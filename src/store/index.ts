import {StoreOptions} from 'vuex'
import trees from '@/store/trees/trees'
import audio from '@/store/trees/audio'
import {IClipboardState, store as clipboard} from '@/store/clipboard'
import {IFlowsState, store as flow} from './flow'
import {IBuilderState, store as builder} from './builder'
import {IResourceViewerState, resourceViewerStore} from './resource-viewer'
import {IValidationState, validationStore as validation} from './validation'

export interface IRootState {
  builder: IBuilderState,
  resourceViewer: IResourceViewerState,
  flow: IFlowsState,
  validation: IValidationState,
  trees: any,
  audio: any,
  clipboard: IClipboardState,
}

export const store: StoreOptions<IRootState> = {
  modules: {
    builder,
    'resource-viewer': resourceViewerStore,
    flow,
    validation,
    // trees was originally implemented globally, expecting it's state at root
    trees,
    audio,
    clipboard,
  },
}

export default store
