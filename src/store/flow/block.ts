import {
  IContext,
  IBlock,
  IBlockExit,
  IResourceDefinition,
  findBlockExitWith,
  findBlockOnActiveFlowWith,
  ValidationException,
} from '@floip/flow-runner'
import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IFlowsState} from '.'
import {IRootState} from '@/store'
import {defaults} from 'lodash'
import IdGeneratorUuidV4 from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'

export const getters: GetterTree<IFlowsState, IRootState> = {
  activeBlock: (state: IFlowsState) => state.flows.length
    && state.activeBlock
    && findBlockOnActiveFlowWith(state.activeBlock, state as unknown as IContext) || null,

  // todo: do we do all bocks in all blocks, or all blocks in [!! active flow !!]  ?
  //       the interesting bit is that resources are _all_ resources... so we could follow suit here? :shrug:
  // blocksByUuid: ({flows}) => map(resources, 'uuid')
}

export const mutations: MutationTree<IFlowsState> = {
  block_setLabel(state, {blockId, value}) {
    findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
      .label = value
  },

  block_setBlockExitDestinationBlockId(state, {blockId, exitId, destinationBlockId}) {
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
    findBlockExitWith(exitId, block)
        .destinationBlock = destinationBlockId
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

  async block_swapBlockExitDestinationBlockIds(
      {commit, state},
      {first, second}: {first: IDeepBlockExitIdWithinFlow, second: IDeepBlockExitIdWithinFlow}) {

    if (!first || !second) {
      throw new ValidationException(`Unable to swap destinationBlockId on null: ${JSON.stringify({first, second})}`)
    }

    const firstBlock = findBlockOnActiveFlowWith(first.blockId, state as unknown as IContext)
    const secondBlock = findBlockOnActiveFlowWith(second.blockId, state as unknown as IContext)

    const {destinationBlock: firstDesinationBlockId} = findBlockExitWith(first.exitId, firstBlock)
    const {destinationBlock: secondDesinationBlockId} = findBlockExitWith(second.exitId, secondBlock)

    commit('block_setBlockExitDestinationBlockId', {
      blockId: first.blockId,
      exitId: first.exitId,
      destinationBlockId: secondDesinationBlockId})

    commit('block_setBlockExitDestinationBlockId', {
      blockId: second.blockId,
      exitId: second.exitId,
      destinationBlockId: firstDesinationBlockId})
  },
}

export interface IDeepBlockExitIdWithinFlow {
  blockId: IBlock['uuid'],
  exitId: IBlockExit['uuid'],
}
