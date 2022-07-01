import {IBlock, IBlockConfig} from '@floip/flow-runner'
import {ExtendedValidatorBase, ValidationResults} from './ExtendedValidatorBase'

export default class Core_SetGroupMembershipValidator extends ExtendedValidatorBase {
  static runProgrammaticValidations(block: IBlock<IBlockConfig>, options?: unknown): ValidationResults | null {
    const {groups, clear} = block.config

    if (clear === false && groups.length === 0) {
      return [
        ['/config/groups', 'set-group-membership-groups-required'],
      ]
    }
    return null
  }
}
