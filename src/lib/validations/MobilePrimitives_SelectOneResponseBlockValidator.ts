import {IBlock, ISelectManyResponseBlockConfig} from '@floip/flow-runner'
import {ExtendedValidatorBase, ValidationResults} from './ExtendedValidatorBase'

class MobilePrimitives_SelectOneResponseBlockValidator extends ExtendedValidatorBase {
  static runProgrammaticValidations(block: IBlock<ISelectManyResponseBlockConfig>, _options: unknown): ValidationResults | null {
    const errors: ValidationResults = []

    // validationMax must be greater than validationMin
    const allIvrTestExpressions = block.config.choices.map(choice => choice.ivr_test?.test_expression)
    const duplicates = allIvrTestExpressions.filter(
      (item, index) => item !== undefined && allIvrTestExpressions.indexOf(item) !== index,
    )
    if (duplicates.length > 0) {
      errors.push(['/config/choices', 'duplicate-ivr-test-test_expression'])
    }

    return errors
  }
}

export {MobilePrimitives_SelectOneResponseBlockValidator}
export default MobilePrimitives_SelectOneResponseBlockValidator
