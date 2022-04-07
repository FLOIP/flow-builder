import {IBlock, IFlow, IResource} from '@floip/flow-runner'
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex'
// todo: create factory with generics so that IRootState is DI'd
import {IRootState} from '..'
import {actions as blockActions, getters as blockGetters, mutations as blockMutations} from './block'
import {actions as flowActions, getters as flowGetters, mutations as flowMutations} from './flow'
import {actions as resourceActions, getters as resourceGetters, mutations as resourceMutations} from './resource'

// type IFlowsState = Pick<IContext, 'flows' | 'first_flow_id' | 'resources' | 'nested_flow_block_interaction_id_stack'>

export interface IFlowsState {
  //Created is *not* the same as persisted. It does not guarantee the current state is saved to the server. Only that the currently active flow in the container was persisted - the persistFlow route was called with the container and the active flow uuid and the route response did not have an error status code
  isCreated: boolean,
  specification_version: string,
  container_uuid: string,
  flows: IFlow[],

  first_flow_id: string | null,
  // @note - for exciting future
  nested_flow_block_interaction_id_stack: string[],
  selectedBlocks: IBlock['uuid'][],
}

export const stateFactory = (): IFlowsState => ({
  isCreated: false,
  //TODO - think about how to make this dynamic
  specification_version: '1.0.0-rc4',
  //For now we'll hard code this as it doesn't yet have a function
  //Even import shouldn't override it I think even though a container is required
  container_uuid: '3666a05d-3792-482b-8f7f-9e2472e4f027',
  flows: [],

  first_flow_id: null,
  // todo: not quite right -- pulled from IContext
  nested_flow_block_interaction_id_stack: [],
  selectedBlocks: [],
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
