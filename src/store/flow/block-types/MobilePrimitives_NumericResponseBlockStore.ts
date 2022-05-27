import {ActionTree, Module} from 'vuex'
import {IRootState} from '@/store'
import {IBlock, INumericBlockConfig} from '@floip/flow-runner'
import {INumericResponseBlock} from '@floip/flow-runner/src/model/block/INumericResponseBlock'
import {cloneDeep} from 'lodash'
import Lang from '@/lib/filters/lang'
import {ErrorObject} from 'ajv'
import BaseStore, {actions as baseActions, IEmptyState} from '@/store/flow/block-types/BaseBlock'

const lang = new Lang()

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
      ...await dispatch('initiateExtraVendorConfig'),
    }
    return baseActions.createWith({dispatch}, {props})
  },

  handleBranchingTypeChangedToUnified({dispatch}, {block}: {block: IBlock}) {
    dispatch('flow/block_convertExitFormationToUnified', {
      blockId: block.uuid,
      test: 'is_number(block.value)',
    }, {root: true})
  },

  /**
   * Generic validation action which will call:
   * - the consumer validateBlockWithCustomJsonSchema
   * - any custom validation logic in the community version
   */
  async validate({rootGetters, dispatch}, {block, schemaVersion}: {block: IBlock, schemaVersion: string}) {
    const validationResults = await dispatch('validateBlockWithCustomJsonSchema', {block, schemaVersion})

    // Custom validation specific for the block
    if (validationResults.ajvErrors == null) {
      validationResults.ajvErrors = []
    }

    const maxDigits = (block.config as INumericBlockConfig)?.ivr?.max_digits
    const validationMax = (block.config as INumericBlockConfig)?.validation_maximum
    const validationMin = (block.config as INumericBlockConfig)?.validation_minimum

    // validationMin & validationMax relations, valid for all modes
    if ((validationMax != null && validationMin != null && validationMax < validationMin)
      || (validationMax == null && validationMin != null)) {
      validationResults.ajvErrors.push({
        dataPath: '/config/validation_minimum',
        message: lang.trans('flow-builder-validation.numeric-block-min-value-must-be-lower-than-max-value'),
      } as ErrorObject)
      validationResults.ajvErrors.push({
        dataPath: '/config/validation_maximum',
        message: lang.trans('flow-builder-validation.numeric-block-max-value-must-be-greater-than-min-value'),
      } as ErrorObject)
    }

    // MaxDigit & validationMin/validationMax relations, valid for iVR only
    if (rootGetters['flow/hasVoiceMode'] as boolean) {
      // Must have one of MaxDigit or validationMax
      if (maxDigits == null && validationMax == null) {
        validationResults.ajvErrors.push({
          dataPath: '/config/ivr/max_digits',
          message: lang.trans('flow-builder-validation.numeric-block-missing-max-value-and-max-digits'),
        } as ErrorObject)
        validationResults.ajvErrors.push({
          dataPath: '/config/validation_maximum',
          message: lang.trans('flow-builder-validation.numeric-block-missing-max-value-and-max-digits'),
        } as ErrorObject)
      }

      if (maxDigits != null) {
        // validationMin must comply with MaxDigit
        if (validationMin != null && maxDigits * 9 < validationMin) {
          validationResults.ajvErrors.push({
            dataPath: '/config/ivr/max_digits',
            message: lang.trans('flow-builder-validation.numeric-block-min-value-must-be-lower-than-implied-max-digits'),
          } as ErrorObject)
          validationResults.ajvErrors.push({
            dataPath: '/config/validation_minimum',
            message: lang.trans('flow-builder-validation.numeric-block-min-value-must-be-lower-than-implied-max-digits'),
          } as ErrorObject)
        }

        // validationMax must comply with MaxDigit
        if (validationMax != null && maxDigits * 9 < validationMax) {
          validationResults.ajvErrors.push({
            dataPath: '/config/ivr/max_digits',
            message: lang.trans('flow-builder-validation.numeric-block-max-value-must-be-lower-than-implied-max-digits'),
          } as ErrorObject)
          validationResults.ajvErrors.push({
            dataPath: '/config/validation_maximum',
            message: lang.trans('flow-builder-validation.numeric-block-max-value-must-be-lower-than-implied-max-digits'),
          } as ErrorObject)
        }
      }
    }

    return validationResults
  },
}

const MobilePrimitives_NumericResponseBlockStore: Module<IEmptyState, IRootState> = {
  ...cloneDeep(BaseStore),
  actions,
}

export default MobilePrimitives_NumericResponseBlockStore
