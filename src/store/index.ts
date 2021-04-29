import { StoreOptions } from 'vuex'
import trees from '@/store/trees/trees'
import audio from '@/store/trees/audio'
import { IFlowsState, store as flow } from './flow'
import { IBuilderState, store as builder } from './builder'
import { IClipboardState, store as clipboard } from '@/store/clipboard'

export interface IRootState {
  builder: IBuilderState;
  flow: IFlowsState;
  trees: any;
  audio: any;
  clipboard: IClipboardState;
}

export const store: StoreOptions<IRootState> = {
  modules: {
    builder,
    flow,
    trees, // trees was originally implemented globally, expecting it's state at root
    audio,
    clipboard,
  },
}

export default store
