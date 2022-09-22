import {ILanguage} from '@floip/flow-runner/dist/flow-spec/ILanguage'
import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlock, IContainer, IContext} from '@floip/flow-runner'
import {cloneDeep, difference, differenceWith, find, findIndex, get, isEmpty, isEqual, join, keys, reject, set, uniq} from 'lodash'
import {ErrorObject} from 'ajv'
import Lang from '@/lib/filters/lang'
import {IContactPropertyMultipleChoice} from '../block-types/Core_SetContactPropertyStore.model'
import {IGroupOption} from '../block-types/Core_SetGroupMembershipStore'
import {
  checkSingleFlowOnly,
  detectedGroupChanges,
  detectedLanguageChanges,
  detectedPropertyChanges,
  getGroupBlocks,
  getPropertyBlocks,
  updateResourcesForLanguageMatch,
} from '../utils/importHelpers'

// AJV keywords considered as important errors which should block an import
const TRUE_AJV_ERROR_KEY_WORDS = ['required', 'additionalProperties', 'minItems', 'error', 'backend_error']
// AJV dataPath part considered as important errors which should block an import
const TRUE_AJV_ERROR_DATA_PATH_PART = [
  // scenario eg.: `keyword = 'pattern', dataPath = 'flow/0/uuid'`
  'uuid',
]

export const getters: GetterTree<IImportState, IRootState> = {
  flowSpecVersion: (state) => state.flowSpecVersion,
  hasSomethingToImport: (state) => !isEmpty(state.flowJsonText),
  languagesMissing: (state) => !isEmpty(state.missingLanguages),
  propertiesMissing: (state) => !isEmpty(state.missingProperties),
  groupsMissing: (state) => !isEmpty(state.missingGroups),
  isSafeToImport: (state, getters) => Array.isArray(getters.containerImportValidationTrueErrors)
    && getters.containerImportValidationTrueErrors.length === 0
    && getters.languagesMissing === false
    && getters.propertiesMissing === false
    && getters.groupsMissing === false,
  hasWarnings: (state, getters) => getters.containerImportValidationWarningErrors !== undefined
    && getters.containerImportValidationWarningErrors.length > 0,
  containerImportValidationTrueErrors: (state, getters) => getters.containerImportValidationErrors?.filter(
    (ajvError: ErrorObject) => TRUE_AJV_ERROR_KEY_WORDS.includes(ajvError.keyword)
      || TRUE_AJV_ERROR_DATA_PATH_PART.some((pathPart) => ajvError.dataPath.includes(pathPart)),
  ),
  containerImportValidationWarningErrors: (state, getters) => getters.containerImportValidationErrors?.filter(
    (ajvError: ErrorObject) => !TRUE_AJV_ERROR_KEY_WORDS.includes(ajvError.keyword)
      && !TRUE_AJV_ERROR_DATA_PATH_PART.some((pathPart) => ajvError.dataPath.includes(pathPart)),
    ),
  containerImportValidationErrors: (state, getters, rootState) => rootState['validation'].validationStatuses?.container_import?.ajvErrors ?? [],
}

export const mutations: MutationTree<IImportState> = {
  setUpdating(state, updatingStatus) {
    state.updating = updatingStatus
  },
  baseReset(state) {
    state.flowContainer = null
    state.flowJsonText = ''
    state.flowSpecVersion = undefined
    state.propertyBlocks = []
    state.groupBlocks = []
  },
  resetLanguageMatching(state) {
    state.matchingLanguages = []
    state.missingLanguages = []
    state.existingLanguagesWithoutMatch = []
  },
  resetPropertyMatching(state) {
    state.matchingLanguages = []
    state.blocksMissingProperties = {}
    state.missingProperties = []
    state.existingPropertiesWithoutMatch = []
  },
  resetGroupMatching(state) {
    state.matchingGroups = []
    state.blocksMissingGroups = {}
    state.missingGroups = []
    state.existingGroupsWithoutMatch = []
  },
  addMissingLanguage(state, language) {
    state.missingLanguages.push(language)
  },
  setMissingLanguages(state, languages) {
    state.missingLanguages = languages
  },
  setMatchingLanguages(state, languages) {
    state.matchingLanguages = languages
  },
  setExistingLanguagesWithoutMatch(state, languages) {
    state.existingLanguagesWithoutMatch = languages
  },
  /**
   * Set languages for the 1st flow
   * Imports can only contain 01 flow.
   * @param state
   * @param languages
   */
  setImportedFlowLanguages(state, languages) {
    if (state.flowContainer) {
      state.flowContainer.flows[0].languages = languages
    } else {
      throw new Error('flowContainer is not set')
    }
  },
  /**
   * Set resources for the 1st flow
   * Imports can only contain 01 flow.
   * @param state
   * @param resources
   */
  setImportedFlowResources(state, resources) {
    if (state.flowContainer) {
      state.flowContainer.flows[0].resources = resources
    } else {
      throw new Error('flowContainer is not set')
    }
  },
  addFlowLanguage(state, language) {
    if (state.flowContainer) {
      state.flowContainer.flows[0].languages.push(language)
    } else {
      throw new Error('flowContainer is not set')
    }
  },
  setFlowJsonText(state, text) {
    state.flowJsonText = text
  },
  setFlowContainer(state, flowContainer) {
    state.flowContainer = flowContainer
  },
  setFlowContainerBlocks(state, blocks) {
    if (state.flowContainer) {
      set(state.flowContainer, 'flows[0].blocks', blocks)
    }
  },
  setFlowSpecVersion(state, version) {
    state.flowSpecVersion = version
  },
  setGroupBlocks(state, groupBlocks) {
    state.groupBlocks = groupBlocks
  },
  setPropertyBlocks(state, propertyBlocks) {
    state.propertyBlocks = propertyBlocks
  },
  setBlocksMissingProperties(state, blocksMissingProperties) {
    state.blocksMissingProperties = blocksMissingProperties
  },
  setMissingProperties(state, missingProperties) {
    state.missingProperties = missingProperties
  },
  setMatchingProperties(state, matchingProperties) {
    state.matchingProperties = matchingProperties
  },
  setExistingPropertiesWithoutMatch(state, existingPropertiesWithoutMatch) {
    state.existingPropertiesWithoutMatch = existingPropertiesWithoutMatch
  },
  setBlocksMissingGroups(state, blocksMissingGroups) {
    state.blocksMissingGroups = blocksMissingGroups
  },
  setMissingGroups(state, missingGroups) {
    state.missingGroups = missingGroups
  },
  setMatchingGroups(state, matchingGroups) {
    state.matchingGroups = matchingGroups
  },
  setExistingGroupsWithoutMatch(state, existingGroupsWithoutMatch) {
    state.existingGroupsWithoutMatch = existingGroupsWithoutMatch
  },
}

export const actions: ActionTree<IImportState, IRootState> = {
  async setFlowJson({commit, state, getters, dispatch}, value: string) {
    commit('validation/resetValidationStatuses', {key: 'container_import'}, {root: true})
    commit('setFlowJsonText', value)
    let flowContainer
    try {
      // check valid json
      flowContainer = JSON.parse(state.flowJsonText)
    } catch (e) {
      commit('resetLanguageMatching')
      commit('resetPropertyMatching')
      commit('resetGroupMatching')
    }

    const hasProgrammaticError = await dispatch('validate_containerImportWithProgrammaticLogic', {
      key: 'container_import',
      flowContainer,
    })
    if (hasProgrammaticError === false) {
      return
    } else {
      const validationErrors = await dispatch('validation/validate_containerImport', {flowContainer}, {root: true})

      if (flowContainer !== undefined) {
        commit('setFlowSpecVersion', flowContainer?.specification_version)
      }
    }

    if (getters.isSafeToImport === false) {
      return
    }

    //We know it's valid JSON at least. Let's display it correctly formatted
    commit('setFlowJsonText', JSON.stringify(flowContainer, null, 2))

    // Try to fix the imported container
    const oldFlowContainer = cloneDeep(state.flowContainer)
    const newFlowContainer = cloneDeep(flowContainer)
    commit('setFlowContainer', flowContainer)

    if (detectedLanguageChanges({flowContainer: newFlowContainer, oldFlowContainer})) {
      await dispatch('tryToFixLanguages', state.flowContainer)
    }
    // matching on "property_key" == "name" in builder.config.json
    const newPropertyBlocks = getPropertyBlocks(flowContainer)
    if (detectedPropertyChanges({newPropertyBlocks, oldPropertyBlocks: state.propertyBlocks})) {
      commit('setPropertyBlocks', newPropertyBlocks)
      await dispatch('tryToFixProperties', state.propertyBlocks)
    }
    // matching on "group_key" == "id" in builder.config.json
    const newGroupBlocks = getGroupBlocks(flowContainer)
    if (detectedGroupChanges({newGroupBlocks, oldGroupBlocks: state.groupBlocks})) {
      commit('setGroupBlocks', newGroupBlocks)
      await dispatch('tryToFixGroups', state.groupBlocks)
    }
    commit('setFlowJsonText', JSON.stringify(state.flowContainer, null, 2))
  },
  async validate_containerImportWithProgrammaticLogic(
    {state, commit, getters, rootState, rootGetters},
    {key, flowContainer}: { key: string, flowContainer: IContainer },
  ): Promise<Boolean> {
    const dataPath = '/container'
    // we provide a keyword 'error' in ajvError to tell our error handler this should not be ignored (not like `pattern` keyword)
    const keyword = 'error'
    if (flowContainer === undefined) {
      commit('validation/pushAjvErrorToValidationStatuses', {
        key,
        ajvError: {dataPath, keyword, message: Lang.trans('flow-builder-validation.invalid-json-provided')} as ErrorObject,
      }, {root: true})
      return false
    } else {
      let isValid = true
      // We have a valid json file
      if (flowContainer.flows === undefined || flowContainer.flows?.length === 0) {
        commit('validation/pushAjvErrorToValidationStatuses', {
          key,
          ajvError: {dataPath, keyword, message: Lang.trans('flow-builder-validation.container-flow-is-empty')} as ErrorObject,
        }, {root: true})
        isValid = false
      }

      if (flowContainer.flows?.length > 1) {
        commit('validation/pushAjvErrorToValidationStatuses', {
          key,
          ajvError: {
            dataPath,
            keyword,
            message: Lang.trans('flow-builder-validation.importer-currently-supports-single-flow-only'),
          } as ErrorObject,
        }, {root: true})
        isValid = false
      }

      const supportedSpecVersions = rootGetters?.supportedFlowSpecVersionsForImport
      if (supportedSpecVersions === undefined
        || !Array.isArray(supportedSpecVersions)
        || (Array.isArray(supportedSpecVersions) && supportedSpecVersions.length === 0)) {
        throw new Error('Please set the supportedFlowSpecVersionsForImport in flow config')
      }

      if (supportedSpecVersions.includes(flowContainer.specification_version) === false) {
        commit('validation/pushAjvErrorToValidationStatuses', {
          key,
          ajvError: {
            dataPath,
            keyword,
            message: `${Lang.trans('flow-builder-validation.non-supported-spec-version')}: ${flowContainer.specification_version}`,
          } as ErrorObject,
        }, {root: true})
        isValid = false
      }

      const uploadedBlockTypes = uniq(get(flowContainer, 'flows[0].blocks', []).map((block: IBlock) => block.type))
      const unsupportedBlockClasses = difference(uploadedBlockTypes, rootGetters.blockClasses)
      if (!isEmpty(unsupportedBlockClasses) === true) {
        const unsupportedBlockClassesList = join(unsupportedBlockClasses, ', ')
        commit('validation/pushAjvErrorToValidationStatuses', {
          key,
          ajvError: {
            dataPath,
            keyword,
            message: `${Lang.trans('flow-builder-validation.unsupported-blocks-detected')}: ${unsupportedBlockClassesList}`,
          } as ErrorObject,
        }, {root: true})
        isValid = false
      }
      return isValid
    }
    return true
  },
  async tryToFixLanguages({state, commit, rootGetters}, flowContainer: IContext) {
    const uploadLanguages: ILanguage[] = get(flowContainer, 'flows[0].languages', [])
    const matchingLanguages: ILanguage[] = []
    if (uploadLanguages) {
      uploadLanguages.forEach((language) => {
        const matchingLanguage = find(rootGetters.languages, (orgLanguage) => isEqual(orgLanguage, language))
        if (!matchingLanguage) {
          // Unlike the others we don't reset this.
          // A previously unmatched language can only be fixed by updating or adding a language
          commit('addMissingLanguage', language)
        } else {
          matchingLanguages.push(language)
        }
      })
      commit('setMatchingLanguages', matchingLanguages)
      // Update the languages so we use the org settings for things like id and orgId
      commit('setImportedFlowLanguages', state.matchingLanguages)
      commit('setExistingLanguagesWithoutMatch', differenceWith(rootGetters.languages, state.matchingLanguages, isEqual))
    }
  },
  async tryToFixProperties({rootGetters, state, commit}, newPropertyBlocks: IBlock[]) {
    const matchingProperties: IContactPropertyMultipleChoice[] = []
    const blocksMissingProperties = cloneDeep(state.blocksMissingProperties)
    newPropertyBlocks.forEach((propertyBlock) => {
      const propertyIdentifier = get(propertyBlock, 'config.set_contact_property.property_key')
      if (propertyIdentifier) {
        const matchingProperty = find(rootGetters.subscriberPropertyFields, (orgProperty) => isEqual(orgProperty.name, propertyIdentifier))
        if (!matchingProperty) {
          // Unlike the others we don't reset this.
          // A previously unmatched property can only be fixed by updating or adding a language
          //
          // Name is all we can get when there isn't a match
          // ...as the block sidebar gets the actual displayLabel by matching
          if (!get(blocksMissingProperties, propertyIdentifier)) {
            blocksMissingProperties[propertyIdentifier] = []
          }
          blocksMissingProperties[propertyIdentifier].push(propertyBlock.uuid)
        } else {
          matchingProperties.push(matchingProperty)
        }
      }
    })
    commit('setBlocksMissingProperties', blocksMissingProperties)

    commit(
      'setMissingProperties',
      keys(state.blocksMissingProperties).map((propertyIdentifier) => ({
        name: propertyIdentifier,
        blockIds: state.blocksMissingProperties[propertyIdentifier],
      })),
    )
    commit('setMatchingProperties', matchingProperties)
    // Update the languages so we use the org settings for things like id and orgId
    commit('setExistingPropertiesWithoutMatch', differenceWith(rootGetters.subscriberPropertyFields, state.matchingProperties, isEqual))
  },

  async tryToFixGroups({rootGetters, state, commit}, newGroupBlocks: IBlock[]) {
    const matchingGroups: IGroupOption[] = []
    const blocksMissingGroups = cloneDeep(state.blocksMissingGroups)
    newGroupBlocks.forEach((groupBlock) => {
      const groupIdentifier = get(groupBlock, 'config.group_key')
      const groupName = get(groupBlock, 'config.group_name')
      if (groupIdentifier) {
        const matchingGroup = find(rootGetters.groups, (orgGroup) => (isEqual(orgGroup.id, groupIdentifier)
          && isEqual(orgGroup.name, groupName)))
        if (!matchingGroup) {
          // Unlike the others we don't reset this.
          // A previously unmatched group can only be fixed by updating or adding a language
          if (!get(blocksMissingGroups, groupIdentifier)) {
            blocksMissingGroups[groupIdentifier] = {group_name: groupName, blockIds: []}
          }
          blocksMissingGroups[groupIdentifier].blockIds.push(groupBlock.uuid)
        } else {
          matchingGroups.push(matchingGroup)
        }
      }
    })
    commit('setBlocksMissingGroups', blocksMissingGroups)

    commit(
      'setMissingGroups',
      keys(state.blocksMissingGroups).map((groupIdentifier) => ({id: groupIdentifier, ...state.blocksMissingGroups[groupIdentifier]})),
    )
    commit('setMatchingGroups', matchingGroups)
    // Update the languages so we use the org settings for things like id and orgId
    commit('setExistingGroupsWithoutMatch', differenceWith(rootGetters.groups, state.matchingGroups, isEqual))
  },
  matchLanguage({commit, state, dispatch}, {oldLanguage, matchingNewLanguage}) {
    commit('addFlowLanguage', matchingNewLanguage)
    commit(
      'setImportedFlowResources',
      updateResourcesForLanguageMatch(get(state.flowContainer, 'flows.0.resources', []), oldLanguage.id, matchingNewLanguage.id),
    )
    commit('setFlowJsonText', JSON.stringify(state.flowContainer, null, 2))
    commit('setMissingLanguages', reject(state.missingLanguages, (language) => isEqual(language, oldLanguage)))
    dispatch('tryToFixLanguages', state.flowContainer)
  },
  matchProperty({commit, state, dispatch}, {oldProperty, matchingNewProperty}) {
    const blocks = cloneDeep(get(state.flowContainer, 'flows[0].blocks'))
    if (!blocks) {
      return
    }
    oldProperty.blockIds.forEach((blockId: string) => {
      const blockIndex = findIndex(blocks, (block: IBlock) => block.uuid === blockId)
      if (blockIndex < 0) {
        return
      }
      set(blocks, `${blockIndex}.config.set_contact_property.property_key`, matchingNewProperty.name)
    })
    commit('setFlowContainerBlocks', blocks)
    commit('setFlowJsonText', JSON.stringify(state.flowContainer, null, 2))
    // missingProperties gets updated again when we validate below
    const newBlocksMissingProperties: { [key: string]: string[] } = {}
    commit('setBlocksMissingProperties', keys(state.blocksMissingProperties).reduce((newBlocksMissingProperties, propertyIdentifier) => {
      if (oldProperty.name !== propertyIdentifier) {
        newBlocksMissingProperties[propertyIdentifier] = state.blocksMissingProperties[propertyIdentifier]
      }
      return newBlocksMissingProperties
    }, newBlocksMissingProperties))
    commit('setPropertyBlocks', getPropertyBlocks(state.flowContainer as IContext))
    dispatch('tryToFixProperties', state.propertyBlocks)
  },
  matchGroup({commit, state, dispatch}, {oldGroup, matchingNewGroup}) {
    const blocks = cloneDeep(get(state.flowContainer, 'flows[0].blocks'))
    if (!blocks) {
      return
    }
    oldGroup.blockIds.forEach((blockId: string) => {
      const blockIndex = findIndex(blocks, (block: IBlock) => block.uuid === blockId)
      if (blockIndex < 0) {
        return
      }
      set(blocks, `${blockIndex}.config.group_key`, matchingNewGroup.id)
      set(blocks, `${blockIndex}.config.group_name`, matchingNewGroup.name)
    })
    commit('setFlowContainerBlocks', blocks)
    commit('setFlowJsonText', JSON.stringify(state.flowContainer, null, 2))
    // missingGroups gets updated again when we validate below
    const newBlocksMissingGroups: { [key: string]: { group_name: string, blockIds: string[] } } = {}
    commit('setBlocksMissingGroups', keys(state.blocksMissingGroups).reduce((newBlocksMissingGroups, groupIdentifier) => {
      if (oldGroup.id !== groupIdentifier) {
        newBlocksMissingGroups[groupIdentifier] = state.blocksMissingGroups[groupIdentifier]
      }
      return newBlocksMissingGroups
    }, newBlocksMissingGroups))
    commit('setGroupBlocks', getGroupBlocks(state.flowContainer as IContext))
    dispatch('tryToFixGroups', state.groupBlocks)
  },
}

export interface IImportState {
  matchingLanguages: ILanguage[],
  missingLanguages: ILanguage[],
  existingLanguagesWithoutMatch: ILanguage[],
  blocksMissingProperties: { [key: string]: string[] },
  missingProperties: { name: string, blockIds: string[] }[],
  matchingProperties: IContactPropertyMultipleChoice[],
  existingPropertiesWithoutMatch: IContactPropertyMultipleChoice[],
  blocksMissingGroups: { [key: string]: { group_name: string, blockIds: string[] } },
  missingGroups: { id: string, group_name: string, blockIds: string[] }[],
  matchingGroups: IGroupOption[],
  existingGroupsWithoutMatch: IGroupOption[],
  flowContainer: IContext | null,
  flowJsonText: string,
  flowSpecVersion: string | undefined,
  propertyBlocks: IBlock[],
  groupBlocks: IBlock[],
  updating: boolean,
}

export const stateFactory = (): IImportState => ({
  matchingLanguages: [],
  missingLanguages: [],
  existingLanguagesWithoutMatch: [],
  blocksMissingProperties: {},
  missingProperties: [],
  matchingProperties: [],
  existingPropertiesWithoutMatch: [],
  blocksMissingGroups: {},
  missingGroups: [],
  matchingGroups: [],
  existingGroupsWithoutMatch: [],
  flowContainer: null,
  flowJsonText: '',
  flowSpecVersion: undefined,
  propertyBlocks: [],
  groupBlocks: [],
  updating: false,
})

export default {
  namespaced: true,
  state: stateFactory,
  getters,
  mutations,
  actions,
}
