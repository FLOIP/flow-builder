import Vue from 'vue'
import {
  ActionTree, GetterTree, Module, MutationTree,
} from 'vuex'
import { IRootState } from '@/store'
import Ajv, { ValidateFunction, ErrorObject } from 'ajv'
import { JSONSchema7 } from 'json-schema'
import { IBlock, IFlow } from '@floip/flow-runner'
import { isEmpty, get, forIn } from 'lodash'

const ajv = new Ajv({ allErrors:true })
const DEV_ERROR_KEYWORDS = [
  'additionalProperties', // unwanted extra props
  'required' // missing props
]

let validators = new Map<string, ValidateFunction>() //AJV validators, keys are types

interface IIndexedString { [key: string]: string }

export interface IValidationStatus {
  isValid: boolean | PromiseLike<any>;
  ajvErrors?: null | Array<ErrorObject>;
}

export interface IValidationState {
  validationStatuses: { [key: string]: IValidationStatus }; //important context for future debug or testing, keys are index like `flow/flowId
}

export const stateFactory = (): IValidationState => ({
  validationStatuses: {} as { [key:string]: IValidationStatus },
})

export const getters: GetterTree<IValidationState, IRootState> = {
  /**
   * Human readable errors, keys are index like `flow/flowId/.path/.to/.prop`.
   * Note that indexedErrors has more elements than validationStatuses.
   */
  flattenErrorMessages(state): IIndexedString {
    let accumulator: IIndexedString = {}
    forIn(state.validationStatuses, function (validationStatus: IValidationStatus, index: string) {
      flatValidationStatuses({
        keyPrefix: index,
        errors: validationStatus.ajvErrors,
        accumulator
      })
    })
    return accumulator
  }
}

export const mutations: MutationTree<IValidationState> = {

}

export const actions: ActionTree<IValidationState, IRootState> = {
  async validate_block({ state, commit }, { block } : { block: IBlock }): Promise<IValidationStatus> {
    const { uuid: blockId, type: blockType } = block
    const blockTypeWithoutNameSpace = blockType.split('.')[blockType.split('.').length - 1]
    const validate = getOrCreateBlockValidatorFor(blockTypeWithoutNameSpace)
    const index = `block/${blockId}/`

    Vue.set(state.validationStatuses, index, {
      isValid: validate(block),
      ajvErrors: validate.errors,
    })

    debugValidationStatus(state.validationStatuses[index], `validation status for ${index}`)
    return state.validationStatuses[index]
  },

  async validate_flow({ state, commit }, { flow } : { flow: IFlow }): Promise<IValidationStatus> {
    const validate = getOrCreateFlowValidator()
    const index = `flow/${flow.uuid}/`
    Vue.set(state.validationStatuses, index, {
      isValid: validate(flow),
      ajvErrors: validate.errors,
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

function getOrCreateBlockValidatorFor(blockType: string): ValidateFunction {
  if (isEmpty(validators) || !validators.has(blockType)) {
    const blockJsonSchemaFile = `I${blockType}Block.json`
    // TODO: point to the right JSON once we consume the right flow-runner version, then delete tmp file
    validators.set(blockType, createDefaultJsonSchemaValidatorFactoryFor(require(`../../../_tmp/${blockJsonSchemaFile}`)))
  }
  return validators.get(blockType)!
}

function getOrCreateFlowValidator(): ValidateFunction {
  const validationType = 'flow'
  if (isEmpty(validators) || !validators.has(validationType)) {
    // TODO: point to the right JSON once we consume the right flow-runner version, then delete tmp file
    validators.set(validationType, createDefaultJsonSchemaValidatorFactoryFor(require('../../../_tmp/flowSpecJsonSchema.json'), '#/definitions/IFlow'))
  }
  return validators.get(validationType)!
}

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
      ' | error dataPaths:', `${status.hasOwnProperty('ajvErrors') && !!status.ajvErrors! ? (status.ajvErrors!).map(item => get(item, 'dataPath', 'undefined')).join(';') : 'undefined'}`,
      ' | error messages:', `${status.hasOwnProperty('ajvErrors') && !!status.ajvErrors! ? (status.ajvErrors!).map(item => get(item, 'message', 'undefined')).join(';') : 'undefined'}`,
      ' | error details:', status
    )
  } else {
    console.debug('the status in debugValidationStatus was undefined')
  }
}

function flatValidationStatuses({ keyPrefix, errors, accumulator }: { keyPrefix: string, errors: undefined | null | Array<ErrorObject>, accumulator: IIndexedString }) {
  errors?.forEach((error, key) => {
    let index = '', message = ''
    if (DEV_ERROR_KEYWORDS.includes(error.keyword)) {
      // this is more likely a dev issue than user error
      // error.dataPath could be empty or not for such errors
      index = `${keyPrefix}${error.schemaPath}`
      message = `${error.message}, for params ${JSON.stringify(error.params)}`
      console.error(`Schema issue found on ${index}: ${message}`)
    } else {
      index = `${keyPrefix}${error.dataPath}`
      message = error.message as string
    }
    accumulator[index] = message as string
  })
}
