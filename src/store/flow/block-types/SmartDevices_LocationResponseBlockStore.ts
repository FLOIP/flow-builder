import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlock, IBlockExit} from '@floip/flow-runner'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
// import ILocationResponseBlock from '@floip/flow-runner/src/model/block/ILocationResponseBlock' // TODO: to be created on flow-runner side
import {defaultsDeep} from 'lodash'
import {validate_community_block} from '@/store/validation/validationHelpers'
import {IFlowsState} from '../index'

export const BLOCK_TYPE = 'SmartDevices.LocationResponse'

export const getters: GetterTree<IFlowsState, IRootState> = {}

export const mutations: MutationTree<IFlowsState> = {}

export const actions: ActionTree<IFlowsState, IRootState> = {
  async setAccuracyThreshold({commit}, {blockId, value}: { blockId: string, value: number }) {
    commit('flow/block_updateConfigByKey', {
      blockId,
      key: 'accuracy_threshold_meters',
      value,
    }, {root: true})
    return value
  },
  async setAccuracyTimeout({commit}, {blockId, value}: { blockId: string, value: number }) {
    commit('flow/block_updateConfigByKey', {
      blockId,
      key: 'accuracy_timeout_seconds',
      value,
    }, {root: true})
    return value
  },
  async createWith({dispatch}, {props}: { props: { uuid: string } & Partial<IBlock> }) {
    const blankMessageResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {root: true})

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
      exits,
      config: {
        prompt: blankMessageResource.uuid,
        accuracy_threshold_meters: 5.0,
        accuracy_timeout_seconds: 120,
      },
      tags: [],
      vendor_metadata: {},
    })
  },

  handleBranchingTypeChangedToUnified({dispatch}, {block}: {block: IBlock}) {
    dispatch('flow/block_convertExitFormationToUnified', {
      blockId: block.uuid,
      test: 'NOT(block.value = false)',
    }, {root: true})
  },

  validate({rootGetters}, {block, schemaVersion}: {block: IBlock, schemaVersion: string}) {
    return validate_community_block({block, schemaVersion})
  },
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
}
