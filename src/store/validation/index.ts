import {
  ActionTree, GetterTree, Module, MutationTree,
} from 'vuex'
import { IRootState } from '@/store'
import Ajv, { ValidateFunction, ErrorObject } from 'ajv'
import { JSONSchema7 } from 'json-schema'
import { IBlock, IFlow } from '@floip/flow-runner'
import { isEmpty, get } from 'lodash'

const ajv = new Ajv();

export interface IValidationStatus {
  isValid: boolean | PromiseLike<any>;
  errors?: null | Array<ErrorObject>; // AJV errors
}

export interface IValidationState {
  blocksValidationStatus: { [key:string]: IValidationStatus[] };
  flowValidationStatus: IValidationStatus;
  flowValidator: ValidateFunction;
}

export const stateFactory = (): IValidationState => ({
  blocksValidationStatus: {} as { [key:string]: IValidationStatus[] },
  flowValidationStatus: {} as IValidationStatus,
  flowValidator: {} as ValidateFunction
})

export const getters: GetterTree<IValidationState, IRootState> = {

}

export const mutations: MutationTree<IValidationState> = {

}

export const actions: ActionTree<IValidationState, IRootState> = {
  async validate_block({ state }, { block } : { block: IBlock }) {
    return true
  },

  async validate_flow({ state }, { flow } : { flow: IFlow }): Promise<IValidationStatus> {
    if (isEmpty(state.flowValidator)) {
      // TODO: point to the right JSON once we consume the right flow-runner version, then delete tmp file
      state.flowValidator = createDefaultJsonSchemaValidatorFactoryFor(require('../../../_tmp/flowSpecJsonSchema.json'))
    }
    const validate = state.flowValidator

    state.flowValidationStatus = {
      isValid: validate(flow),
      errors: validate.errors,
    }

    return state.flowValidationStatus
  }
}

export const store: Module<IValidationState, IRootState> = {
  namespaced: true,
  state: stateFactory,
  getters,
  mutations,
  actions,
}

export default store

/**
 * Create AJV Validator
 * Usage :
 * const validate = createDefaultJsonSchemaValidatorFactoryFor(require('./some-json-schema.json')
 * const isValid = validate(myData)
 * const error = validate.errors
 *
 * @param jsonSchema
 */
export function createDefaultJsonSchemaValidatorFactoryFor(jsonSchema: JSONSchema7): ValidateFunction {
  return ajv.compile(jsonSchema)
}

export function debutValidationStatus(status: IValidationStatus) {
  console.debug(
    'validation status',
    ' | isValid:', status.isValid,
    ' | errors:', `${status.hasOwnProperty('errors') ? (status.errors!).map(item => get(item, 'message', 'undefined')).join(';') : 'undefined'}`,
    ' | details:', status
  )
}
