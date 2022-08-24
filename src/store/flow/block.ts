import Vue from 'vue'
import {
  findBlockExitWith,
  findBlockOnActiveFlowWith,
  IBlock,
  IBlockExit,
  IContext,
  ILanguage,
} from '@floip/flow-runner'
import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {defaults, has, isArray, isNil, last, reject, snakeCase} from 'lodash'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {OutputBranchingType} from '@/components/interaction-designer/block-editors/BlockOutputBranchingConfig.vue'
import {BLOCK_TYPE as SelectOneBlockType} from '@/store/flow/block-types/MobilePrimitives_SelectOneResponseBlockStore'
import {BLOCK_TYPE as SelectManyBlockType} from '@/store/flow/block-types/MobilePrimitives_SelectManyResponseBlockStore'
import {ISelectOneResponseBlock} from '@floip/flow-runner/src/model/block/ISelectOneResponseBlock'
import * as SetContactPropertyModule from './block/set-contact-property'
import {IFlowsState} from '.'
import {removeBlockValueByPath, updateBlockValueByPath} from './utils/vuexBlockHelpers'

export const getters: GetterTree<IFlowsState, IRootState> = {
  ...SetContactPropertyModule.getters,

  // todo: do we do all bocks in all blocks, or all blocks in [!! active flow !!]  ?
  //       the interesting bit is that resources are _all_ resources... so we could follow suit here? :shrug:
  // blocksByUuid: ({flows}) => map(resources, 'uuid')
  block_classesConfig(_state, _getters, rootState): Record<string, object> {
    return rootState.trees.ui.blockClasses
  },

  block_shouldHave2Exits: (state, getters) => (blockType: string): boolean => {
    const blockDefinition = getters.block_classesConfig[blockType]
    const primaryExitName = blockDefinition?.exits?.primary?.name
    const defaultExitName = blockDefinition?.exits?.default?.name

    return primaryExitName !== undefined && defaultExitName !== undefined
  },
}

export const mutations: MutationTree<IFlowsState> = {
  ...SetContactPropertyModule.mutations,

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
    removeBlockValueByPath(state, blockId, `config.${key}`)
  },
  /**
   * update config by path, and make nested assignment reactive for vue
   */
  block_updateConfigByPath(state, {blockId, path, value}: {blockId: string, path: string, value?: object | string | number | boolean}) {
    updateBlockValueByPath(state, blockId, `config.${path}`, value)
  },
  block_updateUIMetadataByPath(state, {blockId, path, value}: {blockId: string, path: string, value?: object | string | number | boolean}) {
    const chunks = path.split('.')
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)

    if (!block.ui_metadata) {
      Vue.set(block, 'ui_metadata', {})
    }
    const base = block.ui_metadata!

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
    if (isNil(destinationBlockId)) {
      destinationBlockId = undefined
    }
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
    findBlockExitWith(exitId, block)
      .destination_block = destinationBlockId
  },
  block_updateVendorMetadataByPath(
    state,
    {blockId, path, value}: {blockId: string, path: string, value: boolean | number | string | object | null | undefined},
  ) {
    updateBlockValueByPath(state, blockId, `vendor_metadata.${path}`, value)
  },
  block_removeVendorMetadataByPath(state, {blockId, path}: { blockId: string, path: string }) {
    removeBlockValueByPath(state, blockId, `vendor_metadata.${path}`)
  },
  block_exitClearDestinationBlockFor(_, {blockExit}) {
    blockExit.destination_block = undefined
  },
}

export const actions: ActionTree<IFlowsState, IRootState> = {
  ...SetContactPropertyModule.actions,

  block_setLabel({commit, dispatch}, {blockId, value}) {
    commit('block_setLabel', {blockId, value})
    dispatch('block_setName', {blockId, value: snakeCase(value)})
  },

  /**
   * Set block name
   * @param blockId
   * @param value
   * @param lockAutoUpdate, true if user overrides auto-generated name
   */
  block_setName(
    {commit, state},
    {blockId, value, lockAutoUpdate = false}: {blockId: IBlock['uuid'], value: string, lockAutoUpdate: boolean},
  ) {
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)

    if (block.vendor_metadata?.floip.ui_metadata?.should_auto_update_name === true || lockAutoUpdate) {
      commit('block_setName', {blockId, value})
    }

    if (lockAutoUpdate) {
      commit('block_updateVendorMetadataByPath', {
        blockId,
        path: 'floip.ui_metadata.should_auto_update_name',
        value: false,
      })
    }
  },

  block_resetName({commit, state}, {blockId}) {
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)

    commit('block_setName', {blockId, value: snakeCase(block.label)})
    commit('block_updateVendorMetadataByPath', {
      blockId,
      path: 'floip.ui_metadata.should_auto_update_name',
      value: true,
    })
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

  /**
   * primaryExitTest has priority over test defined in builder.config.blockClasses
   * If we have undefined, then we try to use what we defined in builder.config.blockClasses
   */
  async block_generateExitsBasedOnUiConfig(
    {state, dispatch, getters},
    {blockType, primaryExitTest}: {blockType: string, primaryExitTest?: string},
  ): Promise<IBlockExit[]> {
    const blockDefinition = getters.block_classesConfig[blockType]
    const primaryExitName = blockDefinition?.exits?.primary?.name
    const defaultExitName = blockDefinition?.exits?.default?.name
    const defaultBranchingType = blockDefinition?.exits?.default_branching_type
    let exits: IBlockExit[] = []

    if (defaultBranchingType === undefined && getters.block_shouldHave2Exits(blockType) === true) {
      // Has 02 exits
      exits = [
        await dispatch('block_createBlockExitWith', {
          props: ({
            uuid: await (new IdGeneratorUuidV4()).generate(),
            name: primaryExitName,
            test: primaryExitTest ?? blockDefinition?.exits?.primary.test,
          }) as IBlockExit,
        }),
        await dispatch('block_createBlockDefaultExitWith', {
          props: ({
            uuid: await (new IdGeneratorUuidV4()).generate(),
            name: defaultExitName,
          }) as IBlockExit,
        }),
      ]
    } else {
      // Has only one exit `Default` if
      // - the default_branching_type is mentioned (eg: EXIT_PER_CHOICE)
      // - OR the 02 exits are not clearly defined
      exits = [await dispatch('block_createBlockDefaultExitWith', {
        props: ({
          uuid: await (new IdGeneratorUuidV4()).generate(),
        }) as IBlockExit,
      })]

      if (![OutputBranchingType.EXIT_PER_CHOICE, OutputBranchingType.ADVANCED, undefined].includes(defaultBranchingType)) {
        console.warn(
          'block_generateExitsBasedOnUiConfig',
          `the default_branching_type ${defaultBranchingType} is not recognized, this might cause an error.`,
        )
      }
    }

    return exits
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
    if (isNil(first) || isNil(second)) {
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

  /**
   * Update exits after the block creation.
   * Standard exit where the end user can make an error. We have 02 exits:
   * - Non default exits would be collapsed into 01 exit (eg: Valid, Success)
   * - Default exit would be the last exit (eg: Invalid, Failure)
   */
  async block_resetBranchingExitsByCollapsingNonDefault(
    {state, getters, dispatch},
    {blockId, primaryExitTest}: {blockId: IBlock['uuid'], primaryExitTest: string},
  ) {
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
    const blockDefinition = getters.block_classesConfig[block.type]

    const primaryExitProps: Partial<IBlockExit> = {
      uuid: await (new IdGeneratorUuidV4()).generate(),
      name: blockDefinition?.exits?.primary.name,
      test: primaryExitTest ?? blockDefinition?.exits?.primary.test,
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
  async block_resetBranchingExitsToDefaultOnly({state, dispatch}, {blockId}: {blockId: IBlock['uuid']}) {
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

  block_updateAllBlocksAfterAddingFlowLanguage({rootGetters, dispatch}, {language}: {language: ILanguage}): void {
    rootGetters['flow/activeFlow'].blocks.map((currentBlock: IBlock) => {
      if (currentBlock.type === SelectOneBlockType || currentBlock.type === SelectManyBlockType) {
        const hasTextMode = rootGetters['flow/hasTextMode']
        if (hasTextMode === true) {
          (currentBlock as ISelectOneResponseBlock).config.choices.map((choice) => {
            choice.text_tests?.push({
              language: language.id,
              test_expression: `@block.response = '${choice.name}'`,
            })

            return choice
          })
        }
      }

      return currentBlock
    })
  },

  block_updateAllBlocksAfterDeletingFlowLanguage({rootGetters, dispatch}, {language}: {language: ILanguage}): void {
    rootGetters['flow/activeFlow'].blocks.map((currentBlock: IBlock) => {
      if (currentBlock.type === SelectOneBlockType || currentBlock.type === SelectManyBlockType) {
        const hasTextMode = rootGetters['flow/hasTextMode']
        if (hasTextMode === true) {
          (currentBlock as ISelectOneResponseBlock).config.choices.map((choice) => {
            choice.text_tests = choice.text_tests?.filter((test) => test.language !== language.id)

            return choice
          })
        }
      }

      return currentBlock
    })
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
