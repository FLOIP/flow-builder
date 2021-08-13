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
  async setValidationMinimum({commit}, {blockId, value}: { blockId: IBlock['uuid'], value: number | string }) {
    const valueAsNumberOrUnset = value === '' ? undefined : value
    commit('flow/block_updateConfigByKey', {
      blockId,
      key: 'validation_minimum',
      value: valueAsNumberOrUnset,
    }, {root: true})
    return valueAsNumberOrUnset
  },
  async setValidationMaximum({commit}, {blockId, value}: { blockId: IBlock['uuid'], value: number | string }) {
    const valueAsNumberOrUnset = value === '' ? undefined : value
    commit('flow/block_updateConfigByKey', {
      blockId,
      key: 'validation_maximum',
      value: valueAsNumberOrUnset,
    }, {root: true})
    return valueAsNumberOrUnset
  },
  async setMaxDigits({commit}, {blockId, value}: { blockId: IBlock['uuid'], value: number | string }) {
    const valueAsNumberOrUnset = value === '' ? undefined : value
    commit('flow/block_updateConfigByKey', {
      blockId,
      key: 'ivr',
      value: {
        max_digits: valueAsNumberOrUnset,
      },
    }, {root: true})
    return valueAsNumberOrUnset
  },
  async createWith({dispatch, commit}, {props}: { props: { uuid: string } & Partial<INumericResponseBlock> }) {
    const exits: IBlockExit[] = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: await (new IdGeneratorUuidV4()).generate(),
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
        validation_minimum: undefined,
        validation_maximum: undefined,
      },
      tags: [],
      vendor_metadata: {},
    })
  },

  handleBranchingTypeChangedToUnified({dispatch}, {block}: {block: IBlock}) {
    dispatch('flow/block_convertExitFormationToUnified', {
      blockId: block.uuid,
      test: formatTestValueForUnifiedBranchingType(block as INumericResponseBlock),
    }, {root: true})
  },
}

function formatTestValueForUnifiedBranchingType(block: INumericResponseBlock): string {
  if ((block.config.validation_minimum === null || block.config.validation_minimum === undefined)
    && (block.config.validation_maximum === null || block.config.validation_maximum === undefined)) {
    return 'is_number(block.value)'
  }
  if ((block.config.validation_minimum !== null && block.config.validation_minimum !== undefined)
    && (block.config.validation_maximum !== null && block.config.validation_maximum !== undefined)) {
    return `AND(is_number(block.value, block.value >= ${block.config.validation_minimum},`
      + ` block.value <= ${block.config.validation_maximum})`
  }
  if ((block.config.validation_minimum !== null && block.config.validation_minimum !== undefined)
    && (block.config.validation_maximum === null || block.config.validation_maximum === undefined)) {
    return `AND(is_number(block.value), block.value >= ${block.config.validation_minimum})`
  }
  if ((block.config.validation_minimum === null || block.config.validation_minimum === undefined)
    && (block.config.validation_maximum !== null && block.config.validation_maximum !== undefined)) {
    return `AND(is_number(block.value), block.value <= ${block.config.validation_maximum})`
  }

  console.warn('Exit test condition not found for NumericBlock, providing `true` by default')
  return 'true'
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
}
