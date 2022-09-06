import {IValidationStatus, validateBlockWithJsonSchema} from '@/lib'
import {IBlock} from '@floip/flow-runner'
import {ErrorObject} from 'ajv'

export type ValidationMessageSuffix = string
export type ValidationResult = [ErrorObject['dataPath'], ValidationMessageSuffix]
export type ValidationResults = ValidationResult[]

/**
 * This class encapsulates JSON schema validation logic
 * and also runs user-defined programmatic checks from within subclasses.
 */
export class ExtendedValidatorBase {
  /**
   * Run programmatic validations, which are validations that are not handled by the AJV (jsonSchema)
   * We can override this in each block type validator for block specific validation.
   */
  static runProgrammaticValidations(_block: IBlock, _options?: unknown): ValidationResults | null {
    return null
  }

  /**
   * Run all validations logic:
   * - jsonSchema based
   * - programmatic logic
   */
  static runAllValidations(block: IBlock, schemaVersion: string, options?: unknown): IValidationStatus {
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
          message: 'test',
        } as ErrorObject)
      }
    })

    return validationStatus
  }
}
