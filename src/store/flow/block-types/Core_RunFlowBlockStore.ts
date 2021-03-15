import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {
  IBlockExit,
} from '@floip/flow-runner'
import { IdGeneratorUuidV4 } from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import { IRunFlowBlock } from '@floip/flow-runner/src/model/block/IRunFlowBlock'
import {defaults} from 'lodash'
import {IFlowsState} from '../index'

export const BLOCK_TYPE = 'Core\\RunFlow'

export const getters: GetterTree<IFlowsState, IRootState> = {
  otherFlows: (state, getters, rootState, rootGetters): IFlowsState[] => {
    //TODO - this should actually be container.flows?
    //TODO - why does this error in typescript? - flow does exist on IRootState etc...
    // @ts-ignore - TS2339: Property 'flow' does not exist on type
    return rootState.flow.flows.filter((flow: IFlowsState) => {
      // @ts-ignore - TS2339: Property 'flow' does not exist on type
      return flow.uuid !== rootGetters['flow/activeFlow'].uuid
    })
  },
}

export const mutations: MutationTree<IFlowsState> = {
}

export const actions: ActionTree<IFlowsState, IRootState> = {
  async setDestinationFlowId({commit}, {blockId, newDestinationFlowId}: {blockId: string; newDestinationFlowId: string}) {
    commit('flow/block_updateConfig', {blockId, newConfig: {flowId: newDestinationFlowId}}, {root: true})
    return newDestinationFlowId
  },
  async createWith({dispatch}, {props}: {props: {uuid: string} & Partial<IRunFlowBlock>}) {
    const exits: IBlockExit[] = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: (new IdGeneratorUuidV4()).generate(),
          tag: 'Default',
          label: 'Default',
        }) as IBlockExit,
      }, {root: true}),
      await dispatch('flow/block_createBlockExitWith', {
        props: ({
          uuid: (new IdGeneratorUuidV4()).generate(),
          tag: 'Error',
          label: 'Error',
        }) as IBlockExit}, {root: true}),
    ]

    return defaults(props, {
      type: BLOCK_TYPE,
      name: '',
      label: '',
      semanticLabel: '',
      config: {
        flowId: '',
      },
      exits,
    })
  },

}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
}
