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
  IResourceDefinition,
  ValidationException, IResourceDefinitionContentTypeSpecific,
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
import { router } from '@/router'
import { IFlowsState } from '.'

export const getters: GetterTree<IFlowsState, IRootState> = {
  //We allow for an attempt to get a flow which doesn't yet exist in the state - e.g. the firstFlowId doesn't correspond to a flow
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
      platform_metadata: {},
      flows: state.flows,
      resources: state.resources
    } as unknown as IContext
  },
  hasTextMode: (state, getters) => [SupportedMode.USSD, SupportedMode.SMS].some((mode) => includes(getters.activeFlow.supportedModes || [], mode)),
  hasVoiceMode: (state, getters) => includes(getters.activeFlow.supportedModes || [], SupportedMode.IVR),
  hasOfflineMode: (state, getters) => includes(getters.activeFlow.supportedModes || [], SupportedMode.OFFLINE),
  getFlowsState: (state) => state,
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
    state.firstFlowId = flowId
  },
  flow_addBlock(state, { flowId, block }: {flowId: string; block: IBlock}) {
    if (block == null) {
      throw new ValidationException('Unable to add null block to flow')
    }

    const flow = findFlowWith(flowId || state.firstFlowId || '', state as unknown as IContext)
    const length = flow.blocks.push(block)

    if (length === 1) {
      flow.firstBlockId = block.uuid
    }
  },

  flow_removeBlock(state, { flowId, blockId }: {flowId: string; blockId: IBlock['uuid']}) {
    const flow = findFlowWith(flowId || state.firstFlowId || '', state as unknown as IContext)
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
    // 1. flow.firstBlockId
    // 2. flow.exitBlockId
    // 3. flow.blocks.*.exits.*.destinationBlock
    // 4. activeBlockId (we should likely trail a ghost of previous selection and select that one next)

    // todo: convert this whole operation to an ActionTree member
    // todo: use mutations for these:
    if (flow.firstBlockId === blockId) {
      flow.firstBlockId = '' // todo: make this optional for builder
    }

    if (flow.exitBlockId === blockId) {
      flow.exitBlockId = undefined
    }

    forEach(blocks, ({ exits }) => {
      const exitsTowardUs = exits.filter((e) => e.destinationBlock === blockId)
      forEach(exitsTowardUs, (e) => e.destinationBlock = undefined)
    })

    // @ts-ignore
    this.state.builder.activeBlockId = null
  },

  flow_setExitBlockId(state, { flowId, blockId }) {
    const flow: IFlow = findFlowWith(flowId, state as unknown as IContext)
    const block: IBlock = findBlockWith(blockId, flow) // @throws ValidationException when block absent
    flow.exitBlockId = block.uuid
  },

  flow_setFirstBlockId(state, { flowId, blockId }) {
    const flow: IFlow = findFlowWith(flowId, state as unknown as IContext)
    const block: IBlock = findBlockWith(blockId, flow) // @throws ValidationException when block absent
    Vue.set(flow, 'firstBlockId', block.uuid)
  },
  flow_setNameFromLabel(state, {flowId, label}) {
    findFlowWith(flowId, state as unknown as IContext).name = label.replace(/\W+/g, '')
  },

  flow_setLabel(state, { flowId, label }) {
    findFlowWith(flowId, state as unknown as IContext).label = label 
  },

  flow_setInteractionTimeout(state, { flowId, value }) {
    findFlowWith(flowId, state as unknown as IContext).interactionTimeout = value
  },

  flow_setSupportedMode(state, { flowId, value }) {
    const flow: IFlow = findFlowWith(flowId, state as unknown as IContext)
    flow.supportedModes = Array.isArray(value) ? value : [value]
  },

  flow_setLanguages(state, { flowId, value }) {
    const flow: IFlow = findFlowWith(flowId, state as unknown as IContext)
    flow.languages = Array.isArray(value) ? value : [value]
  },
}

export const actions: ActionTree<IFlowsState, IRootState> = {

  async flow_persist({ state, getters, commit }, { persistRoute, flowContainer }): Promise<IContext> {
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
  async flow_fetch({ state, getters, commit }, { fetchRoute }): Promise<IContext> {
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
    const flow = await dispatch('flow_createWith', { props: { uuid: (new IdGeneratorUuidV4()).generate() } })

    return await dispatch('flow_add', { flow })
  },

  async flow_add({ state }, { flow }): Promise<IFlow> {
    const length = state.flows.push(flow) // mutating here, because we need to define a root-level scope for this type of action
    //TODO - understand why this was here? Surely we can have an active flow that isn't the first and only one?
    //if (length === 1) {
      state.firstFlowId = flow.uuid
    //}

    return flow
  },

  async flow_addBlankBlockByType({ commit, dispatch, state }, { type, ...props }: Partial<IBlock>): Promise<IBlock> {
    // if (!state[type]) {
    // todo: for some reason {snakeCase} from 'lodash' doesn't work?
    // todo: for some reason dynamic imports aren't working w/ storybook build
    // const modulePath = `./block-types/${type.replace('\\', '_')}BlockStore.ts`
    // const store = await import(modulePath)

    // this.registerModule(['flow', BLOCK_TYPE], store)
    // }

    const block = await dispatch(`flow/${type}/createWith`, { // todo: standardize this for each block type
      props: {
        uuid: (new IdGeneratorUuidV4()).generate(),
        ...props,
      },
    }, { root: true })

    defaults(block, { // a key is prerequisite for reactivity, even optional params
      label: undefined,
      semanticLabel: undefined,
    })

    commit('flow_addBlock', { block })

    return block
  },

  async flow_addBlankResource({ dispatch, commit }): Promise<IResourceDefinition> {
    const resource = await dispatch('resource_createWith', { props: { uuid: (new IdGeneratorUuidV4()).generate() } })

    commit('resource_add', { resource })

    return resource
  },
  async flow_addBlankResourceForEnabledModesAndLangs({ getters, dispatch, commit }): Promise<IResourceDefinition> {
    // TODO - figure out of there should only be one value here at first? How would the resource editor change this?
    // TODO - is this right for setup of languages?
    // TODO - How will we add more blank values as supported languages are changed in the flow? We should probably also do this for modes rather than doing all possible modes here.
    const values: IResourceDefinitionContentTypeSpecific = getters.activeFlow.languages.reduce((memo: object[], language: {id: string; name: string}) => {
      // Let's just create all the modes. We might need them but if they are switched off they just don't get used
      Object.values(SupportedMode).forEach((mode: SupportedMode) => {
        memo.push({
          languageId: language.id,
          value: '',
          contentType: discoverContentTypesFor(mode),
          modes: [
            mode,
          ],
        })
      })

      return memo
    }, [])

    const blankResource = await dispatch('resource_createWith', {
      props: {
        uuid: (new IdGeneratorUuidV4()).generate(),
        values,
      },
    })

    commit('resource_add', { resource: blankResource })

    return blankResource
  },

  async flow_createWith({ dispatch, commit, state }, { props }: {props: {uuid: string} & Partial<IFlow>}): Promise<IFlow> {
    return {
      ...defaults(props, {
        orgId: '', // awful default value, but we've typed it to string
        name: '',
        label: '', // TODO: Remove this optional attribute once the findFlowWith( ) is able to mutate state when setting non existing key.
        lastModified: moment().format('c'),
        interactionTimeout: 30,
        platformMetadata: {},

        supportedModes: DEFAULT_MODES,
        languages: [],
        blocks: [],

        firstBlockId: '',
      }),
    }
  },

  async flow_duplicateBlock({ dispatch, commit, state }, { flowId, blockId }: {flowId: string; blockId: IBlock['uuid']}): Promise<IBlock> {
    const flow = findFlowWith(flowId || state.firstFlowId || '', state as unknown as IContext)
    const block: IBlock = findBlockWith(blockId, flow) // @throws ValidationException when block absent

    // Deep clone
    const duplicatedBlock = cloneDeep(block)

    // Set UUIDs, and remove non relevant props
    duplicatedBlock.uuid = (new IdGeneratorUuidV4()).generate()

    duplicatedBlock.exits.forEach((item, index, arr) => {
      item.uuid = (new IdGeneratorUuidV4()).generate()
      delete item.destinationBlock
    })

    if (has(duplicatedBlock.config, 'prompt')) {
      // @ts-ignore
      duplicatedBlock.config.prompt = (new IdGeneratorUuidV4()).generate()
    }

    // Set UI positions
    // TODO - type checking - remove this and resolve the error
    // @ts-ignore
    duplicatedBlock.platform_metadata = {
      io_viamo: {
        uiData: computeBlockPositionsFrom(block),
      },
    }

    commit('flow_addBlock', { block: duplicatedBlock })

    router.replace({
      name: 'block-selected-details',
      params: { blockId: duplicatedBlock.uuid },
    })

    return duplicatedBlock
  },
}

export const DEFAULT_MODES = [
  SupportedMode.SMS,
  SupportedMode.USSD,
  SupportedMode.IVR]
