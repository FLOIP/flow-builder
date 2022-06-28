import {IBlock, IBlockConfig, INumericBlockConfig} from '@floip/flow-runner'
import {ExtendedValidatorBase, ValidationResults} from './ExtendedValidatorBase'

function normalizeNumericConfigProperty(value?: number | string | null): [number, boolean] {
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

export default class MobilePrimitives_NumericResponseBlockValidator extends ExtendedValidatorBase {
  static runExtraValidations(block: IBlock<IBlockConfig>): ValidationResults | null {
    const errors: ValidationResults = []
    const hasVoiceMode = true

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
    if (hasVoiceMode) {
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
  }
}
