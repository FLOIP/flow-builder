import {
  ActionTree, GetterTree, Module, MutationTree,
} from 'vuex'
import { IRootState } from '@/store'
import Ajv, { ValidateFunction, ErrorObject } from 'ajv'
import { JSONSchema7 } from 'json-schema'
import { IBlock, IFlow } from '@floip/flow-runner'
import { isEmpty, get } from 'lodash'

const ajv = new Ajv();
const DEV_ERROR_KEYWORDS = [
  'additionalProperties', // unwanted extra props
  'required' // missing props
]

export interface IIndexedString { [key: string]: string }

export interface IValidationStatus { // important context for future debug or testing
  isValid: boolean | PromiseLike<any>;
  ajvErrors?: null | Array<ErrorObject>;
}

export interface IValidationState {
  blockValidationStatuses: { [key: string]: IValidationStatus }; //keys are block ids
  blockTypeValidators: { [key: string]: ValidateFunction }; //keys are block types
  flowValidationStatus: IValidationStatus;
  flowValidator: ValidateFunction;

  indexedErrorMessages: IIndexedString; // Human readable errors
}

export const stateFactory = (): IValidationState => ({
  blockValidationStatuses: {} as { [key:string]: IValidationStatus },
  blockTypeValidators: {} as { [key: string]: ValidateFunction },
  flowValidationStatus: {} as IValidationStatus,
  flowValidator: {} as ValidateFunction,

  indexedErrorMessages: {} as IIndexedString
})

export const getters: GetterTree<IValidationState, IRootState> = {

}

export const mutations: MutationTree<IValidationState> = {
  indexedMessageFromAjvErrors(state, { keyPrefix, errors }: { keyPrefix: string, errors: undefined | null | Array<ErrorObject> }) {
    errors?.forEach((error, key) => {
      let index = '', message = ''
      if (DEV_ERROR_KEYWORDS.includes(error.keyword)) {
        // this is more likely a dev issue than user error
        // error.dataPath could be empty or not for such errors
        index = `${keyPrefix}${error.schemaPath}`
        message = `${error.message}, for params ${JSON.stringify(error.params)}`
        console.error(`Schema issue found when validating ${index}: ${message}`)
      } else {
        index = `${keyPrefix}${error.dataPath}`
        message = error.message as string
      }
      state.indexedErrorMessages[index] = message as string
    })
  }
}

export const actions: ActionTree<IValidationState, IRootState> = {
  async validate_block({ state, commit }, { block } : { block: IBlock }): Promise<IValidationStatus> {
    const { uuid: blockId, type: blockType } = block
    const blockTypeWithoutNameSpace = blockType.split('.')[blockType.split('.').length - 1]
    const blockJsonSchemaFile = `I${blockTypeWithoutNameSpace}Block.json`

    if (isEmpty(state.blockTypeValidators) || !state.blockTypeValidators.hasOwnProperty(blockTypeWithoutNameSpace)) {
      // TODO: point to the right JSON once we consume the right flow-runner version, then delete tmp file
      state.blockTypeValidators[blockTypeWithoutNameSpace] = createDefaultJsonSchemaValidatorFactoryFor(require(`../../../_tmp/${blockJsonSchemaFile}`))
    }
    const validate = state.blockTypeValidators[blockTypeWithoutNameSpace]
    const keyPrefix = `block/${blockId}/`
    state.blockValidationStatuses[blockId] = {
      isValid: validate(block),
      ajvErrors: validate.errors,
    }

    commit('indexedMessageFromAjvErrors', {
      keyPrefix,
      errors: validate.errors
    })

    debugValidationStatus(state.blockValidationStatuses[blockId], `validation status for block ${blockId}`)
    return state.blockValidationStatuses[blockId]
  },

  async validate_flow({ state, commit }, { flow } : { flow: IFlow }): Promise<IValidationStatus> {
    if (isEmpty(state.flowValidator)) {
      // TODO: point to the right JSON once we consume the right flow-runner version, then delete tmp file
      state.flowValidator = createDefaultJsonSchemaValidatorFactoryFor(require('../../../_tmp/flowSpecJsonSchema.json'), '#/definitions/IFlow')
    }
    const validate = state.flowValidator

    const keyPrefix = `flow/${flow.uuid}/`
    state.flowValidationStatus = {
      isValid: validate(flow),
      ajvErrors: validate.errors,
    }

    commit('indexedMessageFromAjvErrors', {
      keyPrefix,
      errors: validate.errors
    })

    debugValidationStatus(state.flowValidationStatus, 'flow validation status')
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

function debugValidationStatus(status: IValidationStatus, customMessage: string) {
  console.debug(
    customMessage,
    ' | isValid:', status.isValid,
    ' | error message:', `${status.hasOwnProperty('ajvErrors') && !!status.ajvErrors! ? (status.ajvErrors!).map(item => get(item, 'message', 'undefined')).join(';') : 'undefined'}`,
    ' | error details:', status
  )
}
