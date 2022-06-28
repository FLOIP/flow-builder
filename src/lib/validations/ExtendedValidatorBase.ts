import {IValidationStatus, validateBlockWithJsonSchema} from '@/lib'
import {IBlock} from '@floip/flow-runner'
import {ErrorObject} from 'ajv'
import Lang from '@/lib/filters/lang'
import {castArray} from 'lodash'

const lang = new Lang()

export type ValidationMessageSuffix = string
export type ValidationResult = [ErrorObject['dataPath'], ValidationMessageSuffix]
export type ValidationResults = ValidationResult[]

export class ExtendedValidatorBase {
  static runExtraValidations(block: IBlock, options?: unknown): ValidationResults | null {
    return null
  }

  static validate(block: IBlock, schemaVersion: string, options?: unknown): IValidationStatus {
    const validationStatus = validateBlockWithJsonSchema({
      block,
      schemaVersion,
    })

    const dataPaths = new Set(validationStatus.ajvErrors?.map(error => error.dataPath))
    const validationResults = castArray(this.runExtraValidations(block, options) ?? [])

    validationResults.forEach(([dataPath, suffix]) => {
      if (!dataPaths.has(dataPath)) {
        dataPaths.add(dataPath)

        validationStatus.ajvErrors = validationStatus.ajvErrors || []
        validationStatus.ajvErrors.push({
          dataPath,
          message: lang.trans(`flow-builder-validation.${suffix}`),
        } as ErrorObject)
      }
    })

    return validationStatus
  }
}
