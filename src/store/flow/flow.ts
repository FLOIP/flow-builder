import Vue from 'vue'
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
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import moment from 'moment'
import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IFlowsState} from '.'
import {IRootState} from '@/store'
import {defaults, includes, forEach, cloneDeep, get} from 'lodash'
import {discoverContentTypesFor} from '@/store/flow/resource'

export const getters: GetterTree<IFlowsState, IRootState> = {
  activeFlow: state => state.flows.length && getActiveFlowFrom(state as unknown as IContext),

  hasTextMode: (state, getters) => [SupportedMode.USSD, SupportedMode.SMS].some(mode => includes(getters.activeFlow.supportedModes || [], mode)),
  hasVoiceMode: (state, getters) => includes(getters.activeFlow.supportedModes || [], SupportedMode.IVR)
}

export const mutations: MutationTree<IFlowsState> = {
  flow_addBlock(state, {flowId, block}: {flowId: string, block: IBlock}) {
    if (block == null) {
      throw new ValidationException('Unable to add null block to flow')
    }

    const flow = findFlowWith(flowId || state.firstFlowId || '', state as unknown as IContext)
    const length = flow.blocks.push(block)

    if (length === 1) {
      flow.firstBlockId = block.uuid
    }
  },

  flow_removeBlock(state, {flowId, blockId}: {flowId: string, blockId: IBlock['uuid']}) {
    const flow = findFlowWith(flowId || state.firstFlowId || '', state as unknown as IContext)
    const block: IBlock = findBlockWith(blockId, flow)  // @throws ValidationException when block absent

    if (block == null) {
      throw new ValidationException('Unable to delete block absent from flow')
    }

    const {blocks} = flow
    blocks.splice(
      blocks.indexOf(block),
      1)

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


    forEach(blocks, ({exits}) => {
      const exitsTowardUs = exits.filter(e => e.destinationBlock === blockId)
      forEach(exitsTowardUs, e => e.destinationBlock = undefined)
    })

    this.state.builder.activeBlockId = null
  },

  flow_setExitBlockId(state, {flowId, blockId}) {
    const flow: IFlow = findFlowWith(flowId, state as unknown as IContext)
    const block: IBlock = findBlockWith(blockId, flow)  // @throws ValidationException when block absent
    flow.exitBlockId = block.uuid
  },

  flow_setFirstBlockId(state, {flowId, blockId}) {
    const flow: IFlow = findFlowWith(flowId, state as unknown as IContext)
    const block: IBlock = findBlockWith(blockId, flow)  // @throws ValidationException when block absent
    Vue.set(flow, 'firstBlockId', block.uuid)
  },
  flow_setName(state, {flowId, value}) {
    findFlowWith(flowId, state as unknown as IContext).name = value
  },

  flow_setLabel(state, {flowId, value}) {
    findFlowWith(flowId, state as unknown as IContext).label = value
  },

  flow_setInteractionTimeout(state, {flowId, value}) {
    findFlowWith(flowId, state as unknown as IContext).interactionTimeout = value
  },

  flow_setSupportedMode(state, {flowId, value}) {
    const flow: IFlow = findFlowWith(flowId, state as unknown as IContext)
    flow.supportedModes = Array.isArray(value) ? value : [value]
  },

  flow_setLanguages(state, {flowId, value}) {
    const flow: IFlow = findFlowWith(flowId, state as unknown as IContext)
    flow.languages = Array.isArray(value) ? value : [value]
  },
}

export const actions: ActionTree<IFlowsState, IRootState> = {
  // todo: this `flow_` prefix doesn't follow suit
  //       because it's actually a method on the root state // IContext-ish type
  //       (same as mutation: `flow_activateBlock` and `flow_add`
  async flow_addBlankFlow({dispatch, commit, state}): Promise<IFlow> {
    const flow = await dispatch('flow_createWith', {
      props: {uuid: (new IdGeneratorUuidV4).generate()}})

    return await dispatch('flow_add', {flow})
  },

  async flow_add({state}, {flow}): Promise<IFlow> {
    const length = state.flows.push(flow) // mutating here, because we need to define a root-level scope for this type of action
    if (length === 1) {
      state.firstFlowId = flow.uuid
    }

    return flow
  },

  async flow_addBlankBlockByType({commit, dispatch, state}, {type, ...props}: Partial<IBlock>): Promise<IBlock> {
    // if (!state[type]) {
      // todo: for some reason {snakeCase} from 'lodash' doesn't work?
      // todo: for some reason dynamic imports aren't working w/ storybook build
      // const modulePath = `./block-types/${type.replace('\\', '_')}BlockStore.ts`
      // const store = await import(modulePath)

      // this.registerModule(['flow', BLOCK_TYPE], store)
    // }

    const block = await dispatch(`flow/${type}/createWith`, { // standardize this for each block type
      props: {
        uuid: (new IdGeneratorUuidV4).generate(),
        ...props,
      }
    }, {root: true})

    defaults(block, { // a key is prerequisite for reactivity, even optional params
      label: undefined,
      semanticLabel: undefined})

    commit('flow_addBlock', {block})

    return block
  },

  async flow_addBlankResource({dispatch, commit}): Promise<IResourceDefinition> {
    const resource = await dispatch('resource_createWith', {
      props: {uuid: (new IdGeneratorUuidV4).generate()}})

    commit('resource_add', {resource})

    return resource
  },
  async flow_addBlankResourceForEnabledModesAndLangs({getters, dispatch, commit}): Promise<IResourceDefinition> {
    //TODO - figure out of there should only be one value here at first? How would the resource editor change this?
    //TODO - is this right for setup of languages?
    //TODO - How will we add more blank values as supported languages are changed in the flow? We should probably also do this for modes rather than doing all possible modes here.
    const values: IResourceDefinitionContentTypeSpecific = getters['activeFlow'].languages.reduce((memo: object[], language: {id: string, name: string}) => {
      //Let's just create all the modes. We might need them but if they are switched off they just don't get used
      Object.values(SupportedMode).forEach((mode: SupportedMode) => {
        memo.push({
          languageId: language.id,
          value: '',
          contentType: discoverContentTypesFor(mode),
          modes: [
            mode
          ],
        })
      })

      return memo
    }, [])

    const blankResource = await dispatch('resource_createWith', {
      props: {
        uuid: (new IdGeneratorUuidV4()).generate(),
        values: values,
      },
    })

    commit('resource_add', {resource: blankResource})

    return blankResource
  },

  async flow_createWith({dispatch, commit, state}, {props}: {props: {uuid: string} & Partial<IFlow>}): Promise<IFlow> {
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

  async flow_duplicateBlock({dispatch, commit, state}, {flowId, blockId}: {flowId: string, blockId: IBlock['uuid']}): Promise<IBlock> {
    const flow = findFlowWith(flowId || state.firstFlowId || '', state as unknown as IContext)
    const block: IBlock = findBlockWith(blockId, flow)  // @throws ValidationException when block absent

    let duplicatedBlock = cloneDeep(block)

    duplicatedBlock.uuid = (new IdGeneratorUuidV4).generate()
    duplicatedBlock.platform_metadata = {
      io_viamo: {
        uiData: {
          xPosition: get(block, 'platform_metadata.io_viamo.uiData.xPosition', 50) + 80,
          yPosition: get(block, 'platform_metadata.io_viamo.uiData.yPosition', 50) + 80,
        }
      }
    }

    commit('flow_addBlock', {block: duplicatedBlock})

    return duplicatedBlock
  },
}

export const DEFAULT_MODES = [
  SupportedMode.SMS,
  SupportedMode.USSD,
  SupportedMode.IVR]
