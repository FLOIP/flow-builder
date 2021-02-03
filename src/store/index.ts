import {StoreOptions} from 'vuex'
import {IFlowsState, store as flow} from './flow'
import {IBuilderState, store as builder} from './builder'
// @ts-ignore
import trees from '@/store/trees/trees.js'
import audio from './trees/audio'

import { bootstrapLegacyGlobalDependencies } from '@/store/trees/bootstrap-legacy-global-dependencies'
import lodash from "lodash";

// Make sure to have permissions & other contexts loaded from __APP__
bootstrapLegacyGlobalDependencies({}, {})

export interface IRootState {
  builder: IBuilderState,
  flow: IFlowsState,
  trees: any,
  audio: any,
}

export const store: StoreOptions<IRootState> = {
  state: {
    ...lodash.chain(global).get('__APP__', {}).value(),
  },
  modules: {
    builder,
    flow,
    trees, // trees was originally implemented globally, expecting it's state at root
    audio,
  },
}

export default store
