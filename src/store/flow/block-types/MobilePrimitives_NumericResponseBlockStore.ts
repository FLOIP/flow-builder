import {ActionTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlock, IBlockExit} from '@floip/flow-runner'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {INumericResponseBlock} from '@floip/flow-runner/src/model/block/INumericResponseBlock'
import {cloneDeep} from 'lodash'
import BaseStore from '@/store/flow/block-types/BaseBlock'
import {IFlowsState} from '../index'

export const BLOCK_TYPE = 'MobilePrimitives.NumericResponse'

const baseActions = cloneDeep(BaseStore.actions)

const actions: ActionTree<IFlowsState, IRootState> = {
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
    props.exits = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: await (new IdGeneratorUuidV4()).generate(),
        }) as IBlockExit,
      }, {root: true}),
    ]

    const blankResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {root: true})
    props.config = {
      prompt: blankResource.uuid,
      validation_minimum: undefined,
      validation_maximum: undefined,
    }

    //TODO - fix this
    // @ts-ignore - Not all constituents of type 'Action<IFlowsState, IRootState>' are callable.
    return baseActions.createWith({dispatch}, {props})
  },

  handleBranchingTypeChangedToUnified({dispatch}, {block}: { block: IBlock }) {
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
    return `AND(is_number(block.value, block.value >= ${block.config.validation_minimum}, block.value <= ${block.config.validation_maximum}))`
  }
  if ((block.config.validation_minimum !== null && block.config.validation_minimum !== undefined)
    && (block.config.validation_maximum === null || block.config.validation_maximum === undefined)) {
    return `AND(is_number(block.value), block.value >= ${block.config.validation_minimum}))`
  }
  if ((block.config.validation_minimum === null || block.config.validation_minimum === undefined)
    && (block.config.validation_maximum !== null && block.config.validation_maximum !== undefined)) {
    return `AND(is_number(block.value), block.value <= ${block.config.validation_maximum}))`
  }

  console.warn('Exit test condition not found for NumericBlock, providing `true` by default')
  return 'true'
}

const MobilePrimitives_NumericResponseBlockStore = cloneDeep(BaseStore)
MobilePrimitives_NumericResponseBlockStore.actions.setValidationMinimum = actions.setValidationMinimum
MobilePrimitives_NumericResponseBlockStore.actions.setValidationMaximum = actions.setValidationMaximum
MobilePrimitives_NumericResponseBlockStore.actions.setMaxDigits = actions.setMaxDigits
MobilePrimitives_NumericResponseBlockStore.actions.createWith = actions.createWith
MobilePrimitives_NumericResponseBlockStore.actions.handleBranchingTypeChangedToUnified = actions.handleBranchingTypeChangedToUnified

export default MobilePrimitives_NumericResponseBlockStore
