import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { IRootState } from '@/store'
import {
  IBlockExitTestRequired,
  IBlockExit,
  IFlow,
  IContext,
  SupportedContentType,
  findBlockOnActiveFlowWith,
  IResourceDefinitionContentTypeSpecific, IBlock,
} from '@floip/flow-runner'
import { IdGeneratorUuidV4 } from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import { ISelectOneResponseBlock } from '@floip/flow-runner/dist/model/block/ISelectOneResponseBlock'
import {
  IResourceDefinition,
} from '@floip/flow-runner/src/domain/IResourceResolver'
import Vue from 'vue'
import {defaultsDeep, find, max, filter, first, get, set} from 'lodash'
import { IResourceDefinitionVariantOverModesFilter } from '../resource'
import { IFlowsState } from '../index'

import { someItemsHaveValue, allItemsHaveValue, twoItemsBlank } from '../utils/listBuilder'

export const BLOCK_TYPE = 'MobilePrimitives.SelectOneResponse'

export interface IInflatedChoicesInterface {
  exit: IBlockExit,
  resource: IResourceDefinition
}

export interface ICustomFlowState extends Partial<IFlowsState> {
  inflatedEmptyChoice: IInflatedChoicesInterface
}

export const stateFactory = ():ICustomFlowState => ({
  // put empty choice in state rather than in block config to avoid it being persisted
  inflatedEmptyChoice: {} as IInflatedChoicesInterface
})

export const getters: GetterTree<ICustomFlowState, IRootState> = {
  inflatedChoices: (state, getters, rootState, rootGetters): object => {
    const currentBlock = rootGetters['builder/activeBlock']
    const choices: { [key: string]: IInflatedChoicesInterface } = {}

    return Object.keys(currentBlock.config.choices).reduce((memo, choiceKey): {[key: string]: IInflatedChoicesInterface} => {
      const resourceUuid = currentBlock.config.choices[choiceKey]
      memo[choiceKey] = {
        exit: getters.blockExitFromResourceUuid(resourceUuid),
        resource: rootGetters['flow/resourcesByUuid'][resourceUuid]
      }
      return memo
    }, choices)
  },
  blockExitFromResourceUuid: (state, getters, rootState, rootGetters) => (resourceUuid: string): IBlockExit => {
    const currentBlock = rootGetters['builder/activeBlock']
    return first(filter(currentBlock.exits, {
      label: resourceUuid
    })) as IBlockExit
  },
  isInflatedChoiceBlankOnKey: (state, getters) => (key: any): boolean => {
    return !someItemsHaveValue(getters.inflatedChoices[key].resource.values, 'value') && !get(getters.inflatedChoices[key], 'exit.semantic_label')
  },
  isInflatedEmptyChoiceBlank: (state, getters): boolean => {
    return !someItemsHaveValue(state.inflatedEmptyChoice.resource.values || [], 'value') && !get(state.inflatedEmptyChoice, 'exit.semantic_label')
  },
  allChoicesHaveContent: (state, getters): boolean => {
    return Object.keys(getters.inflatedChoices).every((key: string) => {
      return !getters.isInflatedChoiceBlankOnKey(key)
    })
  },
  twoChoicesBlank: (state, getters, rootState, rootGetters): boolean => {
    let blankNumber = 0
    return Object.keys(getters.inflatedChoices).some((key: string) => {
      if (!someItemsHaveValue(getters.inflatedChoices[key].resource.values, 'value')) {
        blankNumber += 1
      }

      if (blankNumber > 1) {
        return true
      }

      return false
    })
  },
  isExitsBranchingSegregated: (state, getters, rootState, rootGetters): boolean => {
    const currentBlock = rootGetters['builder/activeBlock']
    if(!currentBlock) { // eg: on the way to create the block
      return true
    }

    return !!find(currentBlock.exits, function (exit) {
      return exit.default // We assume the 'Default' exit has `default: true`
    })
  },
}

export const mutations: MutationTree<ICustomFlowState> = {
  // updateInflatedEmptyChoiceVisibility(state, { value }: { value: boolean }) {
  //   set(state.inflatedEmptyChoice.exit.config, 'is_visible', value);
  // },
}

export const actions: ActionTree<ICustomFlowState, IRootState> = {
  deleteChoiceByKey({ state, rootState, rootGetters, commit }, { choiceKeyToRemove }) {
    const activeBlock = rootGetters['builder/activeBlock']
    delete activeBlock.config.choices[choiceKeyToRemove]

    // Rekey
    const choices: {[key: string]: string} = {}
    commit('flow/block_updateConfigByKey', {
      blockId: activeBlock.uuid,
      key: 'choices',
      value: Object.keys(activeBlock.config.choices).sort().reduce((choices, choiceKey: string, index: number) => {
        choices[index + 1] = activeBlock.config.choices[choiceKey]
        return choices
      }, choices),
    }, { root: true })
  },
  pushNewChoice({ state, rootState, rootGetters, commit }, { choiceId, newIndex }) {
    const activeBlock = rootGetters['builder/activeBlock']
    Vue.set(activeBlock.config.choices, newIndex, choiceId)
  },
  async createVolatileEmptyChoice({state, dispatch, getters, rootGetters}, { index }) {
    const blankResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, { root: true })
    const blankExit: IBlockExitTestRequired = await dispatch('flow/block_createBlockExitWith', {
      props: {
        uuid: await (new IdGeneratorUuidV4()).generate(),
        test: `block.value = ${index}`,
        label: blankResource.uuid,
        semantic_label: '',
        config: {
          is_visible: getters.isExitsBranchingSegregated
        }
      } as IBlockExitTestRequired,
    }, {root: true})
    state.inflatedEmptyChoice = {
      exit: blankExit,
      resource: rootGetters['flow/resourcesByUuid'][blankResource.uuid]
    }
  },
  async popFirstEmptyChoice({commit, dispatch, rootGetters, getters}) {
    const choiceKeyToRemove = find(Object.keys(getters.inflatedChoices), (key: string) => {
      return <boolean>getters.isInflatedChoiceBlankOnKey(key)
    })
    if (choiceKeyToRemove) {
      const choiceToRemove = rootGetters['builder/activeBlock'].config.choices[choiceKeyToRemove]
      dispatch('deleteChoiceByKey', {choiceKeyToRemove: choiceKeyToRemove, blockId: rootGetters['builder/activeBlock'].uuid})
      return choiceToRemove
    }
    return null
  },
  async editSelectOneResponseBlockChoice({
   commit, dispatch, getters, rootGetters,
  }) {
    const activeBlock = rootGetters['builder/activeBlock']
    if (!getters.allChoicesHaveContent) { // then remove the 1st blank exit
      const exitLabel = await dispatch('popFirstEmptyChoice', { blockId: activeBlock.uuid })
      if (exitLabel) {
        commit('flow/block_popExitsByLabel', { blockId: activeBlock.uuid, exitLabel }, { root: true })
      }
    }
    return activeBlock.config.choices
  },

  async editEmptyChoice({state, commit, dispatch, getters, rootGetters}, { choice }: { choice: IInflatedChoicesInterface }) {
    if (choice === state.inflatedEmptyChoice && !getters.isInflatedEmptyChoiceBlank) {
      // push the current value into choices & exits
      const activeBlock = rootGetters['builder/activeBlock'];
      const newIndex = Object.keys(activeBlock.config.choices || {}).length + 1
      const resourceUuid = state.inflatedEmptyChoice.resource.uuid
      dispatch('pushNewChoice', {choiceId: resourceUuid, blockId: activeBlock.uuid, newIndex})
      commit('flow/block_pushNewExit', {blockId: activeBlock.uuid, newExit: state.inflatedEmptyChoice.exit, insertAtIndex: activeBlock.exits.length - 1}, {root: true})

      // associate new blank resource to the empty choice, this is important to stop endless watching
      await dispatch('createVolatileEmptyChoice', { index: newIndex })
    }
  },

  cacheSegregatedExits({ state, commit, getters }, { blockId }: { blockId: IBlock['uuid']}) {
    commit('flow/block_updateVendorMetadataByPath', {
      blockId,
      path: 'io_viamo.cache.outputBranching.segregatedExits',
      value: getters.segregatedExits
    }, { root: true })
  },

  cacheUnifiedExits({ state, commit, getters }, { blockId }: { blockId: IBlock['uuid']}) {
    commit('flow/block_updateVendorMetadataByPath', {
      blockId,
      path: 'io_viamo.cache.outputBranching.unifiedExits',
      value: getters.unifiedExits
    }, { root: true })
  },

  cacheExits({ state, commit, getters, rootGetters }, { blockId }: { blockId: IBlock['uuid']}) {
    const activeBlock = rootGetters['builder/activeBlock']
    const segregatedPath = 'io_viamo.cache.outputBranching.segregatedExits'
    const cachedSegregatedExits = get(activeBlock.vendor_metadata, segregatedPath)
    if (!cachedSegregatedExits) {
      const segregatedExits = filter(activeBlock.exits, function (exit) {
        return exit.tag.toLowerCase() !== 'default'
      })
      commit('flow/block_updateVendorMetadataByPath', {
        blockId,
        path: segregatedPath,
        value: segregatedExits
      }, { root: true });
    }

    const unifiedPath = 'io_viamo.cache.outputBranching.unifiedExits'
    const cachedUnifiedExits = get(activeBlock.vendor_metadata, unifiedPath)
    if (!cachedUnifiedExits) {
      const unifiedExits = filter(activeBlock.exits, function (exit) {
        return ['default', 'error'].includes(exit.tag.toLowerCase())
      })
      commit('flow/block_updateVendorMetadataByPath', {
        blockId,
        path: unifiedPath,
        value: unifiedExits
      }, { root: true });
    }
  },

  makeExitsSegregated({ state, commit, getters, rootGetters }, { blockId }: { blockId: IBlock['uuid']}) {
    const activeBlock: IBlock = rootGetters['builder/activeBlock']
    // @ts-ignore TODO: remove this once IBlock has vendor_metadata key
    const cachedExits = get(activeBlock.vendor_metadata, 'io_viamo.cache.outputBranching.segregatedExits')
    if (cachedExits) {
      activeBlock.exits = cachedExits
      console.debug('makeExitsSegregated', cachedExits)
    } else {
      console.debug('cached segregated exits are empty')
    }
  },

  makeExitsUnified({ state, commit, getters, rootGetters }, { blockId }: { blockId: IBlock['uuid']}) {
    const activeBlock: IBlock = rootGetters['builder/activeBlock']
    // @ts-ignore TODO: remove this once IBlock has vendor_metadata key
    const cachedExits = get(activeBlock.vendor_metadata, 'io_viamo.cache.outputBranching.unifiedExits')
    if (cachedExits) {
      activeBlock.exits = cachedExits
      console.debug('makeExitsUnified', cachedExits)
    } else {
      console.debug('cached unified exits are empty')
    }
  },

  async createWith({ state, commit, dispatch, rootGetters }, { props }: {props: {uuid: string} & Partial<ISelectOneResponseBlock>}) {
    const blankPromptResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, { root: true })
    const blankQuestionPromptResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, { root: true })
    const blankChoicesPromptResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, { root: true })

    const defaultExitProps: Partial<IBlockExit> = {
      uuid: await (new IdGeneratorUuidV4()).generate(),
      tag: 'Default',
      label: 'Default',
      default: true,
    }

    const errorExitProps: Partial<IBlockExit> = {
      uuid: await (new IdGeneratorUuidV4()).generate(),
      tag: 'Error',
      label: 'Error',
    }

    await dispatch('createVolatileEmptyChoice', { index: 0 })

    return defaultsDeep(props, {
      type: BLOCK_TYPE,
      name: '',
      label: '',
      semantic_label: '',
      exits: [
        await dispatch('flow/block_createBlockDefaultExitWith', { props: defaultExitProps }, { root: true }),
        await dispatch('flow/block_createBlockExitWith', { props: errorExitProps }, { root: true }),
      ],
      config: {
        prompt: blankPromptResource.uuid,
        question_prompt: blankQuestionPromptResource.uuid,
        choices_prompt: blankChoicesPromptResource.uuid,
        choices: {},
      },
    })
  },

}

export default {
  namespaced: true,
  state: stateFactory,
  getters,
  mutations,
  actions,
}
