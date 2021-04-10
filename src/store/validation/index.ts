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
  blockValidationStatuses: { [key: string]: IValidationStatus }; //keys are block ids
  blockTypeValidators: { [key: string]: ValidateFunction }; //keys are block types
  flowValidationStatus: IValidationStatus;
  flowValidator: ValidateFunction;
}

export const stateFactory = (): IValidationState => ({
  blockValidationStatuses: {} as { [key:string]: IValidationStatus },
  blockTypeValidators: {} as { [key: string]: ValidateFunction },
  flowValidationStatus: {} as IValidationStatus,
  flowValidator: {} as ValidateFunction
})

export const getters: GetterTree<IValidationState, IRootState> = {

}

export const mutations: MutationTree<IValidationState> = {

}

export const actions: ActionTree<IValidationState, IRootState> = {
  async validate_block({ state }, { block } : { block: IBlock }): Promise<IValidationStatus> {
    const { uuid: blockId, type: blockType } = block
    const blockTypeWithoutNameSpace = blockType.split('.')[blockType.split('.').length - 1]
    const blockJsonSchemaFile = `I${blockTypeWithoutNameSpace}Block.json`

    if (isEmpty(state.blockTypeValidators) || !state.blockTypeValidators.hasOwnProperty(blockTypeWithoutNameSpace)) {
      // TODO: point to the right JSON once we consume the right flow-runner version, then delete tmp file
      state.blockTypeValidators[blockTypeWithoutNameSpace] = createDefaultJsonSchemaValidatorFactoryFor(require(`../../../_tmp/${blockJsonSchemaFile}`))
    }
    const validate = state.blockTypeValidators[blockTypeWithoutNameSpace]

    state.blockValidationStatuses[blockId] = {
      isValid: validate(block),
      errors: validate.errors,
    }

    return state.blockValidationStatuses[blockId]
  },

  async validate_flow({ state }, { flow } : { flow: IFlow }): Promise<IValidationStatus> {
    if (isEmpty(state.flowValidator)) {
      // TODO: point to the right JSON once we consume the right flow-runner version, then delete tmp file
      state.flowValidator = createDefaultJsonSchemaValidatorFactoryFor(require('../../../_tmp/flowSpecJsonSchema.json'), '#/definitions/IFlow')
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
 * @param subSchema, Specify it if we want to pick a sub definition eg: pick `#/definitions/IFlow` under IContainer
 */
export function createDefaultJsonSchemaValidatorFactoryFor(jsonSchema: JSONSchema7, subSchema: string = ''): ValidateFunction {
  if (subSchema === '') {
    return ajv.compile(jsonSchema)
  } else {
    ajv.addSchema(jsonSchema)
    const validate = ajv.getSchema(subSchema)
    if (!validate) {
      throw new Error(`Cannot find definition ${subSchema} in schema ${jsonSchema}`)
    }
    return validate as ValidateFunction
  }
}

export function debugValidationStatus(status: IValidationStatus, customMessage: string) {
  console.debug(
    customMessage,
    ' | isValid:', status.isValid,
    ' | errors:', `${status.hasOwnProperty('errors') && !!status.errors! ? (status.errors!).map(item => get(item, 'message', 'undefined')).join(';') : 'undefined'}`,
    ' | details:', status
  )
}
