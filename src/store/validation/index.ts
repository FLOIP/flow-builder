import {
  ActionTree, GetterTree, Module, MutationTree,
} from 'vuex'
import { IRootState } from '@/store'
import Ajv from 'ajv'
import { JSONSchema7 } from 'json-schema'

const ajv = new Ajv();

export interface IValidationState {

}

export const stateFactory = (): IValidationState => ({

})

export const getters: GetterTree<IValidationState, IRootState> = {

}

export const mutations: MutationTree<IValidationState> = {

}

export const actions: ActionTree<IValidationState, IRootState> = {

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
 * Usage :
 * const validate = createDefaultJsonSchemaValidatorFactoryFor(require('./some-json-schema.json')
 * const data = {
 *   ...
 * }
 * const isValid = validate(data)
 *
 * @param jsonSchema
 */
export function createDefaultJsonSchemaValidatorFactoryFor(jsonSchema: JSONSchema7) {
  return ajv.compile(jsonSchema)
}
