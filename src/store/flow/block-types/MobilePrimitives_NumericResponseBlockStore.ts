import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlock, IBlockExit} from '@floip/flow-runner'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {INumericResponseBlock} from '@floip/flow-runner/src/model/block/INumericResponseBlock'
import {defaultsDeep} from 'lodash'
import {IFlowsState} from '../index'

export const BLOCK_TYPE = 'MobilePrimitives.NumericResponse'

export const getters: GetterTree<IFlowsState, IRootState> = {}

export const mutations: MutationTree<IFlowsState> = {}

export const actions: ActionTree<IFlowsState, IRootState> = {
  async setValidationMinimum({commit}, {blockId, value}: { blockId: IBlock['uuid'], value: number | string | null }) {
    const valueAsNumberOrNull = value === "" ? null : value
    commit('flow/block_updateConfigByKey', {
      blockId,
      key: 'validation_minimum',
      value: valueAsNumberOrNull,
    }, {root: true})
    return valueAsNumberOrNull
  },
  async setValidationMaximum({commit}, {blockId, value}: { blockId: IBlock['uuid'], value: number | string | null }) {
    const valueAsNumberOrNull = value === "" ? null : value
    commit('flow/block_updateConfigByKey', {
      blockId,
      key: 'validation_maximum',
      value: valueAsNumberOrNull,
    }, {root: true})
    return valueAsNumberOrNull
  },
  async setMaxDigits({commit}, {blockId, value}: { blockId: IBlock['uuid'], value: number | string | null}) {
    const valueAsNumberOrNull = value === "" ? null : value
    commit('flow/block_updateConfigByKey', {
      blockId,
      key: 'ivr',
      value: {
        max_digits: valueAsNumberOrNull,
      },
    }, {root: true})
    return valueAsNumberOrNull
  },
  async createWith({dispatch, commit}, {props}: { props: { uuid: string } & Partial<INumericResponseBlock> }) {
    const exits: IBlockExit[] = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: await (new IdGeneratorUuidV4()).generate(),
          name: 'Default',
        }) as IBlockExit,
      }, {root: true}),
      await dispatch('flow/block_createBlockExitWith', {
        props: ({
          uuid: await (new IdGeneratorUuidV4()).generate(),
          name: 'Error',
        }) as IBlockExit,
      }, {root: true}),
    ]

    const blankResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {root: true})
    commit('flow/resource_add', {resource: blankResource}, {root: true})

    return defaultsDeep(props, {
      type: BLOCK_TYPE,
      name: '',
      label: '',
      semantic_label: '',
      exits,
      config: {
        prompt: blankResource.uuid,
        validation_minimum: null,
        validation_maximum: null,
        ivr: {
          max_digits: null,
        },
      },
      tags: [],
    })
  },
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
}
