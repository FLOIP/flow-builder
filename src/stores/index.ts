import {StoreOptions} from 'vuex'
import {IFlowsState, store as flow} from './flow'
import {IBuilderState, store as builder} from './builder'


export interface IRootState {
  builder: IBuilderState,
  flow: IFlowsState,
}

export const store: StoreOptions<IRootState> = {
  modules: {
    builder,
    flow,
  },
}

export default store
