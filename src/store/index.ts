import {StoreOptions} from 'vuex'
import trees from '@/store/trees/trees'
import audio from '@/store/trees/audio'
import {IClipboardState, store as clipboard} from '@/store/clipboard'
import {IFlowsState, store as flow} from './flow'
import {IBuilderState, store as builder} from './builder'
import {IValidationState, validationStore as validation} from './validation'
import {IUndoState, store as undo} from './undo'

export interface IRootState {
  builder: IBuilderState,
  flow: IFlowsState,
  validation: IValidationState,
  trees: any,
  audio: any,
  clipboard: IClipboardState,
  undo: IUndoState,
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
    undo,
  },
}

export default store
