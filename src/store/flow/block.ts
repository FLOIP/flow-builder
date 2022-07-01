import Vue from 'vue'
import {findBlockExitWith, findBlockOnActiveFlowWith, IBlock, IBlockExit, IBlockUIMetadata, IContext} from '@floip/flow-runner'
import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IRootState} from '@/store'
 import {defaults, get, has, isArray, last, reduce, reject, set, snakeCase, toPath} from 'lodash'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {IFlowsState} from '.'

export const getters: GetterTree<IFlowsState, IRootState> = {
  // todo: do we do all bocks in all blocks, or all blocks in [!! active flow !!]  ?
  //       the interesting bit is that resources are _all_ resources... so we could follow suit here? :shrug:
  // blocksByUuid: ({flows}) => map(resources, 'uuid')
}

export const mutations: MutationTree<IFlowsState> = {
  block_setName(state, {blockId, value}) {
    findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
      .name = value
  },
  block_setUserDefinedName(state, {blockId, value}) {
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)

    block.ui_metadata = {
      ...(block.ui_metadata ?? {}),
      has_user_defined_name: value,
    } as IBlockUIMetadata
  },
  block_setLabel(state, {blockId, value}) {
    findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
      .label = value
  },
  block_setSemanticLabel(state, {blockId, value}) {
    findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
      .semantic_label = value
  },
  block_setTags(state, {blockId, value}) {
    findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
      .tags = value
  },
  block_addTag(state, {blockId, value}) {
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
    if (isArray(block.tags)) {
      block.tags.push(value)
    } else {
      block.tags = [value]
    }
  },
  block_setExitName(state, {exitId, blockId, value}: { exitId: IBlockExit['uuid'], blockId: IBlock['uuid'], value: IBlockExit['name'] }) {
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
    findBlockExitWith(exitId, block).name = value
  },
  block_setExitTest(state, {exitId, blockId, value}: { exitId: string, blockId: string, value: IBlockExit['test'] }) {
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
    findBlockExitWith(exitId, block).test = value
  },
  block_setExitSemanticLabel(state, {exitId, blockId, value}: { exitId: string, blockId: string, value: string }) {
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
    findBlockExitWith(exitId, block).semantic_label = value
  },
  block_addExit(state, {blockId, exit}: {blockId: string, exit: IBlockExit}) {
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
    // insert before default exit
    block.exits.splice(block.exits.length - 1, 0, exit)
  },

  block_removeExit(state, {blockId, exit}: {blockId: string, exit: IBlockExit}) {
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
    block.exits = reject(block.exits, (e) => e.uuid === exit.uuid)
  },

  block_updateConfig(state, {blockId, newConfig}: { blockId: string, newConfig: object }) {
    findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
      .config = newConfig
  },
  // note that the {key} could be undefined inside `config` at block creation (eg: optional config)
  block_updateConfigByKey(state, {blockId, key, value}: { blockId: string, key: string, value: object }) {
    const currentConfig: { [key: string]: any } = findBlockOnActiveFlowWith(blockId, state as unknown as IContext).config
    currentConfig[key] = value
    findBlockOnActiveFlowWith(blockId, state as unknown as IContext).config = {...currentConfig}
  },
  block_removeConfigByKey(state, {blockId, key}: { blockId: string, key: string}) {
    const base = findBlockOnActiveFlowWith(blockId, state as unknown as IContext).config
    const chunks = key.split('.')

    let pointer = base

    while (chunks.length !== 1) {
      const name = chunks.shift()!

      if (typeof pointer[name] === 'object') {
        pointer = pointer[name]
      } else {
        throw new Error(`block_removeConfigByKey, ${name} datum is not an object`)
      }
    }

    Vue.delete(pointer, chunks[0])
  },
  /**
   * update config by path, and make nested assignment reactive for vue
   */
  block_updateConfigByPath(state, {blockId, path, value}: {blockId: string, path: string, value?: object | string | number | boolean}) {
    const base = findBlockOnActiveFlowWith(blockId, state as unknown as IContext).config
    const chunks = path.split('.')

    let pointer = base

    while (chunks.length !== 1) {
      const name = chunks.shift()!

      if (typeof pointer[name] === 'undefined') {
        Vue.set(pointer, name, {})
      }
      pointer = pointer[name]
    }

    Vue.set(pointer, chunks[0], value)
  },
  block_setBlockExitDestinationBlockId(state, {blockId, exitId, destinationBlockId}) {
    if (!destinationBlockId) {
      destinationBlockId = undefined
    }
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
    findBlockExitWith(exitId, block)
      .destination_block = destinationBlockId
  },
  block_updateVendorMetadataByPath(state, {blockId, path, value}: { blockId: string, path: string, value: object | string }) {
    // ensure reactivity
    const metadata = findBlockOnActiveFlowWith(blockId, state as unknown as IContext).vendor_metadata
    const pathAsList = toPath(path)

    // todo: I have no idea what TS is complaining about here --- "No matching method overload"
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line lodash/collection-method-value
    reduce(pathAsList, (accumulator, pathKey, i): void => {
      const nextValue = i === pathAsList.length - 1 ? value : get(accumulator, pathKey, {})
      Vue.set(accumulator, pathKey, nextValue)
      return nextValue
    }, metadata!)
  },
  block_exitClearDestinationBlockFor(_, {blockExit}) {
    blockExit.destination_block = undefined
  },
}

export const actions: ActionTree<IFlowsState, IRootState> = {
  block_setLabel({commit, dispatch}, {blockId, value}) {
    commit('block_setLabel', {blockId, value})
    dispatch('block_setName', {blockId, value: snakeCase(value)})
  },

  block_setName(
    {commit, state},
    {blockId, value, isUserDefinedName = false}: {blockId: IBlock['uuid'], value: string, isUserDefinedName: boolean},
  ) {
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
    const canSetName = block.ui_metadata?.has_user_defined_name !== true

    if (canSetName || isUserDefinedName) {
      commit('block_setName', {blockId, value})
    }

    if (isUserDefinedName) {
      commit('block_setUserDefinedName', {blockId, value: true})
    }
  },

  block_resetName({commit, state}, {blockId}) {
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)

    commit('block_setName', {blockId, value: snakeCase(block.label)})
    commit('block_setUserDefinedName', {blockId, value: false})
  },

  async block_createBlockDefaultExitWith(
    {dispatch},
    {props}: { props: { uuid: string } & Partial<IBlockExit> },
  ): Promise<IBlockExit> {
    return dispatch('block_createBlockExitWith', {
      props: defaults(props, {
          name: 'Default',
          default: true,
          // todo: fix flow-runner's handling of ".test"-less exits
          test: '',
      }),
    })
  },

  async block_createBlockExitWith(
    {dispatch, commit},
    {props}: { props: { uuid: string } & Partial<IBlockExit> },
  ): Promise<IBlockExit> {
    return {
      ...defaults(props, {
        name: '',
        vendor_metadata: {},
        // prerequisite for reactivity, even optional params
        destination_block: undefined,
        test: '',
        semantic_label: undefined,
      }),
    }
  },
  async block_updateBlockExitWith(
    {commit},
    {blockId, exitId, props: {test, name, semantic_label}}: { blockId: string, exitId: string, props: Partial<IBlockExit> },
  ) {
    // TODO - handle other props apart from test
    commit('block_setExitName', {blockId, exitId, value: name})
    commit('block_setExitTest', {blockId, exitId, value: test})
    commit('block_setExitSemanticLabel', {blockId, exitId, value: semantic_label})
  },

  async block_swapBlockExitDestinationBlockIds(
    {commit, state},
    {first, second}: { first: IDeepBlockExitIdWithinFlow, second: IDeepBlockExitIdWithinFlow },
  ) {
    if (!first || !second) {
      console.warn(`Unable to swap destinationBlockId on null: ${JSON.stringify({first, second})}`)
      return
    }

    const firstBlock = findBlockOnActiveFlowWith(first.blockId, state as unknown as IContext)
    const secondBlock = findBlockOnActiveFlowWith(second.blockId, state as unknown as IContext)

    const {destination_block: firstDestinationBlockId} = findBlockExitWith(first.exitId, firstBlock)
    const {destination_block: secondDestinationBlockId} = findBlockExitWith(second.exitId, secondBlock)

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

  // TODO in VMO-6181: update the name & definition to correspond for MCQ context, no more block is using this apart from MCQ
  async block_convertExitFormationToUnified({state, dispatch}, {blockId, test}: {blockId: IBlock['uuid'], test: IBlockExit['test']}) {
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
    const primaryExitProps: Partial<IBlockExit> = {
      uuid: await (new IdGeneratorUuidV4()).generate(),
      name: '1',
      test,
    }

    block.exits = [
      await dispatch('block_createBlockExitWith', {props: primaryExitProps}),
      last(block.exits),
    ]
  },

  /**
   * Update exits after the block creation.
   * Standard exit where the end user can make an error. We have 02 exits:
   * - Valid
   * - Invalid
   */
  async block_updateBranchingExitsWithInvalidScenario({state, dispatch}, {blockId, test}: {blockId: IBlock['uuid'], test: IBlockExit['test']}) {
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
    const primaryExitProps: Partial<IBlockExit> = {
      uuid: await (new IdGeneratorUuidV4()).generate(),
      name: 'Valid',
      test,
    }

    block.exits = [
      await dispatch('block_createBlockExitWith', {props: primaryExitProps}),
      // the last exit is the Default one, which handles the invalid scenario
      last(block.exits),
    ]
  },

  /**
   * Update exits after the block creation.
   * Standard exit mode where the user can’t provide invalid response. We have 01 single exit `Default`
   */
  async block_updateBranchingExitsToDefaultOnly({state, dispatch}, {blockId}: {blockId: IBlock['uuid']}) {
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)

    block.exits = [
      // the last exit is the Default one
      last(block.exits) as IBlockExit,
    ]
  },

  async block_select({state}, {blockId}: { blockId: IBlock['uuid'] }) {
    state.selectedBlocks.push(blockId)
  },

  async block_deselect({state}, {blockId}: { blockId: IBlock['uuid'] }) {
    // remove it
    state.selectedBlocks = state.selectedBlocks.filter((item) => item !== blockId)
  },
}

export interface IDeepBlockExitIdWithinFlow {
  blockId: IBlock['uuid'],
  exitId: IBlockExit['uuid'],
}

/**
 * Is the block interactive ?
 * Another meaning: will the user get response when interacting with it?
 * @param block
 */
export function isBlockInteractive(block: IBlock): boolean {
  return has(block.config, 'prompt')
}
