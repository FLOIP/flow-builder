import {ActionTree, GetterTree, Module} from 'vuex'
import {IRootState} from '@/store'
import {findBlockOnActiveFlowWith, findBlockWith, IBlock, IBlockExit, IContext, INumericBlockConfig} from '@floip/flow-runner'
import {INumericResponseBlock} from '@floip/flow-runner/src/model/block/INumericResponseBlock'
import {cloneDeep} from 'lodash'
import BaseStore, {actions as baseActions, IEmptyState, getters as baseGetters} from '@/store/flow/block-types/BaseBlock'
import {MobilePrimitives_NumericResponseBlockValidator} from '@/lib/validations'

export const BLOCK_TYPE = 'MobilePrimitives.NumericResponse'

const actions: ActionTree<IEmptyState, IRootState> = {
  ...baseActions,

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

  async createWith({getters, dispatch, commit}, {props}: { props: { uuid: string } & Partial<INumericResponseBlock> }) {
    props.type = BLOCK_TYPE
    const blankResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {root: true})
    props.config = {
      prompt: blankResource.uuid,
      validation_minimum: undefined,
      validation_maximum: undefined,
    }

    return baseActions.createWith({getters, dispatch}, {props})
  },

  /**
   * Generic validation action which will call:
   * - the consumer validateBlockWithCustomJsonSchema
   * - any custom validation logic in the community version
   */
  async validate({rootGetters, dispatch}, {block, schemaVersion}: {block: IBlock, schemaVersion: string}) {
    return MobilePrimitives_NumericResponseBlockValidator.runAllValidations(block, schemaVersion, {
      hasVoiceMode: rootGetters['flow/hasVoiceMode'],
    })
  },
}

const MobilePrimitives_NumericResponseBlockStore: Module<IEmptyState, IRootState> = {
  ...cloneDeep(BaseStore),
  actions,
}

export default MobilePrimitives_NumericResponseBlockStore
