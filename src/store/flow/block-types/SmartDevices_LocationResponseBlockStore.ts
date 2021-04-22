import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { IRootState } from '@/store'
import {
  IBlock, IBlockExit, SupportedMode, SupportedContentType,
} from '@floip/flow-runner'
import { IdGeneratorUuidV4 } from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
// import ILocationResponseBlock from '@floip/flow-runner/src/model/block/ILocationResponseBlock' // TODO: to be created on flow-runner side
import { defaultsDeep } from 'lodash'
import { IFlowsState } from '../index'

export const BLOCK_TYPE = 'SmartDevices.LocationResponse'

export const getters: GetterTree<IFlowsState, IRootState> = {}

export const mutations: MutationTree<IFlowsState> = {}

export const actions: ActionTree<IFlowsState, IRootState> = {
  async setAccuracyThreshold({ commit, rootGetters }, { blockId, value }: {blockId: string; value: number}) {
    commit('flow/block_updateConfigByKey', {
      blockId,
      key: 'accuracy_threshold_meters',
      value,
    }, { root: true })
    return value
  },
  async setAccuracyTimeout({ commit, rootGetters }, { blockId, value }: {blockId: string; value: number}) {
    commit('flow/block_updateConfigByKey', {
      blockId,
      key: 'accuracy_timeout_seconds',
      value,
    }, { root: true })
    return value
  },
  async createWith({ rootGetters, dispatch, commit }, { props }: {props: {uuid: string} & Partial<IBlock>}) {
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
      type: BLOCK_TYPE,
      name: '',
      label: '',
      semantic_label: '',
      exits,
      config: {
        accuracy_threshold_meters: 5.0,
        accuracy_timeout_seconds: 120,
      },
    })
  },
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
}
