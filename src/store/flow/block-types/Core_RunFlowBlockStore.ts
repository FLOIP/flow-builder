import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { IRootState } from '@/store'
import {
  IBlockExit,
  IFlow,
} from '@floip/flow-runner'
import { IdGeneratorUuidV4 } from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import { IRunFlowBlock } from '@floip/flow-runner/src/model/block/IRunFlowBlock'
import { defaultsDeep } from 'lodash'
import { IFlowsState } from '../index'
import { IBlockClassConfig } from '@/store/flow/block'

export const BLOCK_CLASS_CONFIG: IBlockClassConfig = {
  name: 'Core.RunFlow',
  type: 'Core.RunFlow',
  is_interactive: false,
  is_branching: false,
  category:  0
}

export const getters: GetterTree<IFlowsState, IRootState> = {
  otherFlows: (state, getters, rootState, rootGetters): IFlow[] => {
    return rootState.flow.flows.filter((flow: IFlow) => {
      return flow.uuid !== rootGetters['flow/activeFlow'].uuid
    })
  },
}

export const mutations: MutationTree<IFlowsState> = {
}

export const actions: ActionTree<IFlowsState, IRootState> = {
  async setDestinationFlowId({ commit }, { blockId, newDestinationFlowId }: {blockId: string; newDestinationFlowId: string}) {
    commit('flow/block_updateConfig', { blockId, newConfig: { flow_id: newDestinationFlowId } }, { root: true })
    return newDestinationFlowId
  },
  async createWith({ dispatch }, { props }: {props: {uuid: string} & Partial<IRunFlowBlock>}) {
    const exits: IBlockExit[] = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: await (new IdGeneratorUuidV4()).generate(),
          tag: 'Default',
          label: 'Default',
        }) as IBlockExit,
      }, { root: true }),
      await dispatch('flow/block_createBlockExitWith', {
        props: ({
          uuid: await (new IdGeneratorUuidV4()).generate(),
          tag: 'Error',
          label: 'Error',
        }) as IBlockExit,
      }, { root: true }),
    ]

    return defaultsDeep(props, {
      type: BLOCK_CLASS_CONFIG.type,
      name: '',
      label: '',
      semantic_label: '',
      config: {
        flow_id: '',
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
