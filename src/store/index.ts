import { StoreOptions } from 'vuex'
import trees from '@/store/trees/trees.js'
import { IClipboardState, store as clipboard } from '@/store/clipboard'
import { IFlowsState, store as flow } from './flow'
import { IBuilderState, store as builder } from './builder'
// @ts-ignore

export interface IRootState {
  builder: IBuilderState;
  flow: IFlowsState;
  trees: any;
  clipboard: IClipboardState;
}

export const store: StoreOptions<IRootState> = {
  modules: {
    builder,
    flow,
    trees, // trees was originally implemented globally, expecting it's state at root
    clipboard,
  },
}

export default store
