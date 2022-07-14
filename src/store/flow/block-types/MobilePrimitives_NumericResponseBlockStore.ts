import {ActionTree, Module} from 'vuex'
import {IRootState} from '@/store'
import {IBlock, IBlockExit, INumericBlockConfig} from '@floip/flow-runner'
import {INumericResponseBlock} from '@floip/flow-runner/src/model/block/INumericResponseBlock'
import {cloneDeep} from 'lodash'
import BaseStore, {actions as baseActions, IEmptyState} from '@/store/flow/block-types/BaseBlock'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
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

  async createWith({dispatch, commit}, {props}: { props: { uuid: string } & Partial<INumericResponseBlock> }) {
    props.type = BLOCK_TYPE
    const blankResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {root: true})
    props.config = {
      prompt: blankResource.uuid,
      validation_minimum: undefined,
      validation_maximum: undefined,
    }

    props.exits = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: await (new IdGeneratorUuidV4()).generate(),
          name: 'Invalid',
        }) as IBlockExit,
      }, {root: true}),
    ]
    return baseActions.createWith({dispatch}, {props})
  },

  handleBranchingTypeChangedToUnified({dispatch}, {block}: {block: IBlock}) {
    dispatch('flow/block_updateBranchingExitsWithInvalidScenario', {
      blockId: block.uuid,
      test: '@ISNUMBER(block.value)',
    }, {root: true})
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
