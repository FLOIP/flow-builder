import { ILanguage } from '@floip/flow-runner/dist/flow-spec/ILanguage'
import { IContactPropertyOption } from '../block-types/Core_SetContactPropertyStore'
import { IGroupOption } from '../block-types/Core_SetGroupMembershipStore'

import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { IRootState } from '@/store'
import { IFlowsState } from '../index'
import { IContext, IBlock } from '@floip/flow-runner'

import { 
  updateResourcesForLanguageMatch,
  checkSingleFlowOnly,
  detectedLanguageChanges,
  detectedGroupChanges,
  detectedPropertyChanges,
  getGroupBlocks,
  getPropertyBlocks
} from '../utils/importHelpers'

import { 
  forEach, 
  isEmpty, 
  get,
  set,
  find,
  findIndex,
  pick,
  omit,
  reject,
  uniq,
  keys,
  filter,
  differenceWith,
  difference,
  join,
  isEqual,
  cloneDeep,
  debounce,
} from 'lodash'

export const getters: GetterTree<IImportState, IRootState> = {}

export const mutations: MutationTree<IImportState> = {
  baseReset(state) {
    state.flowContainer = null
    state.flowJsonText = ""
    state.flowError = "" 
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
  setFlowLanguages(state, languages) {
    if(state.flowContainer) {
      state.flowContainer.flows[0].languages = languages
    } else {
      throw("flowContainer is not set")
    }
  },
  setFlowResources(state, resources) {
    if(state.flowContainer) {
      state.flowContainer.resources = resources 
    } else {
      throw("flowContainer is not set")
    }
  },
  addFlowLanguage(state, language) {
    if(state.flowContainer) {
      state.flowContainer.flows[0].languages.push(language)
    } else {
      throw("flowContainer is not set")
    }
  },
  setFlowJsonText(state, text) {
    state.flowJsonText = text
  },
  setFlowContainer(state, flowContainer) {
    state.flowContainer = flowContainer
  },
  setFlowContainerBlocks(state, blocks) {
    if(state.flowContainer) {
      set(state.flowContainer, 'flows[0].blocks', blocks)
    }
  },
  setFlowError(state, text) {
    state.flowError = text
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
  async setFlowJson({commit, state, dispatch}, value: string) {
    commit('setFlowError', "")
    commit('setFlowJsonText', value)
    let flowContainer
    try {
      //check valid json
      flowContainer = JSON.parse(state.flowJsonText)
    } catch (e) {
      commit('resetLanguageMatching')
      commit('resetPropertyMatching')
      commit('resetGroupMatching')
      commit('setFlowError', "flow-builder.invalid-json-provided")
      return
    }
    //await dispatch('checkIfValidFlow'. flowContainer) //TODO - waiting for validation work
    if(!checkSingleFlowOnly(flowContainer)) {
      commit('setFlowError', 'flow-builder.importer-currently-supports-single-flow-only')
      return
    }
    const oldFlowContainer = cloneDeep(state.flowContainer)
    const newFlowContainer = cloneDeep(flowContainer)
    commit('setFlowContainer', flowContainer)

    if(detectedLanguageChanges({ flowContainer: newFlowContainer, oldFlowContainer })) {
      await dispatch('validateLanguages', state.flowContainer)
    }
    //matching on "property_key" == "name" in builder.config.json
    const newPropertyBlocks = getPropertyBlocks(flowContainer)
    if(detectedPropertyChanges({ newPropertyBlocks, oldPropertyBlocks: state.propertyBlocks })) {
      commit('setPropertyBlocks', newPropertyBlocks)
      await dispatch('validateProperties', state.propertyBlocks)
    }
    //matching on "group_key" == "id" in builder.config.json
    const newGroupBlocks = getGroupBlocks(flowContainer)
    if(detectedGroupChanges({ newGroupBlocks, oldGroupBlocks: state.groupBlocks })) {
      commit('setGroupBlocks', newGroupBlocks)
      await dispatch('validateGroups', state.groupBlocks)
    }
    commit('setFlowJsonText', JSON.stringify(state.flowContainer, null, 2))
  },
  async validateLanguages({state, commit, rootGetters}, flowContainer: IContext ) {
    const uploadLanguages: ILanguage[] = get(flowContainer, 'flows[0].languages', [])
    const matchingLanguages: ILanguage[] = []
    if(uploadLanguages) {
      uploadLanguages.forEach((language) => {
        let matchingLanguage = find(rootGetters.languages, (orgLanguage) => {
          return isEqual(orgLanguage, language)
        })
        if(!matchingLanguage) {
          //Unlike the others we don't reset this.
          //A previously unmatched language can only be fixed by updating or adding a language 
          commit('addMissingLanguage', language)
        } else {
          matchingLanguages.push(language)
        }
      })
      commit('setMatchingLanguages', matchingLanguages)
      //Update the languages so we use the org settings for things like id and orgId
      commit('setFlowLanguages', state.matchingLanguages)
      commit('setExistingLanguagesWithoutMatch', differenceWith(rootGetters.languages, state.matchingLanguages, isEqual))
    }
  },
  async validateProperties({ rootGetters, state, commit }, newPropertyBlocks: IBlock[]) {
    const matchingProperties: IContactPropertyOption[] = []
    const blocksMissingProperties = cloneDeep(state.blocksMissingProperties)
    newPropertyBlocks.forEach((propertyBlock) => {
      const propertyIdentifier = get(propertyBlock, 'config.set_contact_property.property_key')
      if(propertyIdentifier) {
        let matchingProperty = find(rootGetters.subscriberPropertyFields, (orgProperty) => {
          return isEqual(orgProperty.name, propertyIdentifier)
        })
        if(!matchingProperty) {
          //Unlike the others we don't reset this.
          //A previously unmatched property can only be fixed by updating or adding a language
          //
          //Name is all we can get when there isn't a match
          //...as the block sidebar gets the actual displayLabel by matching
          if(!get(blocksMissingProperties, propertyIdentifier)) {
            blocksMissingProperties[propertyIdentifier] = []
          }
          blocksMissingProperties[propertyIdentifier].push(propertyBlock.uuid)
        } else {
          matchingProperties.push(matchingProperty)
        }
      }
    })
    commit('setBlocksMissingProperties', blocksMissingProperties)

    commit('setMissingProperties', keys(state.blocksMissingProperties).map((propertyIdentifier) => {
      return { name: propertyIdentifier, blockIds: state.blocksMissingProperties[propertyIdentifier] }
    }))
    commit('setMatchingProperties', matchingProperties)
    //Update the languages so we use the org settings for things like id and orgId
    commit('setExistingPropertiesWithoutMatch', differenceWith(rootGetters.subscriberPropertyFields, state.matchingProperties, isEqual));
  },

  async validateGroups({ rootGetters, state, commit }, newGroupBlocks: IBlock[]) {
    const matchingGroups: IGroupOption[] = []
    const blocksMissingGroups = cloneDeep(state.blocksMissingGroups)
    newGroupBlocks.forEach((groupBlock) => {
      const groupIdentifier = get(groupBlock, 'config.group_key')
      const groupName = get(groupBlock, 'config.group_name')
      if(groupIdentifier) {
        let matchingGroup = find(rootGetters.groups, (orgGroup) => {
          return isEqual(orgGroup.id, groupIdentifier)
            isEqual(orgGroup.name, groupName)
        })
        if(!matchingGroup) {
          //Unlike the others we don't reset this. 
          //A previously unmatched group can only be fixed by updating or adding a language 
          if(!get(blocksMissingGroups, groupIdentifier)) {
            blocksMissingGroups[groupIdentifier] = { 'groupName': groupName, blockIds: [] }
          }
          blocksMissingGroups[groupIdentifier]['blockIds'].push(groupBlock.uuid)
        } else {
          matchingGroups.push(matchingGroup)
        }
      }
    })
    commit('setBlocksMissingGroups', blocksMissingGroups)

    commit('setMissingGroups', keys(state.blocksMissingGroups).map((groupIdentifier) => {
      return Object.assign({ id: groupIdentifier }, state.blocksMissingGroups[groupIdentifier])
    }))
    commit('setMatchingGroups', matchingGroups)
    //Update the languages so we use the org settings for things like id and orgId
    commit('setExistingGroupsWithoutMatch', differenceWith(rootGetters.groups, state.matchingGroups, isEqual));
  },
  matchLanguage({ commit, state, dispatch }, { oldLanguage, matchingNewLanguage }) {
    commit('addFlowLanguage', matchingNewLanguage)
    commit('setFlowResources', updateResourcesForLanguageMatch(get(state.flowContainer, 'resources', []), oldLanguage.id, matchingNewLanguage.id))
    commit('setFlowJsonText', JSON.stringify(state.flowContainer, null, 2))
    commit('setMissingLanguages', reject(state.missingLanguages, (language) => {
      return isEqual(language, oldLanguage)
    }))
    dispatch('validateLanguages', state.flowContainer)
  },
  matchProperty({ commit, state, dispatch }, { oldProperty, matchingNewProperty }) {
    let blocks = cloneDeep(get(state.flowContainer, 'flows[0].blocks'))
    if(!blocks) return
    oldProperty.blockIds.forEach((blockId: string) => {
      const blockIndex = findIndex(blocks, (block: IBlock) => { return block.uuid === blockId })
      if(blockIndex < 0) return
      set(blocks, `${blockIndex}.config.set_contact_property.property_key`, matchingNewProperty.name)
    })
    commit('setFlowContainerBlocks', blocks)
    commit('setFlowJsonText', JSON.stringify(state.flowContainer, null, 2))
    //missingProperties gets updated again when we validate below
    const newBlocksMissingProperties: {[key: string]: string[]} = {}
    commit('setBlocksMissingProperties', keys(state.blocksMissingProperties).reduce((newBlocksMissingProperties, propertyIdentifier) => {
      if(oldProperty.name !== propertyIdentifier) {
        newBlocksMissingProperties[propertyIdentifier] = state.blocksMissingProperties[propertyIdentifier]
      }
      return newBlocksMissingProperties
    }, newBlocksMissingProperties))
    commit('setPropertyBlocks', getPropertyBlocks(state.flowContainer as IContext))
    dispatch('validateProperties', state.propertyBlocks)
  },
  matchGroup({ commit, state, dispatch }, { oldGroup, matchingNewGroup }) {
    let blocks = cloneDeep(get(state.flowContainer, 'flows[0].blocks'))
    if(!blocks) return
    oldGroup.blockIds.forEach((blockId: string) => {
      const blockIndex = findIndex(blocks, (block: IBlock) => { return block.uuid === blockId })
      if(blockIndex < 0) return
      set(blocks, `${blockIndex}.config.group_key`, matchingNewGroup.id)
      set(blocks, `${blockIndex}.config.group_name`, matchingNewGroup.name)
    })
    commit('setFlowContainerBlocks', blocks)
    commit('setFlowJsonText', JSON.stringify(state.flowContainer, null, 2))
    //missingGroups gets updated again when we validate below
    const newBlocksMissingGroups: {[key: string]: {groupName: string, blockIds: string[]}} = {}
    commit('setBlocksMissingGroups', keys(state.blocksMissingGroups).reduce((newBlocksMissingGroups, groupIdentifier) => {
      if(oldGroup.id !== groupIdentifier) {
        newBlocksMissingGroups[groupIdentifier] = state.blocksMissingGroups[groupIdentifier]
      }
      return newBlocksMissingGroups
    }, newBlocksMissingGroups))
    commit('setGroupBlocks', getGroupBlocks(state.flowContainer as IContext))
    dispatch('validateGroups', state.groupBlocks)
  }
}

export interface IImportState {
  matchingLanguages: ILanguage[]
  missingLanguages: ILanguage[]
  existingLanguagesWithoutMatch: ILanguage[]
  blocksMissingProperties: {[key: string]: string[]}
  missingProperties: {name: string, blockIds: string[]}[] 
  matchingProperties: IContactPropertyOption[]
  existingPropertiesWithoutMatch: IContactPropertyOption[]
  blocksMissingGroups: {[key: string]: {groupName: string, blockIds: string[]}}
  missingGroups: {id: string, groupName: string, blockIds: string[]}[]
  matchingGroups: IGroupOption[]
  existingGroupsWithoutMatch: IGroupOption[]
  flowContainer: IContext | null
  flowJsonText: string 
  flowError: string 
  propertyBlocks: IBlock[]
  groupBlocks: IBlock[]
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
  flowJsonText: "",
  flowError: "",
  propertyBlocks: [],
  groupBlocks: []
})

export default {
  namespaced: true,
  state: stateFactory,
  getters,
  mutations,
  actions,
}
