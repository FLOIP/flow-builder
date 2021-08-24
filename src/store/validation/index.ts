import Vue from 'vue'
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import Ajv, {ErrorObject, ValidateFunction} from 'ajv'
import ajvFormat from 'ajv-formats'

import {JSONSchema7} from 'json-schema'
import {IBlock, IContainer, IFlow, getFlowStructureErrors} from '@floip/flow-runner'
import {forIn, get, isEmpty} from 'lodash'

const ajv = new Ajv({allErrors: true})

// we need this to use AJV format such as 'date-time' (https://json-schema.org/draft/2019-09/json-schema-validation.html#rfc.section.7)
ajvFormat(ajv)

const DEV_ERROR_KEYWORDS = [
  // unwanted extra props
  'additionalProperties',
  // missing props
  'required',
]
// AJV validators, keys are types
const validators = new Map<string, ValidateFunction>()

export interface IIndexedString {
  [key: string]: string,
}

export interface IValidationStatus {
  isValid: boolean | PromiseLike<any>,
  ajvErrors?: null | Array<ErrorObject>,
  type: string,
}

export interface IValidationState {
  // important context for future debug or testing, keys are index like `flow/flowId
  validationStatuses: { [key: string]: IValidationStatus },
}

export const stateFactory = (): IValidationState => ({
  validationStatuses: {} as { [key: string]: IValidationStatus },
})

export const getters: GetterTree<IValidationState, IRootState> = {
  validationStatusForMessageKey: (state) => (messageKey: string): ErrorObject | null => {
    let ajvErrorForMessageKey = null
    forIn(state.validationStatuses, (validationStatus: IValidationStatus, index: string) => {
      if (messageKey.includes(index)) {
        const ajvErrors = validationStatus.ajvErrors
        ajvErrors?.forEach((error: ErrorObject) => {
          if (messageKey.includes(error.dataPath)) {
            ajvErrorForMessageKey = error
          }
        })
      }
    })
    return ajvErrorForMessageKey
  },
}

export const mutations: MutationTree<IValidationState> = {
  removeValidationStatusesFor(state, {key}) {
    delete state.validationStatuses[key]
  },
}

export const actions: ActionTree<IValidationState, IRootState> = {
  async validate_block({state, commit, rootGetters}, {block}: {block: IBlock}): Promise<IValidationStatus> {
    const {uuid: blockId, type: blockType} = block
    const blockTypeWithoutNameSpace = blockType.split('.')[blockType.split('.').length - 1]
    const validate = getOrCreateBlockValidatorFor(blockTypeWithoutNameSpace, rootGetters['flow/activeFlowContainer'].specification_version)
    const key = `block/${blockId}`

    Vue.set(state.validationStatuses, key, {
      isValid: validate(block),
      ajvErrors: validate.errors,
      type: block.type,
    })
    if (validate.errors === null) {
      commit('removeValidationStatusesFor', {key})
    }
    debugValidationStatus(state.validationStatuses[key], `validation status for ${key}`)
    return state.validationStatuses[key]
  },

  async validate_flow({state, rootGetters}, {flow}: {flow: IFlow}): Promise<IValidationStatus> {
    const validate = getOrCreateFlowValidator(rootGetters['flow/activeFlowContainer'].specification_version)
    const key = `flow/${flow.uuid}`
    Vue.set(state.validationStatuses, key, {
      isValid: validate(flow),
      ajvErrors: validate.errors,
      type: 'flow',
    })

    debugValidationStatus(state.validationStatuses[key], 'flow validation status')
    return state.validationStatuses[key]
  },

  async validate_flowContainer({state}, {flowContainer}: { flowContainer: IContainer }): Promise<IValidationStatus> {
    const key = `flowContainer/${flowContainer.uuid}`
    const errors = getFlowStructureErrors(flowContainer, false)
    Vue.set(state.validationStatuses, key, {
      isValid: !errors,
      ajvErrors: errors,
    })

    debugValidationStatus(state.validationStatuses[key], 'flow container validation status')
    return state.validationStatuses[key]
  },
}

export const store: Module<IValidationState, IRootState> = {
  namespaced: true,
  state: stateFactory,
  getters,
  mutations,
  actions,
}

export default store

function getOrCreateBlockValidatorFor(blockType: string, schemaVersion: string): ValidateFunction {
  if (isEmpty(validators) || !validators.has(blockType)) {
    const blockJsonSchema = require(`@floip/flow-runner/dist/resources/validationSchema/${schemaVersion}/I${blockType}Block.json`)
    validators.set(blockType, createDefaultJsonSchemaValidatorFactoryFor(blockJsonSchema))
  }
  return validators.get(blockType)!
}

function getOrCreateFlowValidator(schemaVersion: string): ValidateFunction {
  const validationType = 'flow'
  if (isEmpty(validators) || !validators.has(validationType)) {
    const flowJsonSchema = require(`@floip/flow-runner/dist/resources/validationSchema/${schemaVersion}/flowSpecJsonSchema.json`)

    // remove `blocks` property from IFlow schema to avoid double validations
    flowJsonSchema.definitions.IFlow.additionalProperties = true
    delete flowJsonSchema.definitions.IFlow.properties.blocks

    validators.set(validationType, createDefaultJsonSchemaValidatorFactoryFor(flowJsonSchema, '#/definitions/IFlow'))
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
export function createDefaultJsonSchemaValidatorFactoryFor(jsonSchema: JSONSchema7, subSchema = ''): ValidateFunction {
  if (subSchema === '') {
    return ajv.compile(jsonSchema)
  }
  let validate = ajv.getSchema(subSchema)
  if (!validate) {
    ajv.addSchema(jsonSchema)
    validate = ajv.getSchema(subSchema)
  }
  if (!validate) {
    throw new Error(`Cannot find definition ${subSchema} in schema ${jsonSchema}`)
  }
  return validate as ValidateFunction
}

function debugValidationStatus(status: IValidationStatus, customMessage: string) {
  if (status != null) {
    console.debug(
      'store/validation:',
      customMessage,
      ' | isValid:',
      status.isValid,
      ' | error dataPaths:',
      `${Object.prototype.hasOwnProperty.call(status, 'ajvErrors') && status.ajvErrors ? (status.ajvErrors).map((item) => get(
        item,
        'dataPath',
        'undefined',
      )).join(';') : 'undefined'}`,
      ' | error messages:',
      `${Object.prototype.hasOwnProperty.call(status, 'ajvErrors') && status.ajvErrors ? (status.ajvErrors).map((item) => get(
        item,
        'message',
        'undefined',
      )).join(';') : 'undefined'}`,
      ' | error details:',
      status,
    )
  } else {
    console.debug('store/validation:', 'the status in debugValidationStatus was undefined')
  }
}
