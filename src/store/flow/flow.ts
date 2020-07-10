import {
  findBlockWith,
  findFlowWith,
  getActiveFlowFrom,
  SupportedMode,
  SupportedContentType,
  IBlock,
  IContext,
  IFlow,
  IResourceDefinition
} from '@floip/flow-runner'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import moment from 'moment'
import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IFlowsState} from '.'
import {IRootState} from '@/store'
import {defaults, snakeCase} from 'lodash'

export const getters: GetterTree<IFlowsState, IRootState> = {
  activeFlow: state => state.flows.length && getActiveFlowFrom(state as unknown as IContext)
}

export const mutations: MutationTree<IFlowsState> = {
  flow_activateBlock(state, {blockId}: {blockId: string}) {
    state.activeBlock = blockId
  },

  flow_addBlock(state, {flowId, block}: {flowId: string, block: IBlock}) {
    const flow = findFlowWith(flowId || state.firstFlowId || '', state as unknown as IContext)
    const length = flow.blocks.push(block)

    if (length === 1) {
      flow.firstBlockId = block.uuid
    }
  },

  flow_setExitBlockId(state, {flowId, blockId}) {
    const flow: IFlow = findFlowWith(flowId, state as unknown as IContext)
    const block: IBlock = findBlockWith(blockId, flow)  // @throws ValidationException when block absent
    flow.exitBlockId = block.uuid
  },

  flow_setFirstBlockId(state, {flowId, blockId}) {
    const flow: IFlow = findFlowWith(flowId, state as unknown as IContext)
    const block: IBlock = findBlockWith(blockId, flow)  // @throws ValidationException when block absent
    flow.firstBlockId = block.uuid
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

  async flow_addBlankBlockByType({commit, dispatch, state}, {type}: {type: string}): Promise<IBlock> {
    // if (!state[type]) {
      // todo: for some reason {snakeCase} from 'lodash' doesn't work?
      // todo: for some reason dynamic imports aren't working w/ storybook build
      // const modulePath = `./block-types/${type.replace('\\', '_')}BlockStore.ts`
      // const store = await import(modulePath)

      // this.registerModule(['flow', BLOCK_TYPE], store)
    // }

    const block = await dispatch(`flow/${type}/createWith`, { // standardize this for each block type
      props: {uuid: (new IdGeneratorUuidV4).generate()}
    }, {root: true})

    commit('flow_addBlock', {block})

    return block
  },

  async flow_addBlankResource({dispatch, commit}): Promise<IResourceDefinition> {
    const resource = await dispatch('resource_createWith', {
      props: {uuid: (new IdGeneratorUuidV4).generate()}})

    commit('resource_add', {resource})

    return resource
  },

  async flow_createWith({dispatch, commit, state}, {props}: {props: {uuid: string} & Partial<IFlow>}): Promise<IFlow> {
    return {
      ...defaults(props, {
        orgId: '', // awful default value, but we've typed it to string
        name: '',
        lastModified: moment().format('c'),
        interactionTimeout: 30,
        platformMetadata: {},

        supportedModes: DEFAULT_MODES,
        languages: [],
        blocks: [],

        firstBlockId: '',
      }),
    }
  }
}

export const DEFAULT_MODES = [
  SupportedMode.SMS,
  SupportedMode.USSD,
  SupportedMode.IVR]
