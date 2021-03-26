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
import { IdGeneratorUuidV4 } from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import moment from 'moment'
import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { IRootState } from '@/store'
import {
  defaults, includes, forEach, cloneDeep, get, has,
} from 'lodash'
import { discoverContentTypesFor } from '@/store/flow/resource'
import { computeBlockPositionsFrom } from '@/store/builder'
import { IFlowsState } from '.'

export const getters: GetterTree<IFlowsState, IRootState> = {
  activeFlow: (state) => state.flows.length && getActiveFlowFrom(state as unknown as IContext),

  hasTextMode: (state, getters) => [SupportedMode.USSD, SupportedMode.SMS].some((mode) => includes(getters.activeFlow.supported_modes || [], mode)),
  hasVoiceMode: (state, getters) => includes(getters.activeFlow.supported_modes || [], SupportedMode.IVR),
}

export const mutations: MutationTree<IFlowsState> = {
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

  flow_removeBlock(state, { flowId, blockId }: {flowId: string; blockId: IBlock['uuid']}) {
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
  },

  flow_setExitBlockId(state, { flowId, blockId }) {
    const flow: IFlow = findFlowWith(flowId, state as unknown as IContext)
    const block: IBlock = findBlockWith(blockId, flow) // @throws ValidationException when block absent
    flow.exit_block_id = block.uuid
  },

  flow_setFirstBlockId(state, { flowId, blockId }) {
    const flow: IFlow = findFlowWith(flowId, state as unknown as IContext)
    const block: IBlock = findBlockWith(blockId, flow) // @throws ValidationException when block absent
    Vue.set(flow, 'firstBlockId', block.uuid)
  },
  flow_setName(state, { flowId, value }) {
    findFlowWith(flowId, state as unknown as IContext).name = value
  },

  flow_setLabel(state, { flowId, value }) {
    findFlowWith(flowId, state as unknown as IContext).label = value
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
  // todo: this `flow_` prefix doesn't follow suit
  //       because it's actually a method on the root state // IContext-ish type
  //       (same as mutation: `flow_activateBlock` and `flow_add`
  async flow_addBlankFlow({ dispatch, commit, state }): Promise<IFlow> {
    const flow = await dispatch('flow_createWith', { props: { uuid: await (new IdGeneratorUuidV4()).generate() } })

    return await dispatch('flow_add', { flow })
  },

  async flow_add({ state }, { flow }): Promise<IFlow> {
    const length = state.flows.push(flow) // mutating here, because we need to define a root-level scope for this type of action
    if (length === 1) {
      state.first_flow_id = flow.uuid
    }

    return flow
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

  async flow_addBlankResource({ dispatch, commit }): Promise<IResourceDefinition> {
    const resource = await dispatch('resource_createWith', { props: { uuid: await (new IdGeneratorUuidV4()).generate() } })

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
        org_id: '', // awful default value, but we've typed it to string
        name: '',
        label: '', // TODO: Remove this optional attribute once the findFlowWith( ) is able to mutate state when setting non existing key.
        last_modified: moment().format('c'),
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
    const duplicatedBlock = cloneDeep(block)

    // Set UUIDs, and remove non relevant props
    duplicatedBlock.uuid = await (new IdGeneratorUuidV4()).generate()

    duplicatedBlock.exits.forEach(async (item, index, arr) => {
      item.uuid = await (new IdGeneratorUuidV4()).generate()
      delete item.destination_block
    })

    if (has(duplicatedBlock.config, 'prompt')) {
      Vue.set(duplicatedBlock.config, 'prompt', (new IdGeneratorUuidV4()).generate())
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
