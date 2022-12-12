import Vue from 'vue'
import axios from 'axios'
import {
  findBlockWith,
  findFlowWith,
  getActiveFlowFrom,
  IBlock,
  IContext,
  IFlow, ILanguage,
  IResource,
  IResourceValue,
  SupportedMode,
  ValidationException,
} from '@floip/flow-runner'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import moment from 'moment'
import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {
  castArray,
  clone,
  cloneDeep,
  defaults,
  difference,
  every,
  forEach,
  get,
  has,
  includes,
  intersection,
  merge,
  omit,
  sortBy,
} from 'lodash'
import {cleanupFlowResources, discoverContentTypesFor} from '@/store/flow/utils/resourceHelpers'
import {computeBlockCanvasCoordinates} from '@/store/builder'
import {ErrorObject} from 'ajv'
import {removeFlowValueByPath, updateFlowValueByPath} from '@/store/flow/utils/vuexBlockAndFlowHelpers'
import {ConfigFieldType} from '@/store/flow/block'
import {IFlowsState} from '.'
import {mergeFlowContainer} from './utils/importHelpers'

export const getters: GetterTree<IFlowsState, IRootState> = {
  //We allow for an attempt to get a flow which doesn't yet exist in the state - e.g. the first_flow_id doesn't correspond to a flow
  activeFlow: (state): IFlow | undefined => {
    if (state.flows?.length) {
      try {
        return getActiveFlowFrom(state as unknown as IContext)
      } catch (err) {
        return undefined
      }
    }
  },
  blockUuidsOnActiveFlow: (state, getters): IBlock['uuid'][] => getters.activeFlow?.blocks,
  isActiveFlowValid: (state, getters, rootState) => {
    const flowValidationResult = get(rootState.validation.validationStatuses, `flow/${getters.activeFlow.uuid}`)
    if (flowValidationResult && !flowValidationResult.isValid) {
      return false
    }

    // check if all blocks are valid
    return every(
      getters.activeFlow.blocks,
      (block) => {
        const currentValidation = get(rootState.validation.validationStatuses, `block/${block.uuid}`)
        // should be valid if we don't have associated validation in validationStatuses
        return currentValidation != null ? currentValidation.isValid : true
      },
    )
  },
  //TODO: when IFlow interface is fixed in https://viamoinc.atlassian.net/browse/VMO-5581
  // remove isActiveFlowConsideredValidOnCreationForm, and change every references to isActiveFlowValid
  isActiveFlowConsideredValidOnCreationForm: (state, getters, rootState) => {
    const flowValidationResult = get(rootState.validation.validationStatuses, `flow/${getters.activeFlow.uuid}`)
    // true if we only have 1 validation error (it's related to '/first_block_id')
    return Boolean(getters.isActiveFlowValid) || (Boolean(flowValidationResult) && flowValidationResult.ajvErrors?.length === 1)
  },
  //TODO - is the IContext equivalent to the Flow Container? Can we say that it should be?
  activeFlowContainer: (state) => ({
    isCreated: state.isCreated,
    specification_version: state.specification_version,
    uuid: state.container_uuid,
    name: 'TODO',
    description: 'TODO',
    vendor_metadata: {},
    flows: state.flows,
  } as unknown as IContext),
  hasTextMode: (state, getters) => [SupportedMode.USSD, SupportedMode.SMS].some((mode) => includes(
    getters.activeFlow.supported_modes || [],
    mode,
  )),
  hasVoiceMode: (state, getters) => includes(getters.activeFlow.supported_modes || [], SupportedMode.IVR),
  hasOfflineMode: (state, getters) => includes(getters.activeFlow.supported_modes || [], SupportedMode.OFFLINE),
  currentFlowsState: (state) => state,
}

export const mutations: MutationTree<IFlowsState> = {
  //TODO - consider if this is correct? This only gets what the current flow needs and removes from the store any other flows
  //That means the flow list page (which we will build the production version of later) will get cleared of all flows if we continue with the current model - see the temporary page /src/views/Home.vue - unless we fetch the list again
  //That doesn't make sense if we run the builder standalone - without a fetch of the flows list
  flow_setFlowContainer(state, flowContainer) {
    const persistedState = flowContainer
    state.isCreated = persistedState.isCreated
    state.flows = persistedState.flows
  },
  //used to track whether we should put or post when persisting
  flow_updateCreatedState(state, createdState) {
    state.isCreated = createdState
  },
  flow_setActiveFlowId(state, {flowId}: { flowId: string }) {
    state.first_flow_id = flowId
  },
  flow_addBlock(state, {flowId, block}: { flowId: string, block: IBlock }) {
    if (block == null) {
      throw new ValidationException('Unable to add null block to flow')
    }

    const flow = findFlowWith(flowId || state.first_flow_id || '', state as unknown as IContext)
    const length = flow.blocks.push(block)

    if (length === 1) {
      flow.first_block_id = block.uuid
    }
  },

  flow_setExitBlockId(state, {flowId, blockId}) {
    const flow: IFlow = findFlowWith(flowId, state as unknown as IContext)
    // @throws ValidationException when block absent
    const block: IBlock = findBlockWith(blockId, flow)
    flow.exit_block_id = block.uuid
  },

  flow_setFirstBlockId(state, {flowId, blockId}) {
    const flow: IFlow = findFlowWith(flowId, state as unknown as IContext)
    // @throws ValidationException when block absent
    const block: IBlock = findBlockWith(blockId, flow)
    Vue.set(flow, 'first_block_id', block.uuid)
  },
  flow_setNameFromLabel(state, {flowId, label}) {
    findFlowWith(flowId, state as unknown as IContext).name = label.replace(/\W+/g, '')
  },

  flow_setLabel(state, {flowId, label}) {
    findFlowWith(flowId, state as unknown as IContext).label = label
  },

  flow_setInteractionTimeout(state, {flowId, value}) {
    findFlowWith(flowId, state as unknown as IContext).interaction_timeout = value
  },

  flow_setSupportedMode(state, {flowId, value}: {flowId: string, value: SupportedMode[] | SupportedMode}) {
    const flow: IFlow = findFlowWith(flowId, state as unknown as IContext)
    // we should not sort nor rely on the modes' order because the flow spec doesn't enforce flow.supported_modes to be ordered
    flow.supported_modes = castArray(value)
  },

  flow_setLanguages(state, {flowId, value}: {flowId: string, value: ILanguage[] | ILanguage}) {
    const flow: IFlow = findFlowWith(flowId, state as unknown as IContext)
    // we should not sort nor rely on the languages' order because the flow spec doesn't enforce flow.languages to be ordered
    flow.languages = castArray(value)
  },

  flow_updateVendorMetadataByPath(
    state,
    {flowId, path, value}: {flowId: string, path: string, value: ConfigFieldType},
  ) {
    updateFlowValueByPath(state, flowId, `vendor_metadata.${path}`, value)
  },

  flow_removeVendorMetadataByPath(state, {flowId, path}: { flowId: string, path: string }) {
    removeFlowValueByPath(state, flowId, `vendor_metadata.${path}`)
  },
}

export const actions: ActionTree<IFlowsState, IRootState> = {
  /**
   * Persistence for IMPORT action
   */
  async flow_persistImport({getters, commit, dispatch}, {persistRoute, flowContainer}): Promise<IContext | null> {
    flowContainer = mergeFlowContainer(cloneDeep(getters.activeFlowContainer), flowContainer)
    const restVerb = flowContainer.isCreated ? 'put' : 'post'
    const oldCreatedState = flowContainer.isCreated
    if (!persistRoute) {
      console.info('Flow persistence route not configured correctly in builder.config.json. Falling back to vuex store')
      commit('flow_setFlowContainer', flowContainer)
      return getters.activeFlowContainer
    }
    try {
      const {data: {createdContainer}} = await axios[restVerb](persistRoute, omit(flowContainer, ['isCreated']))

      commit('flow_setFlowContainer', createdContainer)
      // commit('flow_setFlowContainer', data)
      commit('flow_updateCreatedState', true)
      dispatch('validation/validate_allBlocksFromBackend', null, {root: true})
      return getters.activeFlowContainer
    } catch (error) {
      commit('flow_updateCreatedState', oldCreatedState)
      commit('validation/pushAjvErrorToValidationStatuses', {
        key: 'container_import',
        ajvError: {
          dataPath: '/container',
          keyword: 'backend_error',
          message: error.response.data?.error ?? error.response.data,
        } as ErrorObject,
      }, {root: true})
      console.error(`Server error persisting flow: "${get(error, 'response.data')}". Status: ${error.response.status}`)
      return null
    }
  },

  /**
   * Persistence for SAVE action
   */
  async flow_persist({getters, rootGetters, commit, dispatch}, {persistRoute, flowContainer}): Promise<IContext | null> {
    const restVerb = flowContainer.isCreated ? 'put' : 'post'
    const oldCreatedState = flowContainer.isCreated
    if (!persistRoute) {
      console.info('Flow persistence route not configured correctly in builder.config.json. Falling back to vuex store')
      commit('flow_setFlowContainer', flowContainer)
      return getters.activeFlowContainer
    }

    // Clean orphan resources first, eg: old orphan resources, or orphan resource after the import
    dispatch('flow_removeOrphanedResourcesAndRelatedValidationsOnActiveFlow')

    try {
      const {data} = await axios[restVerb](persistRoute, omit(cleanupFlowResources(flowContainer, rootGetters['validation/choiceMimeType']), ['isCreated']))
      commit('flow_setFlowContainer', data)
      commit('flow_updateCreatedState', true)
      dispatch('validation/validate_allBlocksFromBackend', null, {root: true})
      return getters.activeFlowContainer
    } catch (error) {
      commit('flow_updateCreatedState', oldCreatedState)
      console.error(`Server error persisting flow: "${get(error, 'response.data')}". Status: ${error.response.status}`)
      return null
    }
  },
  //TODO - In future there may be a use case for not blowing away all flows and resources but this isn't needed yet
  //see comment on flow_setFlowContainer
  async flow_fetch({getters, commit, dispatch}, {fetchRoute}): Promise<IFlow | null> {
    if (!fetchRoute) {
      console.info('Flow fetch route not configured correctly in builder.config.json. Falling back to vuex store')
      return getters.activeFlow
    }
    try {
      const {data} = await axios.get(fetchRoute)
      commit('flow_setFlowContainer', data)
      commit('flow_updateCreatedState', true)
      return data
    } catch (error) {
      console.info(`Server error fetching flow: "${get(error, 'response.data')}". Status: ${error.response.status}`)
      return null
    }
  },
  // todo: this `flow_` prefix doesn't follow suit
  // IContext-ish type
  //       because it's actually a method on the root state
  //       (same as mutation: `flow_activateBlock` and `flow_add`
  async flow_addBlankFlow({dispatch}): Promise<IFlow> {
    const flow = await dispatch('flow_createWith', {props: {uuid: await (new IdGeneratorUuidV4()).generate()}})

    return dispatch('flow_add', {flow})
  },

  async flow_add({state}, {flow}: {flow: IFlow}): Promise<IFlow> {
    // mutating here, because we need to define a root-level scope for this type of action
    state.flows.push(flow)
    //TODO - understand why this was here? Surely we can have an active flow that isn't the first and only one?
    //if (length === 1) {
    state.first_flow_id = flow.uuid
    //}

    return flow
  },

  flow_removeBlock({state, commit, dispatch}, {flowId, blockId}: { flowId: string, blockId: IBlock['uuid'] }) {
    const flow = findFlowWith(flowId || state.first_flow_id || '', state as unknown as IContext)
    // @throws ValidationException when block absent
    const block: IBlock = findBlockWith(blockId, flow)

    if (block == null) {
      throw new ValidationException('Unable to delete block absent from flow')
    }

    // Remove block & it's validation
    const {blocks} = flow
    blocks.splice(
      blocks.indexOf(block),
      1,
    )
    commit('validation/removeValidationStatusesFor', {key: `block/${block.uuid}`}, {root: true})

    // remove resources when they become orphaned, i.e. after removing the block
    dispatch('flow_removeOrphanedResourcesAndRelatedValidationsOnActiveFlow')

    // clean up stale references
    // 1. flow.first_block_id
    // 2. flow.exit_block_id
    // 3. flow.blocks.*.exits.*.destination_block
    // 4. activeBlockId (we should likely trail a ghost of previous selection and select that one next)

    // todo: convert this whole operation to an ActionTree member
    // todo: use mutations for these:
    if (flow.first_block_id === blockId) {
      // todo: make this optional for builder
      flow.first_block_id = blocks.length ? blocks[0].uuid : ''
    }

    if (flow.exit_block_id === blockId) {
      flow.exit_block_id = undefined
    }

    forEach(blocks, ({exits}) => {
      const exitsTowardUs = exits.filter((exit) => exit.destination_block === blockId)
      forEach(exitsTowardUs, (exit) => {
        exit.destination_block = undefined
      })
    })

    commit('builder/activateBlock', {blockId: null}, {root: true})
  },

  /**
   * Clean flow resources & related validations
   * @param state
   * @param commit
   * @param resourceUuids
   */
  async flow_removeResourcesAndRelatedValidationsOnActiveFlow(
    {commit, getters},
    {resourceUuids}: {resourceUuids: IResource['uuid'][]},
  ): Promise<void> {
    console.debug('trying to clean those resources:', resourceUuids)

    const flow: IFlow = getters.activeFlow
    flow.resources = flow.resources.filter(item => !resourceUuids.includes(item.uuid))
    resourceUuids.forEach(
      uuid => commit('validation/removeValidationStatusesFor', {key: `resource/${uuid}`}, {root: true}),
    )
  },

  async flow_removeOrphanedResourcesAndRelatedValidationsOnActiveFlow({dispatch, getters}): Promise<void> {
    await dispatch('flow_removeResourcesAndRelatedValidationsOnActiveFlow', {resourceUuids: getters.orphanResourceUuidsOnActiveFlow})
  },

  async flow_addBlankBlockByType({commit, dispatch}, {type, ...props}: Partial<IBlock>): Promise<IBlock> {
    // if (!state[type]) {
    // todo: for some reason {snakeCase} from 'lodash' doesn't work?
    // todo: for some reason dynamic imports aren't working w/ storybook build
    // const modulePath = `./block-types/${type.replace('.', '_')}BlockStore.ts`
    // const store = await import(modulePath)

    // this.registerModule(['flow', BLOCK_TYPE], store)
    // }

    // todo: standardize this for each block type

    const block = await dispatch(`flow/${type}/createWith`, {
      props: {
        uuid: await (new IdGeneratorUuidV4()).generate(),
        ...props,
      },
    }, {root: true})

    // a key is prerequisite for reactivity, even optional params

    defaults(block, {
      label: undefined,
      semantic_label: undefined,
    })

    commit('flow_addBlock', {block})

    return block
  },

  async flow_addBlankResource({dispatch}): Promise<IResource> {
    const resource = await dispatch('resource_createWith', {props: {uuid: await (new IdGeneratorUuidV4()).generate()}})
    dispatch('resource_add', {resource})

    return resource
  },
  async flow_addBlankResourceForEnabledModesAndLangs({dispatch}): Promise<IResource> {
    const resource = await dispatch('flow_createBlankResource')
    dispatch('resource_add', {resource})
    return resource
  },

  async flow_createBlankResource({getters, dispatch}): Promise<IResource> {
    const activeFlow: IFlow = getters.activeFlow
    const modes = activeFlow.supported_modes
    const languageIds = activeFlow.languages.map(language => language.id)

    const values: IResourceValue[] = []
    languageIds.forEach(languageId => {
      modes.forEach(mode => {
        discoverContentTypesFor(mode)?.forEach((contentType) => {
          values.push({
            language_id: languageId,
            value: '',
            content_type: contentType,
            modes: [mode],
          })
        })
      })
    })

    return dispatch('resource_createWith', {
      props: {
        uuid: await (new IdGeneratorUuidV4()).generate(),
        values,
      },
    })
  },

  /** add (or remove) resource values, e.g. if a language or mode is added (or removed) from the flow */
  async flow_updateResourceValues({getters, rootGetters, dispatch}): Promise<void> {
    const activeFlow: IFlow = getters.activeFlow
    const resources = activeFlow.resources
    const modes = activeFlow.supported_modes
    const languages = activeFlow.languages.map(language => language.id)

    const promises: Promise<void>[] = []

    // remove unused variants
    resources.forEach(resource => {
      const variantsToRemove = resource.values.filter(variant => {
        const hasUnusedLanguage = !languages.includes(variant.language_id)
        const hasUnusedModes = intersection(variant.modes, modes).length === 0
        return (hasUnusedLanguage || hasUnusedModes)
      })
      promises.push(dispatch('resource_removeVariants', {resourceId: resource.uuid, variants: variantsToRemove}) as Promise<void>)
    })

    // add missing variants
    resources
      // Choices are a special case, we should not add variants
      .filter(resource => resource.values.every(value => value.mime_type !== rootGetters['validation/choiceMimeType']))
      .forEach(resource => {
        modes.forEach(mode => {
          languages.forEach(language => {
            const resourceValue = resource.values.find(value => value.language_id === language && value.modes.includes(mode))
            if (resourceValue === undefined) {
              console.warn(`Adding missing variant: lang ${language}, mode: ${mode} for resource ${resource.uuid}`)

              discoverContentTypesFor(mode)?.forEach((content_type) => {
                promises.push(
                  dispatch('resource_createVariant', {
                    resourceId: resource.uuid,
                    variant: {
                      content_type,
                      language_id: language,
                      modes: [mode],
                      value: '',
                    },
                  }) as Promise<void>,
                )
              })
            }
          })
        })
      })

    await Promise.all(promises)
  },

  async flow_createWith({rootState}, {props}: { props: { uuid: string } & Partial<IFlow> }): Promise<IFlow> {
    return {
      ...defaults(props, {
        name: '',
        // TODO: Remove this optional attribute once the findFlowWith( ) is able to mutate state when setting non existing key.
        label: '',
        last_modified: moment().toISOString(),
        interaction_timeout: rootState.trees.ui.appWideInteractionTimeout,
        vendor_metadata: {},
        supported_modes: rootState.trees.ui.defaultModes,
        languages: [],
        blocks: [],
        first_block_id: '',
        resources: [],
      }),
    }
  },

  async flow_duplicateBlock(
    {commit, state, getters, dispatch},
    {flowId, blockId}: {flowId: string, blockId: IBlock['uuid']},
  ): Promise<IBlock> {
    const flow = findFlowWith(flowId || state.first_flow_id || '', state as unknown as IContext)
    // @throws ValidationException when block absent
    const block: IBlock = findBlockWith(blockId, flow)

    // Deep clone
    const duplicatedBlock: IBlock = cloneDeep(block)

    // Set UUIDs, and remove non relevant props
    duplicatedBlock.uuid = await (new IdGeneratorUuidV4()).generate()

    await Promise.all(
      duplicatedBlock.exits.map(async (item) => {
        item.uuid = await (new IdGeneratorUuidV4()).generate()
        delete item.destination_block
      }),
    )

    if (has(duplicatedBlock.config, 'prompt')) {
      const sourceResourceUuid = duplicatedBlock.config.prompt
      const targetResourceUuid = await (new IdGeneratorUuidV4()).generate()
      const duplicatedResource: IResource = cloneDeep(getters.resourcesByUuidOnActiveFlow[sourceResourceUuid])

      duplicatedResource.uuid = targetResourceUuid
      dispatch('resource_add', {resource: duplicatedResource})
      Vue.set(duplicatedBlock.config, 'prompt', targetResourceUuid)
    }

    // Set UI positions
    merge(duplicatedBlock.ui_metadata, {
      canvas_coordinates: computeBlockCanvasCoordinates(block),
    })

    commit('flow_addBlock', {block: duplicatedBlock})

    return duplicatedBlock
  },

  async flow_clearMultiSelection({state, dispatch}) {
    forEach(state.selectedBlocks, (blockId: IBlock['uuid']) => {
      dispatch('block_deselect', {blockId})
    })
  },

  async flow_removeAllSelectedBlocks({state, dispatch}) {
    forEach(state.selectedBlocks, (blockId: IBlock['uuid']) => {
      dispatch('flow_removeBlock', {blockId})
    })

    state.selectedBlocks = []
  },

  async flow_duplicateAllSelectedBlocks({state, dispatch}) {
    const newBlocksUuid: string[] = []
    forEach(state.selectedBlocks, async (blockId: IBlock['uuid']) => {
      const duplicatedBlock: IBlock = await dispatch('flow_duplicateBlock', {blockId})
      newBlocksUuid.push(duplicatedBlock.uuid)
    })
    state.selectedBlocks = newBlocksUuid
  },

  async flow_updateModes({state, getters, commit, dispatch}, {flowId, newModes}: {flowId: string, newModes: SupportedMode[]}) {
    const flow: IFlow = findFlowWith(flowId, state as unknown as IContext)
    commit('flow_setSupportedMode', {flowId, value: newModes})

    await dispatch('flow_updateResourceValues')
    await dispatch('validation/validate_allBlocksWithinFlow', null, {root: true})
    await dispatch('validation/validate_resourcesOnSupportedValues', {
      resources: flow.resources,
      supportedModes: flow.supported_modes,
      supportedLanguages: flow.languages,
    }, {root: true})
  },

  async flow_updateLanguages({state, getters, commit, dispatch}, {flowId, newLanguages}: {flowId: string, newLanguages: ILanguage[]}) {
    const flow: IFlow = findFlowWith(flowId, state as unknown as IContext)
    const oldLanguages = clone(flow.languages)
    commit('flow_setLanguages', {flowId, value: newLanguages})

    await dispatch('flow_updateResourceValues')
    await dispatch('block_updateBlocksAfterLanguagesChange', {
      addedLanguageIds: difference(newLanguages, oldLanguages).map(lang => lang.id),
      removedLanguageIds: difference(oldLanguages, newLanguages).map(lang => lang.id),
    })
    await dispatch('validation/validate_allBlocksWithinFlow', null, {root: true})
    await dispatch('validation/validate_resourcesOnSupportedValues', {
      resources: flow.resources,
      supportedModes: flow.supported_modes,
      supportedLanguages: flow.languages,
    }, {root: true})
  },
}

/**
 * Sort languages to display them in a particular order
 *
 * Caution: use this in the UI only, "on the surface" - for consistent UX when the languages get rearranged.
 * In other cases, avoid sorting or relying on their order because the flow spec doesn't enforce it.
 */
export function orderLanguages(languages: ILanguage[]): ILanguage[] {
  return sortBy(languages, ['label'])
}

/**
 * Sort modes to display them in a particular order
 *
 * Caution: use this in the UI only, "on the surface" - for consistent UX when the modes get rearranged.
 * In other cases, avoid sorting or relying on their order because the flow spec doesn't enforce it.
 */
export function orderModes(modes: SupportedMode[]): SupportedMode[] {
  const order = [
    SupportedMode.IVR,
    SupportedMode.SMS,
    SupportedMode.USSD,
    SupportedMode.TEXT,
    SupportedMode.RICH_MESSAGING,
    SupportedMode.OFFLINE,
  ]
  return sortBy(modes, (item: SupportedMode) => order.indexOf(item))
}
