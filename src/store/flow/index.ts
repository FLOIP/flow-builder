import { IFlow, IResourceDefinition } from '@floip/flow-runner'
import {
  ActionTree, GetterTree, Module, MutationTree,
} from 'vuex'
import { IRootState } from '..' // todo: create factory with generics so that IRootState is DI'd
import {
  getters as blockGetters,
  mutations as blockMutations,
  actions as blockActions,
} from './block'
import {
  actions as flowActions,
  getters as flowGetters,
  mutations as flowMutations,
} from './flow'
import {
  actions as resourceActions,
  getters as resourceGetters,
  mutations as resourceMutations,
} from './resource'

// type IFlowsState = Pick<IContext, 'flows' | 'firstFlowId' | 'resources' | 'nestedFlowBlockInteractionIdStack'>

export interface IFlowsState {
  //Created is *not* the same as persisted. It does not guarantee the current state is saved to the server. Only that the currently active flow in the container was persisted - the persistFlow route was called with the container and the active flow uuid and the route response did not have an error status code 
  created: boolean,
  flows: IFlow[];
  resources: IResourceDefinition[];

  firstFlowId: string | null;
  // @note - for exciting future
  nestedFlowBlockInteractionIdStack: string[];

  // activeBlock: string | null, // this is actually a getter over IContext
}

export const stateFactory = (): IFlowsState => ({
  created: false,
  flows: [],
  resources: [],

  firstFlowId: null,
  nestedFlowBlockInteractionIdStack: [], // todo: not quite right -- pulled from IContext

  // activeBlock: null,
})

export const getters: GetterTree<IFlowsState, IRootState> = {
  ...flowGetters,
  ...blockGetters,
  ...resourceGetters,
}

export const mutations: MutationTree<IFlowsState> = {
  ...flowMutations,
  ...blockMutations,
  ...resourceMutations,
}

export const actions: ActionTree<IFlowsState, IRootState> = {
  ...flowActions,
  ...blockActions,
  ...resourceActions,
}

export const store: Module<IFlowsState, IRootState> = {
  namespaced: true,
  state: stateFactory,
  getters,
  mutations,
  actions,
}

export default store
