import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlock, IBlockExit, IFlow} from '@floip/flow-runner'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {IRunFlowBlock} from '@floip/flow-runner/src/model/block/IRunFlowBlock'
import {defaultsDeep} from 'lodash'
import {validate_community_block} from '@/store/validation/validationHelpers'
import {IFlowsState} from '../index'

export const BLOCK_TYPE = 'Core.RunFlow'

export const getters: GetterTree<IFlowsState, IRootState> = {
  otherFlows: (
    state,
    _getters,
    rootState,
    rootGetters,
  ): IFlow[] => rootState.flow.flows.filter((flow: IFlow) => flow.uuid !== rootGetters['flow/activeFlow'].uuid),
}

export const mutations: MutationTree<IFlowsState> = {}

export const actions: ActionTree<IFlowsState, IRootState> = {
  async setDestinationFlowId({commit}, {blockId, newDestinationFlowId}: { blockId: string, newDestinationFlowId: string }) {
    commit('flow/block_updateConfig', {blockId, newConfig: {flow_id: newDestinationFlowId}}, {root: true})
    return newDestinationFlowId
  },
  async createWith({dispatch}, {props}: { props: { uuid: string } & Partial<IRunFlowBlock> }) {
    const exits: IBlockExit[] = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: await (new IdGeneratorUuidV4()).generate(),
        }) as IBlockExit,
      }, {root: true}),
    ]

    return defaultsDeep(props, {
      type: BLOCK_TYPE,
      name: '',
      label: '',
      semantic_label: '',
      config: {
        flow_id: '',
      },
      exits,
      tags: [],
      vendor_metadata: {},
    })
  },

  handleBranchingTypeChangedToUnified({dispatch}, {block}: {block: IBlock}) {
    dispatch('flow/block_convertExitFormationToUnified', {
      blockId: block.uuid,
      test: 'block.value = true',
    }, {root: true})
  },

  validate_block({rootGetters}, {block, schemaVersion}: {block: IBlock, schemaVersion: string}) {
    return validate_community_block({block, schemaVersion})
  },
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
}
