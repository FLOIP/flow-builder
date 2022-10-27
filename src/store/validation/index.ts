import Vue from 'vue'
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {ErrorObject} from 'ajv'
import {
  IBlock,
  IContainer,
  IFlow,
  ILanguage,
  IResource,
  SupportedContentType,
  SupportedMode,

} from '@floip/flow-runner'
import {cloneDeep, each, filter, get, forIn, includes, intersection, isEmpty, map, uniqBy} from 'lodash'
import {
  debugValidationStatus,
  flatValidationStatuses,
  getLocalizedAjvErrors,
  getLocalizedBackendErrors,
  getOrCreateContainerImportValidator,
  getOrCreateFlowValidator,
  getOrCreateLanguageValidator,
  getOrCreateResourceValidator,
} from '@/store/validation/validationHelpers'

export interface IIndexedString {
  [key: string]: string,
}

export interface IValidationStatusContext {
  resourceUuid?: string,
  isOrphanResource?: boolean,
}

export interface IValidationStatus {
  isValid: boolean | PromiseLike<any>,
  ajvErrors?: null | Array<ErrorObject>,
  type: string,
  label?: string,
  context?: IValidationStatusContext,
}

export interface IValidationState {
  // important context for future debug or testing, keys are index like `flow/flowId
  validationStatuses: { [key: string]: IValidationStatus },
}

export const stateFactory = (): IValidationState => ({
  validationStatuses: {} as { [key: string]: IValidationStatus },
})

export const validationGetters: GetterTree<IValidationState, IRootState> = {
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
   * And we do not consider validation errors from orphan resources
   */
  flattenErrorMessages(state): IIndexedString {
    const accumulator: IIndexedString = {}
    forIn(state.validationStatuses, (validationStatus: IValidationStatus, index: string) => {
      if (validationStatus.context?.isOrphanResource === undefined || validationStatus.context?.isOrphanResource !== true) {
        flatValidationStatuses({
          keyPrefix: index,
          errors: validationStatus.ajvErrors,
          accumulator,
        })
      }
    })
    return accumulator
  },

  choiceMimeType() {
    return 'text/plain;choice=true'
  },
}

export const validationMutations: MutationTree<IValidationState> = {
  removeValidationStatusesFor(state, {key}: {key: string}) {
    Vue.delete(state.validationStatuses, key)
  },
  resetValidationStatuses(state, {key}): void {
    Vue.set(state.validationStatuses, key, {ajvErrors: undefined})
    Vue.set(state.validationStatuses[key], 'ajvErrors', [])
  },
  pushAjvErrorToValidationStatuses(state, {key, ajvError}): void {
    if (state.validationStatuses[key]?.ajvErrors == null) {
      Vue.set(state.validationStatuses, key, {ajvErrors: undefined})
      Vue.set(state.validationStatuses[key], 'ajvErrors', [])
    }
    state.validationStatuses[key]!.ajvErrors!.push(ajvError)
  },
}

export const validationActions: ActionTree<IValidationState, IRootState> = {
  async validate_block({state, commit, rootGetters, dispatch}, {block}: {block: IBlock}): Promise<IValidationStatus> {
    const schemaVersion = rootGetters['flow/activeFlowContainer'].specification_version
    const status = await dispatch(`flow/${block.type}/validate`, {block, schemaVersion}, {root: true})

    const key = `block/${block.uuid}`
    Vue.set(state.validationStatuses, key, {
      ...status,
      ajvErrors: getLocalizedAjvErrors(key, status.ajvErrors),
    })
    if (status.ajvErrors === null) {
      commit('removeValidationStatusesFor', {key})
    }
    debugValidationStatus(state.validationStatuses[key], `validation status for ${key}`)
    return state.validationStatuses[key]
  },

  /**
   * Validate blocks from backend SAVE action.
   */
  async validate_allBlocksFromBackend({dispatch}): Promise<void> {
    await dispatch('validate_fromBackend', {type: 'block'})
    await dispatch('validate_fromBackend', {type: 'resource'})
  },

  /**
   * Validate block/resource form backend, pick info from active flow's vendor_metadata:
   * floip: {
   *   ui_metadata:{
   *      validation_results: {
   *        blocks: {
   *          [`${block.uuid}`]: [{ message: 'validation error #1 from backend' },{ message: 'validation error #2 from backend' },]
   *        }
   *        resources: {
   *         [`${resource.uuid}`]: [{ message: 'validation error #1 from backend' },{ message: 'validation error #2 from backend' },]
   *        }
   *      }
   *   }
   * }
   */
  async validate_fromBackend({state, rootGetters, commit}, {type}: {type: 'block' | 'resource'}): Promise<void> {
    // Clean previous backend validation first
    Object.keys(state.validationStatuses).forEach((key: string) => {
      if (key.startsWith(`backend/${type}`)) {
        commit('removeValidationStatusesFor', {key})
      }
    })

    // New validations
    const backendErrorsList = get(
    rootGetters['flow/activeFlow']?.vendor_metadata?.floip?.ui_metadata?.validation_results,
      `${type}s`,
      {},
    ) as Record<string, {message: string}[]>

    const orphanResourceUuids: IBlock['uuid'][] = rootGetters['flow/orphanResourceUuidsOnActiveFlow'] as IBlock['uuid'][]
    Object.keys(backendErrorsList).forEach((currentUuid) => {
      const key = `backend/${type}/${currentUuid}`
      const currentErrors = backendErrorsList[currentUuid]
      const uniqueErrors = uniqBy(currentErrors, 'message') as { message: string }[]

      Vue.set(state.validationStatuses, key, {
        isValid: uniqueErrors === undefined || uniqueErrors.length === 0,
        ajvErrors: getLocalizedBackendErrors(key, uniqueErrors),
        context: {
          isOrphanResource: orphanResourceUuids.includes(currentUuid),
        },
      })

      debugValidationStatus(state.validationStatuses[key], `${type} validation based on backend action`)
    })
  },

  /**
   * Validate all existing blocks in current flow
   * This is useful when the flow has changed, and may affect blocks' validation
   */
  async validate_allBlocksWithinFlow({rootGetters, dispatch}): Promise<void> {
    await Promise.all(
      rootGetters['flow/activeFlow'].blocks.map(async (currentBlock: IBlock) => {
        await dispatch('validate_block', {block: currentBlock})
      }),
    )
  },

  async validate_flow({state, rootGetters}, {flow}: {flow: IFlow}): Promise<IValidationStatus> {
    const validate = getOrCreateFlowValidator(rootGetters['flow/activeFlowContainer'].specification_version)
    const key = `flow/${flow.uuid}`

    Vue.set(state.validationStatuses, key, {
      isValid: validate(flow),
      ajvErrors: getLocalizedAjvErrors(key, validate.errors),
      type: 'flow',
    })

    debugValidationStatus(state.validationStatuses[key], 'flow validation status')
    return state.validationStatuses[key]
  },

  /**
   * Validate the whole container for import purpose, including all contents like: flows, blocks, etc
   * Assuming the provided container is a valid JSON
   */
  async validate_containerImport({state, commit, dispatch, rootGetters}, {flowContainer}: { flowContainer: IContainer }): Promise<IValidationStatus> {
    // We do not add the uuid in key as it's hard coded in flow state for now
    const key = 'container_import'

    // At this stage we assume the container has the specification_version
    const validate = getOrCreateContainerImportValidator(rootGetters['flow/activeFlowContainer'].specification_version)
    Vue.set(state.validationStatuses, key, {
      isValid: validate(flowContainer),
      ajvErrors: getLocalizedAjvErrors(key, validate.errors),
      type: 'container_import',
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

  async validate_resource({state, rootGetters}, {resource}: {resource: IResource}): Promise<IValidationStatus> {
    const validate = getOrCreateResourceValidator(rootGetters['flow/activeFlowContainer'].specification_version)
    const key = `resource/${resource.uuid}`

    const isValid = validate(resource)

    if (validate.errors) {
      for (let i = 0; i < validate.errors.length; i += 1) {
        const {keyword, dataPath} = validate.errors[i]

        if (keyword === 'pattern') {
          const index = /^\/values\/(?<index>\d+)/.exec(dataPath)?.groups?.index
          const {content_type: contentType} = resource.values[Number(index)]

          if (contentType === 'AUDIO') {
            validate.errors[i].keyword = 'pattern-ivr'
          }
        }
      }
    }

    const orphanResourceUuids: IBlock['uuid'][] = rootGetters['flow/orphanResourceUuidsOnActiveFlow'] as IBlock['uuid'][]
    Vue.set(state.validationStatuses, key, {
      isValid,
      ajvErrors: getLocalizedAjvErrors(key, validate.errors),
      type: 'resource',
      context: {
        isOrphanResource: orphanResourceUuids.includes(resource.uuid),
      },
    })

    debugValidationStatus(state.validationStatuses[key], 'resource validation status')
    return state.validationStatuses[key]
  },

  /**
   * Resources may have unsupported values, so we should only validate:
   * - values which correspond to supported modes (provided by user)
   * - values which correspond to supported content type: ['TEXT', 'AUDIO'] (hard coded in UI, see ResourceEditor component)
   * - values which correspond to supported languages
   *
   */
  async validate_resourcesOnSupportedValues(
    {dispatch, getters},
    {resources, supportedModes, supportedLanguages}: {resources: IResource[], supportedModes: SupportedMode[], supportedLanguages: ILanguage[]},
  ): Promise<void> {
    if (!resources) {
      return
    }

    const resourcesWithSupportedValues = map(resources, (resource: IResource) => {
      const resourceWithNewValues = cloneDeep(resource)
      // only get values having supported modes and values which content type is supported by the UI
      resourceWithNewValues.values = filter(
        resource.values,
        (v) => {
          const hasSupportedLang = includes(map(supportedLanguages, 'id'), v.language_id)
          const isChoiceResource = v.mime_type === getters.choiceMimeType
          const hasSupportedMode = !isEmpty(intersection(supportedModes, v.modes))
          const hasContentType = includes([SupportedContentType.TEXT, SupportedContentType.AUDIO], v.content_type)

          return isChoiceResource || (hasSupportedLang && hasSupportedMode && hasContentType)
        },
      )

      return resourceWithNewValues
    })

    await Promise.all(
      each(resourcesWithSupportedValues, async (currentResource) => {
        await dispatch('validate_resource', {resource: currentResource})
      }),
    )
  },

  resetValidationStatuses({commit}, {key}: {key: string}): void {
    commit('resetValidationStatuses', {key})
  },
}

export const validationStore: Module<IValidationState, IRootState> = {
  namespaced: true,
  state: stateFactory,
  getters: validationGetters,
  mutations: validationMutations,
  actions: validationActions,
}

export default validationStore
export * from './validationHelpers'
