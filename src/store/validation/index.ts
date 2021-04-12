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

export interface IValidationStatus {
  isValid: boolean | PromiseLike<any>;
  ajvErrors?: null | Array<ErrorObject>;
}

export interface IValidationState {
  validationStatuses: { [key: string]: IValidationStatus }; //important context for future debug or testing, keys are index like `flow/flowId`
  validators: { [key: string]: ValidateFunction }; //AJV validators, keys are types
  flattenErrorMessages: IIndexedString; // Human readable errors, keys are index like `flow/flowId/.path/.to/.prop`. Note that indexedErrors has more elements than validationStatuses
}

export const stateFactory = (): IValidationState => ({
  validationStatuses: {} as { [key:string]: IValidationStatus },
  validators: {} as { [key: string]: ValidateFunction },
  flattenErrorMessages: {} as IIndexedString
})

export const getters: GetterTree<IValidationState, IRootState> = {

}

export const mutations: MutationTree<IValidationState> = {
  flatValidationStatuses(state, { keyPrefix, errors }: { keyPrefix: string, errors: undefined | null | Array<ErrorObject> }) {
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
      state.flattenErrorMessages[index] = message as string
    })
  }
}

export const actions: ActionTree<IValidationState, IRootState> = {
  async validate_block({ state, commit }, { block } : { block: IBlock }): Promise<IValidationStatus> {
    const { uuid: blockId, type: blockType } = block
    const blockTypeWithoutNameSpace = blockType.split('.')[blockType.split('.').length - 1]
    const blockJsonSchemaFile = `I${blockTypeWithoutNameSpace}Block.json`

    if (isEmpty(state.validators) || !state.validators.hasOwnProperty(blockTypeWithoutNameSpace)) {
      // TODO: point to the right JSON once we consume the right flow-runner version, then delete tmp file
      state.validators[blockTypeWithoutNameSpace] = createDefaultJsonSchemaValidatorFactoryFor(require(`../../../_tmp/${blockJsonSchemaFile}`))
    }
    const validate = state.validators[blockTypeWithoutNameSpace]
    const index = `block/${blockId}/`
    state.validationStatuses[index] = {
      isValid: validate(block),
      ajvErrors: validate.errors,
    }

    commit('flatValidationStatuses', {
      keyPrefix: index,
      errors: validate.errors
    })

    debugValidationStatus(state.validationStatuses[index], `validation status for ${index}`)
    return state.validationStatuses[index]
  },

  async validate_flow({ state, commit }, { flow } : { flow: IFlow }): Promise<IValidationStatus> {
    const validationType = 'flow'
    if (isEmpty(state.validators) || !state.validators.hasOwnProperty(validationType)) {
      // TODO: point to the right JSON once we consume the right flow-runner version, then delete tmp file
      state.validators[validationType] = createDefaultJsonSchemaValidatorFactoryFor(require('../../../_tmp/flowSpecJsonSchema.json'), '#/definitions/IFlow')
    }
    const validate = state.validators[validationType]

    const index = `flow/${flow.uuid}/`
    state.validationStatuses[index] = {
      isValid: validate(flow),
      ajvErrors: validate.errors,
    }

    commit('flatValidationStatuses', {
      keyPrefix: index,
      errors: validate.errors
    })

    debugValidationStatus(state.validationStatuses[index], `flow validation status`)
    return state.validationStatuses[index]
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
  if (status) {
    console.debug(
      customMessage,
      ' | isValid:', status.isValid,
      ' | error message:', `${status.hasOwnProperty('ajvErrors') && !!status.ajvErrors! ? (status.ajvErrors!).map(item => get(item, 'message', 'undefined')).join(';') : 'undefined'}`,
      ' | error details:', status
    )
  } else {
    console.debug('the status in debugValidationStatus was undefined')
  }
}
