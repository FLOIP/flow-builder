import Vue from 'vue'
import axios from 'axios'
import {
  findBlockWith,
  findFlowWith,
  getActiveFlowFrom,
  SupportedMode,
  SupportedContentType,
  IBlock,
  IContext,
  IFlow,
  IResource,
  ValidationException, IResourceValue,
} from '@floip/flow-runner'
import { IdGeneratorUuidV4 } from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import moment from 'moment'
import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { IRootState } from '@/store'
import {
  defaults,
  includes,
  forEach,
  cloneDeep,
  get,
  has,
  omit
} from 'lodash'
import { discoverContentTypesFor } from '@/store/flow/resource'
import { computeBlockPositionsFrom } from '@/store/builder'
import { IFlowsState } from '.'

export const getters: GetterTree<IFlowsState, IRootState> = {
  //We allow for an attempt to get a flow which doesn't yet exist in the state - e.g. the first_flow_id doesn't correspond to a flow
  activeFlow: (state) => {
    if(state.flows.length) {
      try {
        return getActiveFlowFrom(state as unknown as IContext)
      } catch(err) {
        return null
      }
    }
  },
  //TODO - is the IContext equivalent to the Flow Container? Can we say that it should be?
  activeFlowContainer: state => {
    return {
      isCreated: state.isCreated,
      specification_version: "TODO",
      uuid: "TODO",
      name: "TODO",
      description: "TODO",
      vendor_metadata: {},
      flows: state.flows,
      resources: state.resources
    } as unknown as IContext
  },
  hasTextMode: (state, getters) => [SupportedMode.USSD, SupportedMode.SMS].some((mode) => includes(getters.activeFlow.supported_modes || [], mode)),
  hasVoiceMode: (state, getters) => includes(getters.activeFlow.supported_modes || [], SupportedMode.IVR),
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
  flow_setActiveFlowId(state, {flowId}: {flowId: string}) {
    state.first_flow_id = flowId
  },
  flow_addBlock(state, { flowId, block }: {flowId: string; block: IBlock}) {
    if (block == null) {
      throw new ValidationException('Unable to add null block to flow')
    }

    const flow = findFlowWith(flowId || state.first_flow_id || '', state as unknown as IContext)
    const length = flow.blocks.push(block)

    if (length === 1) {
      flow.first_block_id = block.uuid
    }
  },

  flow_setExitBlockId(state, { flowId, blockId }) {
    const flow: IFlow = findFlowWith(flowId, state as unknown as IContext)
    const block: IBlock = findBlockWith(blockId, flow) // @throws ValidationException when block absent
    flow.exit_block_id = block.uuid
  },

  flow_setFirstBlockId(state, { flowId, blockId }) {
    const flow: IFlow = findFlowWith(flowId, state as unknown as IContext)
    const block: IBlock = findBlockWith(blockId, flow) // @throws ValidationException when block absent
    Vue.set(flow, 'first_block_id', block.uuid)
  },
  flow_setNameFromLabel(state, {flowId, label}) {
    findFlowWith(flowId, state as unknown as IContext).name = label.replace(/\W+/g, '')
  },

  flow_setLabel(state, { flowId, label }) {
    findFlowWith(flowId, state as unknown as IContext).label = label
  },

  flow_setInteractionTimeout(state, { flowId, value }) {
    findFlowWith(flowId, state as unknown as IContext).interaction_timeout = value
  },

  flow_setSupportedMode(state, { flowId, value }) {
    const flow: IFlow = findFlowWith(flowId, state as unknown as IContext)
    flow.supported_modes = Array.isArray(value) ? value : [value]
  },

  flow_setLanguages(state, { flowId, value }) {
    const flow: IFlow = findFlowWith(flowId, state as unknown as IContext)
    flow.languages = Array.isArray(value) ? value : [value]
  },
}

export const actions: ActionTree<IFlowsState, IRootState> = {

  async flow_persist({ state, getters, commit }, { persistRoute, flowContainer }): Promise<IContext | null> {
    const restVerb = flowContainer.isCreated ? 'put' : 'post'
    const oldCreatedState = flowContainer.isCreated
    if(!persistRoute) {
      console.info("Flow persistence route not configured correctly in builder.config.json. Falling back to vuex store")
      commit('flow_setFlowContainer', flowContainer)
      return getters.activeFlowContainer
    }
    try {
      const { data } = await axios[restVerb](persistRoute, omit(flowContainer, ['isCreated']))
      commit('flow_setFlowContainer', data)
      commit('flow_updateCreatedState', true)
      return getters.activeFlowContainer
    } catch(error) {
      commit('flow_updateCreatedState', oldCreatedState)
      console.info(`Server error persisting flow: "${get(error, 'response.data')}". Status: ${error.response.status}`)
      return null
    }
  },
  //TODO - In future there may be a use case for not blowing away all flows and resources but this isn't needed yet
  //see comment on flow_setFlowContainer
  async flow_fetch({ state, getters, commit }, { fetchRoute }): Promise<IFlow | null> {
    if(!fetchRoute) {
      console.info("Flow fetch route not configured correctly in builder.config.json. Falling back to vuex store")
      return getters.activeFlow
    }
    try {
      const { data } = await axios.get(fetchRoute)
      commit('flow_setFlowContainer', data)
      commit('flow_updateCreatedState', true)
      return data
    } catch(error) {
      console.info(`Server error fetching flow: "${get(error, 'response.data')}". Status: ${error.response.status}`)
      return null
    }
  },
  // todo: this `flow_` prefix doesn't follow suit
  //       because it's actually a method on the root state // IContext-ish type
  //       (same as mutation: `flow_activateBlock` and `flow_add`
  async flow_addBlankFlow({ dispatch, commit, state }): Promise<IFlow> {
    const flow = await dispatch('flow_createWith', { props: { uuid: await (new IdGeneratorUuidV4()).generate() } })

    return await dispatch('flow_add', { flow })
  },

  async flow_add({ state }, { flow }): Promise<IFlow> {
    const length = state.flows.push(flow) // mutating here, because we need to define a root-level scope for this type of action
    //TODO - understand why this was here? Surely we can have an active flow that isn't the first and only one?
    //if (length === 1) {
      state.first_flow_id = flow.uuid
    //}

    return flow
  },

  flow_removeBlock({ state, commit }, { flowId, blockId }: {flowId: string; blockId: IBlock['uuid']}) {
    const flow = findFlowWith(flowId || state.first_flow_id || '', state as unknown as IContext)
    const block: IBlock = findBlockWith(blockId, flow) // @throws ValidationException when block absent

    if (block == null) {
      throw new ValidationException('Unable to delete block absent from flow')
    }

    const { blocks } = flow
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
      flow.first_block_id = '' // todo: make this optional for builder
    }

    if (flow.exit_block_id === blockId) {
      flow.exit_block_id = undefined
    }

    forEach(blocks, ({ exits }) => {
      const exitsTowardUs = exits.filter((e) => e.destination_block === blockId)
      forEach(exitsTowardUs, (e) => e.destination_block = undefined)
    })

    commit('builder/activateBlock', { blockId: null }, { root: true })
  },

  async flow_addBlankBlockByType({ commit, dispatch, state }, { type, ...props }: Partial<IBlock>): Promise<IBlock> {
    // if (!state[type]) {
    // todo: for some reason {snakeCase} from 'lodash' doesn't work?
    // todo: for some reason dynamic imports aren't working w/ storybook build
    // const modulePath = `./block-types/${type.replace('.', '_')}BlockStore.ts`
    // const store = await import(modulePath)

    // this.registerModule(['flow', BLOCK_TYPE], store)
    // }

    const block = await dispatch(`flow/${type}/createWith`, { // todo: standardize this for each block type
      props: {
        uuid: await (new IdGeneratorUuidV4()).generate(),
        ...props,
      },
    }, { root: true })

    defaults(block, { // a key is prerequisite for reactivity, even optional params
      label: undefined,
      semantic_label: undefined,
    })

    commit('flow_addBlock', { block })

    return block
  },

  async flow_addBlankResource({ dispatch, commit }): Promise<IResource> {
    const resource = await dispatch('resource_createWith', { props: { uuid: await (new IdGeneratorUuidV4()).generate() } })

    commit('resource_add', { resource })

    return resource
  },
  async flow_addBlankResourceForEnabledModesAndLangs({ getters, dispatch, commit }): Promise<IResource> {
    // TODO - figure out of there should only be one value here at first? How would the resource editor change this?
    // TODO - is this right for setup of languages?
    // TODO - How will we add more blank values as supported languages are changed in the flow? We should probably also do this for modes rather than doing all possible modes here.
    const values: IResourceValue = getters.activeFlow.languages.reduce((memo: object[], language: {id: string; name: string}) => {
      // Let's just create all the modes. We might need them but if they are switched off they just don't get used
      Object.values(SupportedMode).forEach((mode: SupportedMode) => {
        memo.push({
          language_id: language.id,
          value: '',
          content_type: discoverContentTypesFor(mode),
          modes: [
            mode,
          ],
        })
      })

      return memo
    }, [])

    const blankResource = await dispatch('resource_createWith', {
      props: {
        uuid: await (new IdGeneratorUuidV4()).generate(),
        values,
      },
    })

    commit('resource_add', { resource: blankResource })

    return blankResource
  },

  async flow_createWith({ dispatch, commit, state }, { props }: {props: {uuid: string} & Partial<IFlow>}): Promise<IFlow> {
    return {
      ...defaults(props, {
        name: '',
        label: '', // TODO: Remove this optional attribute once the findFlowWith( ) is able to mutate state when setting non existing key.
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

  async flow_duplicateBlock({ dispatch, commit, state }, { flowId, blockId }: {flowId: string; blockId: IBlock['uuid']}): Promise<IBlock> {
    const flow = findFlowWith(flowId || state.first_flow_id || '', state as unknown as IContext)
    const block: IBlock = findBlockWith(blockId, flow) // @throws ValidationException when block absent

    // Deep clone
    const duplicatedBlock: IBlock = cloneDeep(block) as IBlock

    // Set UUIDs, and remove non relevant props
    duplicatedBlock.uuid = await (new IdGeneratorUuidV4()).generate()

    duplicatedBlock.exits.forEach(async (item, index, arr) => {
      item.uuid = await (new IdGeneratorUuidV4()).generate()
      delete item.destination_block
    })

    if (has(duplicatedBlock.config, 'prompt')) {
      Vue.set(duplicatedBlock.config!, 'prompt', await (new IdGeneratorUuidV4()).generate())
    }

    // Set UI positions
    // @ts-ignore TODO: remove this once IBlock has vendor_metadata key
    duplicatedBlock.vendor_metadata = {
      io_viamo: {
        uiData: computeBlockPositionsFrom(block),
      },
    }

    commit('flow_addBlock', { block: duplicatedBlock })
    commit('builder/activateBlock', { blockId: duplicatedBlock.uuid }, { root: true })

    return duplicatedBlock
  },
}

export const DEFAULT_MODES = [
  SupportedMode.SMS,
  SupportedMode.USSD,
  SupportedMode.IVR]
