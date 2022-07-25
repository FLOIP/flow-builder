import {IBlock} from '@floip/flow-runner'
import {ExtendedValidatorBase, ValidationResults} from './ExtendedValidatorBase'

export default class Core_RunFlowBlockValidator extends ExtendedValidatorBase {
  static runProgrammaticValidations(block: IBlock, options?: unknown): ValidationResults | null {
    const {flow_id} = block.config

    if (typeof flow_id !== 'string' || flow_id.length === 0) {
      return [
        ['/config/flow_id', 'block-config-flow-id'],
      ]
    }

    return null
  }
}
