import Vue from 'vue'
import {findBlockExitWith, findBlockOnActiveFlowWith, IBlock, IBlockExit, IContext, IFlow} from '@floip/flow-runner'
import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {cloneDeep, defaults, has, isArray, isNil, last, reject} from 'lodash'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {OutputBranchingType} from '@/components/interaction-designer/block-editors/BlockOutputBranchingConfig.model'
import {BLOCK_TYPE as SelectOneBlockType} from '@/store/flow/block-types/MobilePrimitives_SelectOneResponseBlockStore'
import {BLOCK_TYPE as SelectManyBlockType} from '@/store/flow/block-types/MobilePrimitives_SelectManyResponseBlockStore'
import {ISelectOneResponseBlock} from '@floip/flow-runner/src/model/block/ISelectOneResponseBlock'
import {ISelectManyResponseBlock} from '@floip/flow-runner/src/model/block/ISelectManyResponseBlock'
import {escapeQuotes} from '@/components/interaction-designer/block-editors/choices/expressionTransformers'
import {snakeCaseOnSpaces} from '@/utils/string-utils'
import * as SetContactPropertyModule from './block/set-contact-property'
import {IFlowsState} from '.'
import {
  ConfigFieldType,
  removeBlockExitValueByPath,
  removeBlockValueByPath,
  updateBlockExitValueByPath,
  updateBlockValueByPath,
} from './utils/vuexBlockAndFlowHelpers'

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

  block_setName(state, {blockId, value}: {blockId: string, value: string}) {
    findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
      .name = value
  },
  block_setLabel(state, {blockId, value}: {blockId: string, value: string | undefined}) {
    findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
      .label = value
  },
  block_setSemanticLabel(state, {blockId, value}: {blockId: string, value: string | undefined}) {
    findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
      .semantic_label = value
  },
  block_setTags(state, {blockId, value}: {blockId: string, value: string[] | undefined}) {
    findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
      .tags = value
  },
  block_addTag(state, {blockId, value}: {blockId: string, value: string}) {
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
  block_addExit(state, {blockId, exit, shouldAppend}: {blockId: string, exit: IBlockExit, shouldAppend?: boolean}) {
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)

    if (shouldAppend) {
      block.exits.push(exit)
    } else {
      block.exits.splice(block.exits.length - 1, 0, exit)
    }
  },

  block_removeExit(state, {blockId, exit}: {blockId: string, exit: IBlockExit}) {
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
    block.exits = reject(block.exits, (e) => e.uuid === exit.uuid)
  },
  block_updateExitVendorMetadata(state, {blockId, exitId, vendorMetadata}: {blockId: string, exitId: string, vendorMetadata: object}) {
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
    const exit = findBlockExitWith(exitId, block)
    exit.vendor_metadata = vendorMetadata
  },
  block_updateExitVendorMetadataByPath(
    state,
    {blockId, exitId, path, value}: {blockId: IBlock['uuid'], exitId: IBlockExit['uuid'], path: string, value: ConfigFieldType},
  ) {
    updateBlockExitValueByPath(state, blockId, exitId, `vendor_metadata.${path}`, value)
  },
  block_removeExitVendorMetadataByPath(
    state,
    {blockId, exitId, path}: {blockId: IBlock['uuid'], exitId: IBlockExit['uuid'], path: string},
  ) {
    removeBlockExitValueByPath(state, blockId, exitId, `vendor_metadata.${path}`)
  },
  block_updateConfig(state, {blockId, newConfig}: { blockId: string, newConfig: object }) {
    findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
      .config = newConfig
  },
  // note that the {key} could be undefined inside `config` at block creation (eg: optional config)
  block_updateConfigByKey(state, {blockId, key, value}: { blockId: string, key: string, value: ConfigFieldType }) {
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
  block_updateConfigByPath(state, {blockId, path, value}: {blockId: string, path: string, value: ConfigFieldType}) {
    updateBlockValueByPath(state, blockId, `config.${path}`, value)
  },
  block_updateUIMetadataByPath(state, {blockId, path, value}: {blockId: string, path: string, value: ConfigFieldType}) {
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
  block_setBlockExitDestinationBlockId(
    state,
    {blockId, exitId, destinationBlockId}: {blockId: string, exitId: string, destinationBlockId: string | undefined | null},
  ) {
    if (isNil(destinationBlockId)) {
      destinationBlockId = undefined
    }
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)
    findBlockExitWith(exitId, block)
      .destination_block = destinationBlockId
  },
  block_updateVendorMetadataByPath(
    state,
    {blockId, path, value}: {blockId: string, path: string, value: ConfigFieldType},
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

  async block_setLabel({commit, dispatch}, {blockId, value}: {blockId: string, value: string | undefined}): Promise<void> {
    commit('block_setLabel', {blockId, value})
    await dispatch('block_setName', {blockId, value: snakeCaseOnSpaces(value as string)})
  },

  /**
   * Set block name
   * @param commit
   * @param dispatch
   * @param state
   * @param blockId
   * @param value
   * @param lockAutoUpdate, true if user overrides auto-generated name
   */
  async block_setName(
    {commit, dispatch, state},
    {blockId, value, lockAutoUpdate = false}: {blockId: IBlock['uuid'], value: string, lockAutoUpdate: boolean},
  ) {
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)

    if (block.vendor_metadata?.floip.ui_metadata?.should_auto_update_name === true || lockAutoUpdate) {
      const oldBlock = cloneDeep(block)
      commit('block_setName', {blockId, value})
      const newBlock = cloneDeep(block)
      await dispatch('block_notifyOtherBlocksAboutBlockChange', {oldBlock, newBlock})
    }

    if (lockAutoUpdate) {
      commit('block_updateVendorMetadataByPath', {
        blockId,
        path: 'floip.ui_metadata.should_auto_update_name',
        value: false,
      })
    }
  },

  /**
   * We can use this to update expressions located in other blocks' configs
   * if they are referencing the modified block, e.g. "@(flow.myBlockNameThatChanged)"
   * @param dispatch
   * @param rootGetters
   * @param oldBlock, deep clone of the modified block before the change
   * @param newBlock, deep clone of the modified block after the change, null if the block was deleted
   */
  async block_notifyOtherBlocksAboutBlockChange(
    {dispatch, rootGetters},
    {oldBlock, newBlock}: {oldBlock: IBlock, newBlock: IBlock | null},
  ): Promise<unknown[]> {
    return Promise.all(
      (rootGetters['flow/activeFlow'] as IFlow | undefined)?.blocks.map((blockToNotify: IBlock) =>
        dispatch(
          `flow/${blockToNotify.type}/maybeHandleAnotherBlockChange`,
          {thisBlock: blockToNotify, oldBlock, newBlock},
          {root: true},
        )) ?? [],
    )
  },

  block_resetName({commit, state}, {blockId}: {blockId: string}) {
    const block = findBlockOnActiveFlowWith(blockId, state as unknown as IContext)

    commit('block_setName', {blockId, value: snakeCaseOnSpaces(block.label)})
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

  async block_select({state, dispatch}, {blockId}: { blockId: IBlock['uuid'] }) {
    state.selectedBlocks.push(blockId)
  },

  async block_deselect({state}, {blockId}: { blockId: IBlock['uuid'] }) {
    // remove it
    state.selectedBlocks = state.selectedBlocks.filter((item) => item !== blockId)
  },

  block_updateBlocksAfterLanguagesChange(
    {rootGetters, dispatch, getters},
    {addedLanguageIds, removedLanguageIds}: { addedLanguageIds: string[], removedLanguageIds: string[] },
  ): void {
    if (rootGetters['flow/hasTextMode'] === false) {
      return
    }
    getters.activeFlow.blocks
      .filter((block: IBlock) => block.type === SelectOneBlockType || block.type === SelectManyBlockType)
      .forEach((block: ISelectOneResponseBlock | ISelectManyResponseBlock) => {
        // handle removed languages
        block.config.choices.forEach(choice => {
          choice.text_tests = choice.text_tests?.filter(({language}) => language !== undefined && !removedLanguageIds.includes(language))
        })
        // handle added languages
        block.config.choices.forEach(choice => {
          addedLanguageIds.forEach(langId => {
            choice.text_tests?.push({
              language: langId,
              test_expression: `@block.response = '${escapeQuotes(choice.name)}'`,
            })
          })
        })
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
