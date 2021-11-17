import Vue from 'vue'
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {ErrorObject} from 'ajv'
import {IBlock, IContainer, IFlow, ILanguage, getFlowStructureErrors} from '@floip/flow-runner'
import {forIn} from 'lodash'
import {debugValidationStatus, flatValidationStatuses, getOrCreateFlowValidator, getOrCreateLanguageValidator} from '@/store/validation/validationHelpers'

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
  /**
   * Human readable errors, keys are index like `flow/flowId/path/to/prop`
   * check this repo to see more available example: https://github.com/ajv-validator/ajv-i18n/blob/master/messages/index.js
   * eg:
   * {
   *   "flow/1607666a-2216-4a17-b8ba-9eb861d72933/blocks/0/name": "should match pattern \"^[a-zA-Z_]\\w*$\"",
   *   "flow/1607666a-2216-4a17-b8ba-9eb861d72933/languages/0/iso_639_3": "should match pattern \"^[a-z][a-z][a-z]$\"",
   *   "block/a520eb17-49f0-4617-af18-b0d524f921ce#/required": "should have required property 'config', for params {\"missingProperty\":\"config\"}",
   *   "block/a520eb17-49f0-4617-af18-b0d524f921ce/name": "should match pattern \"^[a-zA-Z_]\\w*$\"",
   *   "block/a520eb17-49f0-4617-af18-b0d524f921ce/exits/1/tag": "should match pattern \"^[a-zA-Z_]\\w*$\"",
   *   "block/44663ef4-5e1f-4ead-a8e5-05d6f7d47f0d/name": "should match pattern \"^[a-zA-Z_]\\w*$\""
   * }
   *
   * Note that indexedErrors has more elements than validationStatuses.
   */
  flattenErrorMessages(state): IIndexedString {
    const accumulator: IIndexedString = {}
    forIn(state.validationStatuses, (validationStatus: IValidationStatus, index: string) => {
      flatValidationStatuses({
        keyPrefix: index,
        errors: validationStatus.ajvErrors,
        accumulator,
      })
    })
    return accumulator
  },
}

export const mutations: MutationTree<IValidationState> = {
  removeValidationStatusesFor(state, {key}) {
    delete state.validationStatuses[key]
  },
}

export const actions: ActionTree<IValidationState, IRootState> = {
  async validate_block({state, commit, rootGetters, dispatch}, {block}: {block: IBlock}): Promise<IValidationStatus> {
    const schemaVersion = rootGetters['flow/activeFlowContainer'].specification_version
    const status = await dispatch(`flow/${block.type}/validate`, {block, schemaVersion}, {root: true})

    const key = `block/${block.uuid}`
    Vue.set(state.validationStatuses, key, status)
    if (status.ajvErrors === null) {
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

  async validate_new_language({state, rootGetters}, {language}: { language: ILanguage }): Promise<IValidationStatus> {
    const validate = getOrCreateLanguageValidator(rootGetters['flow/activeFlowContainer'].specification_version)
    const index = 'language/new_language'
    Vue.set(state.validationStatuses, index, {
      isValid: validate(language),
      ajvErrors: validate.errors,
    })

    debugValidationStatus(state.validationStatuses[index], 'language validation status')
    return state.validationStatuses[index]
  },
  validation_removeNewLanguageValidation({state}): void {
    const index = 'language/new_language'
    Vue.delete(state.validationStatuses, index)
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
