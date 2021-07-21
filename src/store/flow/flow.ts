import Vue from 'vue'
import axios from 'axios'
import {
  findBlockWith,
  findFlowWith,
  getActiveFlowFrom,
  IBlock,
  IContext,
  IFlow,
  IResource,
  IResourceValue,
  SupportedMode,
  ValidationException,
} from '@floip/flow-runner'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import moment from 'moment'
import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {cloneDeep, defaults, every, forEach, get, has, includes, omit} from 'lodash'
import {discoverContentTypesFor} from '@/store/flow/resource'
import {computeBlockUiData} from '@/store/builder'
import {IFlowsState} from '.'
import {mergeFlowContainer} from './utils/importHelpers'

export const getters: GetterTree<IFlowsState, IRootState> = {
  //We allow for an attempt to get a flow which doesn't yet exist in the state - e.g. the first_flow_id doesn't correspond to a flow
  activeFlow: (state) => {
    if (state.flows.length) {
      try {
        return getActiveFlowFrom(state as unknown as IContext)
      } catch (err) {
        return undefined
      }
    }
  },
  isActiveFlowValid: (state, getters, rootState) => {
    const flowValidationResult = get(rootState.validation.validationStatuses, `flow/${getters.activeFlow.uuid}`)
    if (flowValidationResult && !flowValidationResult.isValid) {
      return false
    }

    // check if all blocks are valid
    return every(
      getters.activeFlow.blocks,
      (block) => get(rootState.validation.validationStatuses, `block/${block.uuid}`)?.isValid,
)
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
    resources: state.resources,
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
    state.resources = persistedState.resources
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

  flow_setSupportedMode(state, {flowId, value}) {
    const flow: IFlow = findFlowWith(flowId, state as unknown as IContext)
    flow.supported_modes = Array.isArray(value) ? value : [value]
  },

  flow_setLanguages(state, {flowId, value}) {
    const flow: IFlow = findFlowWith(flowId, state as unknown as IContext)
    flow.languages = Array.isArray(value) ? value : [value]
  },
}

export const actions: ActionTree<IFlowsState, IRootState> = {

  async flow_import({getters, dispatch}, {persistRoute, flowContainer}): Promise<IContext | null> {
    flowContainer = mergeFlowContainer(cloneDeep(getters.activeFlowContainer), flowContainer)
    return dispatch('flow_persist', {persistRoute, flowContainer})
  },
  async flow_persist({getters, commit}, {persistRoute, flowContainer}): Promise<IContext | null> {
    const restVerb = flowContainer.isCreated ? 'put' : 'post'
    const oldCreatedState = flowContainer.isCreated
    if (!persistRoute) {
      console.info('Flow persistence route not configured correctly in builder.config.json. Falling back to vuex store')
      commit('flow_setFlowContainer', flowContainer)
      return getters.activeFlowContainer
    }
    try {
      const {data} = await axios[restVerb](persistRoute, omit(flowContainer, ['isCreated']))
      commit('flow_setFlowContainer', data)
      commit('flow_updateCreatedState', true)
      return getters.activeFlowContainer
    } catch (error) {
      commit('flow_updateCreatedState', oldCreatedState)
      console.info(`Server error persisting flow: "${get(error, 'response.data')}". Status: ${error.response.status}`)
      return null
    }
  },
  //TODO - In future there may be a use case for not blowing away all flows and resources but this isn't needed yet
  //see comment on flow_setFlowContainer
  async flow_fetch({getters, commit}, {fetchRoute}): Promise<IFlow | null> {
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

  async flow_add({state}, {flow}): Promise<IFlow> {
    // mutating here, because we need to define a root-level scope for this type of action
    state.flows.push(flow)
    //TODO - understand why this was here? Surely we can have an active flow that isn't the first and only one?
    //if (length === 1) {
    state.first_flow_id = flow.uuid
    //}

    return flow
  },

  flow_removeBlock({state, commit}, {flowId, blockId}: { flowId: string, blockId: IBlock['uuid'] }) {
    const flow = findFlowWith(flowId || state.first_flow_id || '', state as unknown as IContext)
    // @throws ValidationException when block absent
    const block: IBlock = findBlockWith(blockId, flow)

    if (block == null) {
      throw new ValidationException('Unable to delete block absent from flow')
    }

    const {blocks} = flow
    blocks.splice(
      blocks.indexOf(block),
      1,
    )

    // clean up stale references
    // 1. flow.first_block_id
    // 2. flow.exit_block_id
    // 3. flow.blocks.*.exits.*.destination_block
    // 4. activeBlockId (we should likely trail a ghost of previous selection and select that one next)

    // todo: convert this whole operation to an ActionTree member
    // todo: use mutations for these:
    if (flow.first_block_id === blockId) {
      // todo: make this optional for builder
      flow.first_block_id = ''
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

  async flow_addBlankResource({dispatch, commit}): Promise<IResource> {
    const resource = await dispatch('resource_createWith', {props: {uuid: await (new IdGeneratorUuidV4()).generate()}})

    commit('resource_add', {resource})

    return resource
  },
  async flow_addBlankResourceForEnabledModesAndLangs({dispatch, commit}): Promise<IResource> {
    const resource = await dispatch('flow_createBlankResourceForEnabledModesAndLangs')
    commit('resource_add', {resource})
    return resource
  },

  async flow_createBlankResourceForEnabledModesAndLangs({getters, dispatch, commit}): Promise<IResource> {
    // TODO - figure out of there should only be one value here at first? How would the resource editor change this?
    // TODO - is this right for setup of languages?
    // TODO - How will we add more blank values as supported languages are changed in the flow? We should probably also do this for modes rather than doing all possible modes here.
    const values: IResourceValue = getters.activeFlow.languages.reduce((memo: object[], language: { id: string, name: string }) => {
      // Let's just create all the modes. We might need them but if they are switched off they just don't get used
      Object.values(SupportedMode).forEach((mode: SupportedMode) => {
        discoverContentTypesFor(mode)?.forEach((contentType) => {
          memo.push({
            language_id: language.id,
            value: '',
            content_type: contentType,
            modes: [
              mode,
            ],
          })
        })
      })

      return memo
    }, [])

    return dispatch('resource_createWith', {
      props: {
        uuid: await (new IdGeneratorUuidV4()).generate(),
        values,
      },
    })
  },

  async flow_createWith(_context, {props}: { props: { uuid: string } & Partial<IFlow> }): Promise<IFlow> {
    return {
      ...defaults(props, {
        name: '',
        // TODO: Remove this optional attribute once the findFlowWith( ) is able to mutate state when setting non existing key.
        label: '',
        last_modified: moment().toISOString(),
        interaction_timeout: 30,
        vendor_metadata: {},

        supported_modes: DEFAULT_MODES,
        languages: [],
        blocks: [],

        first_block_id: '',
      }),
    }
  },

  async flow_duplicateBlock({commit, state}, {flowId, blockId}: { flowId: string, blockId: IBlock['uuid'] }): Promise<IBlock> {
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
      Vue.set(duplicatedBlock.config!, 'prompt', await (new IdGeneratorUuidV4()).generate())
    }

    // Set UI positions
    // TODO: remove this once IBlock has vendor_metadata key
    duplicatedBlock.vendor_metadata = {
      io_viamo: {
        uiData: computeBlockUiData(block),
      },
    }

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
}

export const DEFAULT_MODES = [
  SupportedMode.SMS,
  SupportedMode.USSD,
  SupportedMode.IVR,
]
