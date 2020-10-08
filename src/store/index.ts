import {StoreOptions} from 'vuex'
import {IFlowsState, store as flow} from './flow'
import {IBuilderState, store as builder} from './builder'
import trees from './trees/trees'

export interface IRootState {
  builder: IBuilderState,
  flow: IFlowsState,
  trees: any
}

export const store: StoreOptions<IRootState> = {
  modules: {
    builder,
    flow,
    trees, //This is useful for storybook stories
  },
}

export default store
