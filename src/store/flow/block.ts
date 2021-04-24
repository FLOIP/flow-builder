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
import { defaults, set, forEach } from 'lodash'
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
  block_setExitSemanticLabel(state, { exitId, blockId, value }: { exitId: string, blockId: string, value: string }) {
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
    findBlockExitWith(exitId, block).semantic_label = value
  },
  block_pushNewExit(state, { blockId, newExit }: {blockId: string; newExit: IBlockExit}) {
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
    block.exits.push(newExit)
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
        ...props,
        default: true,
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

  async block_segregateExitsBranching({ state, commit, dispatch }, { blockId }: { blockId: IBlock['uuid']}) {
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
    // Hide the default exit & show all other exits
    forEach(block.exits, function (exit) {
      if(exit.tag.toLowerCase() == 'default') {
        set(exit.config, 'is_visible', false)
      } else {
        set(exit.config, 'is_visible', true)
      }
    })
  },

  async block_unifyExitsBranching({ state, commit, dispatch }, { blockId }: { blockId: IBlock['uuid']}) {
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
    // Show default & error only, hide others
    forEach(block.exits, function (exit) {
      if(['default', 'error'].includes(exit.tag.toLowerCase())) {
        set(exit.config, 'is_visible', true)
      } else {
        set(exit.config, 'is_visible', false)
      }
    })
  }
}

export interface IDeepBlockExitIdWithinFlow {
  blockId: IBlock['uuid'];
  exitId: IBlockExit['uuid'];
}
