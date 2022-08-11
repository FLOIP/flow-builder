import {IValidationStatus} from '@/lib'
// Very strange: for some reason, we need to load validateBlockWithJsonSchema directly, not from '@/lib', otherwise we got this
// error >> "TypeError: rawModule is undefined". Because selectOne module becomes undefined
import {validateBlockWithJsonSchema} from '@/store/validation/validationHelpers'
import {IBlock} from '@floip/flow-runner'
import {ErrorObject} from 'ajv'
import Lang from '@/lib/filters/lang'
import {JSONSchema7} from 'json-schema'


//
// /**
//  * This class encapsulates JSON schema validation logic
//  * and also runs user-defined programmatic checks from within subclasses.
//  */
// class ExtendedValidatorBase {
//   /**
//    * Run programmatic validations, which are validations that are not handled by the AJV (jsonSchema)
//    * We can override this in each block type validator for block specific validation.
//    */
//   static runProgrammaticValidations(block: IBlock, _options?: unknown): ValidationResults | null {
//     console.debug('floip/ExtendedValidatorBase/runProgrammaticValidations()', `${block.type}`)
//     return null
//   }
//
//   /**
//    * Run all validations logic:
//    * - jsonSchema based
//    * - programmatic logic
//    */
//   static runAllValidations(block: IBlock, schemaVersion: string, customSchema?: JSONSchema7, options?: unknown): IValidationStatus {
//     console.debug('floip/ExtendedValidatorBase/runAllValidations()', `${block.type}`)
//     const validationStatus = validateBlockWithJsonSchema({
//       block,
//       schemaVersion,
//       customBlockJsonSchema: customSchema,
//     })
//
//     const dataPaths = new Set(validationStatus.ajvErrors?.map(error => error.dataPath))
//     const validationResults = this.runProgrammaticValidations(block, options) ?? []
//
//     validationResults.forEach(([dataPath, suffix]) => {
//       if (!dataPaths.has(dataPath)) {
//         dataPaths.add(dataPath)
//
//         validationStatus.ajvErrors = validationStatus.ajvErrors || []
//         validationStatus.ajvErrors.push({
//           dataPath,
//           message: lang.trans(`flow-builder-validation.${suffix}`),
//         } as ErrorObject)
//       }
//     })
//
//     return validationStatus
//   }
// }
//
// export {ExtendedValidatorBase}
// export default ExtendedValidatorBase
