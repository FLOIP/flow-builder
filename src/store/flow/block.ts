import {findBlockOnActiveFlowWith, IContext, IBlockExit, IResourceDefinition} from '@floip/flow-runner'
import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IFlowsState} from '.'
import {IRootState} from '@/store'
import {defaults, without} from 'lodash'
import IdGeneratorUuidV4 from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import { popFirstEmptyItem } from './utils/listBuilder'

export const getters: GetterTree<IFlowsState, IRootState> = {
  activeBlock: (state: IFlowsState) => state.flows.length
    && state.activeBlock
    && findBlockOnActiveFlowWith(state.activeBlock, state as unknown as IContext) || null,

  // todo: do we do all bocks in all blocks, or all blocks in [!! active flow !!]  ?
  //       the interesting bit is that resources are _all_ resources... so we could follow suit here? :shrug:
  // blocksByUuid: ({flows}) => map(resources, 'uuid')
}

export const mutations: MutationTree<IFlowsState> = {
  block_popFirstExitWithoutTest(state, {blockId}: {blockId: string}) {
    //TODO - this shouldn't be necessary
    // @ts-ignore - TS2339: Property 'flow' does not exist on type
    const block = findBlockOnActiveFlowWith(blockId, this.state.flow as unknown as IContext)
    block.exits = popFirstEmptyItem(block.exits, "test")
  },
  block_popExitsByLabel(state, {blockId, exitLabel}: {blockId: string, exitLabel: string}) {
    //TODO - this shouldn't be necessary
    // @ts-ignore - TS2339: Property 'flow' does not exist on type
    const block = findBlockOnActiveFlowWith(blockId, this.state.flow as unknown as IContext)
    block.exits = block.exits.filter((item: IBlockExit) => {
      return item.label !== exitLabel
    })
  },
  block_setName(state, {blockId, value}) {
    findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
      .name = value
  },
  block_setLabel(state, {blockId, value}) {
    findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
      .label = value
  },
  block_setSemanticLabel(state, {blockId, value}) {
    findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
      .semanticLabel = value
  },
  block_setExitTest(state, {exitId, blockId, value}: {exitId: string, blockId: string, value: string}) {
    const exits = findBlockOnActiveFlowWith(blockId, state as unknown as IContext).exits
    const exit = exits.find(exit => exit.uuid === exitId) || null;
    if (exit) {
      exit.test = value
    }
  },
  block_pushNewExit(state, { blockId, newExit }: {blockId: string, newExit: IBlockExit}) {
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
    block.exits.push(newExit)
  },
  block_updateConfig(state, {blockId, newConfig}: {blockId: string, newConfig: object}) {
    findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
      .config = newConfig
  },
  block_updateConfigByKey(state, {blockId, key, value}: {blockId: string, key: string, value: object}) { // note that the {key} could be undefined inside `config` at block creation (eg: optional config)
    let currentConfig: {[key: string]: any} = findBlockOnActiveFlowWith(blockId, state as unknown as IContext).config
    currentConfig[key] = value
    findBlockOnActiveFlowWith(blockId, state as unknown as IContext).config = {...currentConfig}
  },
}

export const actions: ActionTree<IFlowsState, IRootState> = {
  async block_createBlockDefaultExitWith({dispatch, commit, state}, {props}: {props: {uuid: string} & Partial<IBlockExit>}): Promise<IBlockExit> {
    return await dispatch('block_createBlockExitWith', {
      props: {
        ...props,
        default: true}})
  },

  async block_createBlockExitWith({dispatch, commit, state}, {props}: {props: {uuid: string} & Partial<IBlockExit>}): Promise<IBlockExit> {
    const resource: IResourceDefinition = await dispatch('resource_createWith', {
      props: {uuid: (new IdGeneratorUuidV4).generate()}})

    commit('resource_add', {resource})

    return {
      ...defaults(props, {
        label: resource.uuid,
        tag: '',
        config: {},
      }),
    }
  },
  async block_updateBlockExitWith({dispatch, commit, state}, {blockId, exitId, value}: {blockId: string, exitId: string, value: string}) {
    //TODO - handle other props apart from test
    commit('block_setExitTest', {blockId, exitId, value})
  },
}
