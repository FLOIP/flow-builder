import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlock, IBlockExit, INumericBlockConfig} from '@floip/flow-runner'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {INumericResponseBlock} from '@floip/flow-runner/src/model/block/INumericResponseBlock'
import {defaultsDeep, get} from 'lodash'
import {validateCommunityBlock} from '@/store/validation/validationHelpers'
import Lang from '@/lib/filters/lang'
import {ErrorObject} from 'ajv'
import {IFlowsState} from '../index'
import {IValidationStatus} from '@/store/validation'

const lang = new Lang()

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
      test: 'is_number(block.value)',
    }, {root: true})
  },

  /**
   * Validate the vendor block (Consumer block)
   * By overriding this action in the consumer side, we will be able to customize it using different json schema for eg.
   *
   * Important: This will be overridden in the consumer side, so DO NOT add generic validations here,
   * instead edit the `validate()` if needed.
   */
  async validateVendorBlock({rootGetters}, {block, schemaVersion}: {block: IBlock, schemaVersion: string}): Promise<IValidationStatus> {
    // TODO: if this works, then update all blocks
    return validateCommunityBlock({block, schemaVersion})
  },

  async validate({rootGetters, dispatch}, {block, schemaVersion}: {block: IBlock, schemaVersion: string}) {
    const validationResults = await dispatch('validateVendorBlock', {block, schemaVersion})

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

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
}
