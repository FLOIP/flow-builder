import Vue from 'vue'
import {
  IContext,
  IBlock,
  IBlockExit,
  IResourceDefinition,
  findBlockExitWith,
  ValidationException,
  findBlockOnActiveFlowWith,
} from '@floip/flow-runner'
import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { IRootState } from '@/store'
import {defaults, set, get, isNil, find, filter} from 'lodash'
import { IdGeneratorUuidV4 } from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import { IFlowsState } from '.'
import { popFirstEmptyItem } from './utils/listBuilder'

export const getters: GetterTree<IFlowsState, IRootState> = {
  // todo: do we do all bocks in all blocks, or all blocks in [!! active flow !!]  ?
  //       the interesting bit is that resources are _all_ resources... so we could follow suit here? :shrug:
  // blocksByUuid: ({flows}) => map(resources, 'uuid')
}

export const mutations: MutationTree<IFlowsState> = {
  block_popFirstExitWithoutTest(state, { blockId }: {blockId: string}) {
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
    block.exits = popFirstEmptyItem(block.exits, 'test')
  },
  block_popExitsByLabel(state, { blockId, exitLabel }: {blockId: string; exitLabel: string}) {
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
    block.exits = block.exits.filter((item: IBlockExit) => item.label !== exitLabel)
  },
  block_setName(state, { blockId, value }) {
    findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
      .name = value
  },
  block_setLabel(state, { blockId, value }) {
    findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
      .label = value
  },
  block_setSemanticLabel(state, { blockId, value }) {
    findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
      .semantic_label = value
  },
  block_setExitTag(state, { exitId, blockId, value }: {exitId: string; blockId: string; value: string}) {
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
    findBlockExitWith(exitId, block).tag = value
  },
  block_setExitTest(state, { exitId, blockId, value }: {exitId: string; blockId: string; value: string}) {
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
    findBlockExitWith(exitId, block).test = value
  },
  block_setExitConfigByPath(state, { exitId, blockId, path, value }: {exitId: string; blockId: string; path: string; value: object | string}) {
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
    set(findBlockExitWith(exitId, block).config, path, value)
  },
  block_setExitSemanticLabel(state, { exitId, blockId, value }: { exitId: string, blockId: string, value: string }) {
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
    findBlockExitWith(exitId, block).semantic_label = value
  },
  block_pushNewExit(state, { blockId, newExit, insertAtIndex = undefined, shouldUseCache = false }: {blockId: string; newExit: IBlockExit, insertAtIndex: number | undefined, shouldUseCache: boolean}) {
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
    const blockExits = findBlockExitsRef(block, shouldUseCache)

    if (!isNil(insertAtIndex)) { // insertion, eg: case for block types having branching exits option (Segregated | Unified)
      blockExits.splice(insertAtIndex, 0, newExit);
    } else { // just push
      blockExits.push(newExit);
    }
  },
  block_updateConfig(state, { blockId, newConfig }: {blockId: string; newConfig: object}) {
    findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
      .config = newConfig
  },
  block_updateConfigByKey(state, { blockId, key, value }: {blockId: string; key: string; value: object}) { // note that the {key} could be undefined inside `config` at block creation (eg: optional config)
    const currentConfig: {[key: string]: any} = findBlockOnActiveFlowWith(blockId, state as unknown as IContext).config
    currentConfig[key] = value
    findBlockOnActiveFlowWith(blockId, state as unknown as IContext).config = { ...currentConfig }
  },
  block_updateConfigByPath(state, { blockId, path, value }: { blockId: string, path: string, value: object | string }) {
    set(findBlockOnActiveFlowWith(blockId, state as unknown as IContext).config, path, value);
  },
  block_setBlockExitDestinationBlockId(state, { blockId, exitId, destinationBlockId }) {
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
    findBlockExitWith(exitId, block)
      .destination_block = destinationBlockId
  },
  block_updateVendorMetadataByPath(state, { blockId, path, value }: { blockId: string, path: string, value: object | string }) {
    // @ts-ignore TODO: remove this once IBlock has vendor_metadata key
    set(findBlockOnActiveFlowWith(blockId, state as unknown as IContext).vendor_metadata, path, value);
  },
}

export const actions: ActionTree<IFlowsState, IRootState> = {
  async block_createBlockDefaultExitWith({ dispatch, commit, state }, { props }: {props: {uuid: string} & Partial<IBlockExit>}): Promise<IBlockExit> {
    return await dispatch('block_createBlockExitWith', {
      props: {
        ...defaults(props, { default: true })
      },
    })
  },

  async block_createBlockExitWith({ dispatch, commit, state }, { props }: {props: {uuid: string} & Partial<IBlockExit>}): Promise<IBlockExit> {
    const resource: IResourceDefinition = await dispatch('resource_createWith', { props: { uuid: await (new IdGeneratorUuidV4()).generate() } })

    commit('resource_add', { resource })

    return {
      ...defaults(props, {
        label: resource.uuid,
        tag: '',
        config: {},
        destination_block: undefined, // prerequisite for reactivity, even optional params
      }),
    }
  },
  async block_updateBlockExitWith({ dispatch, commit, state }, { blockId, exitId, props: { test, tag, semantic_label } }: {blockId: string; exitId: string; props: Partial<IBlockExit>}) {
    // TODO - handle other props apart from test
    commit('block_setExitTag', { blockId, exitId, value: tag })
    commit('block_setExitTest', { blockId, exitId, value: test })
    commit('block_setExitSemanticLabel', { blockId, exitId, value: semantic_label })
  },

  async block_swapBlockExitDestinationBlockIds(
    { commit, state },
    { first, second }: {first: IDeepBlockExitIdWithinFlow; second: IDeepBlockExitIdWithinFlow},
  ) {
    if (!first || !second) {
      throw new ValidationException(`Unable to swap destinationBlockId on null: ${JSON.stringify({ first, second })}`)
    }

    const firstBlock = findBlockOnActiveFlowWith(first.blockId, state as unknown as IContext)
    const secondBlock = findBlockOnActiveFlowWith(second.blockId, state as unknown as IContext)

    const { destination_block: firstDestinationBlockId } = findBlockExitWith(first.exitId, firstBlock)
    const { destination_block: secondDestinationBlockId } = findBlockExitWith(second.exitId, secondBlock)

    // todo: this works only when the exit we're targetting is empty
    // todo: blah --- a repaint from HMR redraws it correctly -- why?!
    // todo: blah --- a repaint from HMR also draws an additional exit :( Is there a cache break on connection key we need to leverage here?

    commit('block_setBlockExitDestinationBlockId', {
      blockId: second.blockId,
      exitId: second.exitId,
      destinationBlockId: firstDestinationBlockId,
    })

    commit('block_setBlockExitDestinationBlockId', {
      blockId: first.blockId,
      exitId: first.exitId,
      destinationBlockId: secondDestinationBlockId,
    })
  },
}

export interface IDeepBlockExitIdWithinFlow {
  blockId: IBlock['uuid'];
  exitId: IBlockExit['uuid'];
}

export function findBlockExitsRef(block: IBlock, shouldUseCache = false) {
  if (shouldUseCache) {
    console.debug('Using block exits from cache')
    // @ts-ignore: TODO: remove this once IBlock has vendor_metadata key
    return get(block.vendor_metadata, 'io_viamo.cache.outputBranching.segregatedExits')
  } else {
    console.debug('Not using block exits from cache')
    return block.exits
  }
}

export function findExitFromResourceUuid(resourceUuid: string, block: IBlock, shouldUseCache = false): IBlockExit {
  const blockExits = findBlockExitsRef(block, shouldUseCache)
  const blockExit = find(blockExits, { label: resourceUuid }) as IBlockExit
  return blockExit
}
