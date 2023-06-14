import {StoreOptions} from 'vuex'
import trees from '@/store/trees/trees.js'
import audio from '@/store/trees/audio.js'
import {IClipboardState, store as clipboard} from '@/store/clipboard'
import {IUndoRedoState, store as undoRedo} from './undoRedo'
import {IFlowsState, store as flow} from './flow'
import {IBuilderState, store as builder} from './builder'
import {IValidationState, validationStore as validation} from './validation'

export interface IRootState {
  builder: IBuilderState,
  flow: IFlowsState,
  validation: IValidationState,
  trees: any,
  audio: any,
  clipboard: IClipboardState,
  undoRedo: IUndoRedoState,
}

export const store: StoreOptions<IRootState> = {
  modules: {
    builder,
    flow,
    validation,
    // trees was originally implemented globally, expecting it's state at root
    trees,
    audio,
    clipboard,
    undoRedo,
  },
}

export default store
