import {ActionContext, ActionTree, Module} from 'vuex'
import {IRootState} from '@/store'
import {IBlock, INumericBlockConfig} from '@floip/flow-runner'
import {INumericResponseBlock} from '@floip/flow-runner/src/model/block/INumericResponseBlock'
import {cloneDeep} from 'lodash'
import BaseStore, {actions as baseActions, IEmptyState} from '@/store/flow/block-types/BaseBlock'
import {ValidationResults} from '@/lib/validations'

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

    return baseActions.createWith({getters, dispatch} as ActionContext<IEmptyState, IRootState>, {props})
  },

  async validateWithProgrammaticLogic(
    {rootGetters},
    {block}: {block: IBlock},
  ): Promise<ValidationResults> {
    console.debug('floip/NumericResponse/validateWithProgrammaticLogic()', `${block.type}`)
    const hasVoiceMode = rootGetters['flow/hasVoiceMode']
    const errors: ValidationResults = []

    const [maxDigits, hasMaxDigits] = normalizeNumericConfigProperty((block.config as INumericBlockConfig)?.ivr?.max_digits)
    const [validationMax, hasMax] = normalizeNumericConfigProperty((block.config as INumericBlockConfig)?.validation_maximum)
    const [validationMin, hasMin] = normalizeNumericConfigProperty((block.config as INumericBlockConfig)?.validation_minimum)

    const hasMinAndMax = hasMax && hasMin
    const isMinGreaterThanMax = hasMinAndMax && validationMin > validationMax
    const hasMinOnly = hasMin && !hasMax

    const CONFIG_VALIDATION_MINIMUM = '/config/validation_minimum'
    const CONFIG_VALIDATION_MAXIMUM = '/config/validation_maximum'
    const CONFIG_MAX_DIGITS = '/config/ivr/max_digits'

    // validationMax must be greater than validationMin
    if (isMinGreaterThanMax || hasMinOnly) {
      errors.push([CONFIG_VALIDATION_MINIMUM, 'numeric-block-min-value-must-be-lower-than-max-value'])
      errors.push([CONFIG_VALIDATION_MAXIMUM, 'numeric-block-max-value-must-be-greater-than-min-value'])
    }

    // IVR only checks
    if (hasVoiceMode === true) {
      if (!hasMax && !hasMaxDigits) {
        // Either maxDigits or validationMax must be defined

        errors.push([CONFIG_MAX_DIGITS, 'numeric-block-missing-max-value-and-max-digits'])
        errors.push([CONFIG_VALIDATION_MAXIMUM, 'numeric-block-missing-max-value-and-max-digits'])
      }

      // Both validationMin and validationMax must have no more digits than allowed
      if (hasMaxDigits) {
        const maxValue = 10 ** maxDigits - 1

        if (hasMin && validationMin > maxValue) {
          errors.push([CONFIG_MAX_DIGITS, 'numeric-block-min-value-must-be-lower-than-implied-max-digits'])
          errors.push([CONFIG_VALIDATION_MINIMUM, 'numeric-block-min-value-must-be-lower-than-implied-max-digits'])
        }
        if (hasMax && validationMax > maxValue) {
          errors.push([CONFIG_MAX_DIGITS, 'numeric-block-max-value-must-be-lower-than-implied-max-digits'])
          errors.push([CONFIG_VALIDATION_MAXIMUM, 'numeric-block-max-value-must-be-lower-than-implied-max-digits'])
        }
      }
    }

    return errors
  },
}

export function normalizeNumericConfigProperty(value?: number | string | null): [number, boolean] {
  let normalizedValue = 0
  let hasValue = false

  if (value !== undefined && value !== null) {
    hasValue = true
    normalizedValue = typeof value === 'number' ? value : parseInt(value, 10)
  }

  return [
    normalizedValue,
    hasValue,
  ]
}

const MobilePrimitives_NumericResponseBlockStore: Module<IEmptyState, IRootState> = {
  ...cloneDeep(BaseStore),
  actions,
}

export default MobilePrimitives_NumericResponseBlockStore
