import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { IRootState } from '@/store'
import {
  IBlockExitTestRequired,
  IBlockExit,
  IFlow,
  IContext,
  SupportedContentType,
  findBlockOnActiveFlowWith,
  IResourceDefinitionContentTypeSpecific,
} from '@floip/flow-runner'
import IdGeneratorUuidV4 from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import ISelectOneResponseBlock from '@floip/flow-runner/dist/model/block/ISelectOneResponseBlock'
import {
  IResourceDefinition,
} from '@floip/flow-runner/src/domain/IResourceResolver'
import Vue from 'vue'
import { defaults, find, max } from 'lodash'
import { IResourceDefinitionVariantOverModesFilter } from '../resource'
import { IFlowsState } from '../index'

import { someItemsHaveValue, allItemsHaveValue, twoItemsBlank } from '../utils/listBuilder'

export const BLOCK_TYPE = 'MobilePrimitives\\SelectOneResponse'

export const getters: GetterTree<IFlowsState, IRootState> = {
  inflatedChoices: (state, getters, rootState, rootGetters): object => {
    const currentBlock = rootGetters['builder/activeBlock']
    const choices: {[key: string]: IResourceDefinition} = {}
    return Object.keys(currentBlock.config.choices).reduce((memo, choiceKey): {[key: string]: IResourceDefinition} => {
      memo[choiceKey] = rootGetters['flow/resourcesByUuid'][currentBlock.config.choices[choiceKey]]
      return memo
    }, choices)
  },
  allChoicesHaveContent: (state, getters): boolean => Object.keys(getters.inflatedChoices).every((key: string) => someItemsHaveValue(getters.inflatedChoices[key].values, 'value')),
  twoChoicesBlank: (state, getters, rootState, rootGetters): boolean => {
    let blankNumber = 0
    return Object.keys(getters.inflatedChoices).some((key: string) => {
      if (!someItemsHaveValue(getters.inflatedChoices[key].values, 'value')) {
        blankNumber += 1
      }

      if (blankNumber > 1) {
        return true
      }

      return false
    })
  },

}

export const mutations: MutationTree<IFlowsState> = {
  deleteChoiceByKey(state, { choiceKeyToRemove, blockId }) {
    // TODO - this shouldn't be necessary
    // @ts-ignore - TS2339: Property 'flow' does not exist on type
    const block: ISelectOneResponseBlock = findBlockOnActiveFlowWith(blockId, this.state.flow as unknown as IContext) as ISelectOneResponseBlock
    delete block.config.choices[choiceKeyToRemove]
    const choices: {[key: string]: string} = {}
    // rekey
    block.config.choices = Object.keys(block.config.choices).sort().reduce((choices, choiceKey: string, index: number) => {
      choices[index + 1] = block.config.choices[choiceKey]
      return choices
    }, choices)
  },
  pushNewChoice(state, { choiceId, blockId, newIndex }) {
    // TODO - this shouldn't be necessary
    // @ts-ignore - TS2339: Property 'flow' does not exist on type
    const block: ISelectOneResponseBlock = findBlockOnActiveFlowWith(blockId, this.state.flow as unknown as IContext) as ISelectOneResponseBlock
    block.config.choices[newIndex] = choiceId
  },
}

export const actions: ActionTree<IFlowsState, IRootState> = {
  async popFirstEmptyChoice({ commit, rootGetters, getters }) {
    const choiceToRemove = find(Object.keys(getters.inflatedChoices), (key: string) => !someItemsHaveValue(getters.inflatedChoices[key].values, 'value'))
    if (choiceToRemove) {
      commit('deleteChoiceByKey', { choiceKeyToRemove: choiceToRemove, blockId: rootGetters['builder/activeBlock'].uuid })
      return rootGetters['builder/activeBlock'].config.choices[choiceToRemove]
    }
    return null
  },
  async editSelectOneResponseBlockChoice({
    commit, dispatch, getters, rootGetters,
  }) {
    const activeBlock = rootGetters['builder/activeBlock']
    if (getters.allChoicesHaveContent) {
      const newIndex = parseInt(max(Object.keys(activeBlock.config.choices)) || '0') + 1
      const blankResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, { root: true })
      // due to a race condition we may have already pushed something
      if (!activeBlock.config.choices[newIndex]) {
        commit('pushNewChoice', { choiceId: blankResource.uuid, blockId: activeBlock.uuid, newIndex })
        const exit: IBlockExitTestRequired = await dispatch('flow/block_createBlockExitWith', {
          props: ({
            uuid: (new IdGeneratorUuidV4()).generate(),
            test: `block.value = ${newIndex - 1}`,
            label: blankResource.uuid,
          }) as IBlockExitTestRequired,
        }, { root: true })
        commit('flow/block_pushNewExit', { blockId: activeBlock.uuid, newExit: exit }, { root: true })
      }
    } else if (getters.twoChoicesBlank) {
      const exitLabel = await dispatch('popFirstEmptyChoice', { blockId: activeBlock.uuid })
      if (exitLabel) {
        commit('flow/block_popExitsByLabel', { blockId: activeBlock.uuid, exitLabel }, { root: true })
      }
    }
    return activeBlock.config.choices
  },

  // todo: in the flow-spec, there's mention that we can configure to swap between exit-per-choice and a default exit
  //       but, it doesn't seem to mention how this is configured
  async createWith({ state, commit, dispatch }, { props }: {props: {uuid: string} & Partial<ISelectOneResponseBlock>}) {
    const blankResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, { root: true })
    const blankPromptResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, { root: true })
    const blankQuestionPromptResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, { root: true })
    const blankChoicesPromptResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, { root: true })

    const defaultExitProps: Partial<IBlockExit> = {
      uuid: (new IdGeneratorUuidV4()).generate(),
      tag: 'Default',
      label: 'Default',
    }

    const errorExitProps: Partial<IBlockExit> = {
      uuid: (new IdGeneratorUuidV4()).generate(),
      tag: 'Error',
      label: 'Error',
    }

    return defaults(props, {
      type: BLOCK_TYPE,
      name: '',
      label: '',
      semanticLabel: '',
      exits: [
        await dispatch('flow/block_createBlockDefaultExitWith', { props: defaultExitProps }, { root: true }),
        await dispatch('flow/block_createBlockExitWith', { props: errorExitProps }, { root: true }),
      ],
      config: {
        prompt: blankPromptResource.uuid,
        questionPrompt: blankQuestionPromptResource.uuid,
        choicesPrompt: blankChoicesPromptResource.uuid,
        choices: { 1: blankResource.uuid },
      },
    })
  }
  ,

}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
}
