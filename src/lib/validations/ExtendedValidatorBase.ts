import {IValidationStatus, validateBlockWithJsonSchema} from '@/lib'
import {IBlock} from '@floip/flow-runner'
import {ErrorObject} from 'ajv'
import Lang from '@/lib/filters/lang'

const lang = new Lang()

export type ValidationMessageSuffix = string
export type ValidationResult = [ErrorObject['dataPath'], ValidationMessageSuffix]
export type ValidationResults = ValidationResult[]

/**
 * This class encapsulates JSON schema validation logic
 * and also runs user-defined programmatic checks from within subclasses.
 */
export class ExtendedValidatorBase {
  static runProgrammaticValidations(_block: IBlock, _options?: unknown): ValidationResults | null {
    return null
  }

  static validate(block: IBlock, schemaVersion: string, options?: unknown): IValidationStatus {
    const validationStatus = validateBlockWithJsonSchema({
      block,
      schemaVersion,
    })

    const dataPaths = new Set(validationStatus.ajvErrors?.map(error => error.dataPath))
    const validationResults = this.runProgrammaticValidations(block, options) ?? []

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
