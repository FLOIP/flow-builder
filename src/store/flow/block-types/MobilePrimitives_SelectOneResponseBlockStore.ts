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
import { defaults, find, max, filter, first, get } from 'lodash'
import { IResourceDefinitionVariantOverModesFilter } from '../resource'
import { IFlowsState } from '../index'

import { someItemsHaveValue, allItemsHaveValue, twoItemsBlank } from '../utils/listBuilder'

export const BLOCK_TYPE = 'MobilePrimitives\\SelectOneResponse'

interface IInflatedChoicesInterface {
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
  isInflatedChoiceBlankOnKey: (state, getters) => (key): boolean => {
    return !someItemsHaveValue(getters.inflatedChoices[key].resource.values, 'value') && !get(getters.inflatedChoices[key], 'exit.semanticLabel')
  },
  isInflatedEmptyChoiceBlank: (state, getters): boolean => {
    return !someItemsHaveValue(state.inflatedEmptyChoice.resource.values || [], 'value') && !get(state.inflatedEmptyChoice, 'exit.semanticLabel')
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

}

export const mutations: MutationTree<ICustomFlowState> = {
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
    Vue.set(block.config.choices, newIndex, choiceId)
  },
}

export const actions: ActionTree<ICustomFlowState, IRootState> = {
  async createVolatileEmptyChoice({state, dispatch, rootGetters}, { index }) {
    const blankResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, { root: true })
    const blankExit: IBlockExitTestRequired = await dispatch('flow/block_createBlockExitWith', {
      props: ({
        uuid: (new IdGeneratorUuidV4()).generate(),
        test: `block.value = ${index}`,
        label: blankResource.uuid,
        semanticLabel: '',
      }) as IBlockExitTestRequired,
    }, {root: true})
    state.inflatedEmptyChoice = {
      exit: blankExit,
      resource: rootGetters['flow/resourcesByUuid'][blankResource.uuid]
    }
  },
  async popFirstEmptyChoice({commit, rootGetters, getters}) {
    const choiceKeyToRemove = find(Object.keys(getters.inflatedChoices), (key: string) => {
      return <boolean>getters.isInflatedChoiceBlankOnKey(key)
    })
    if (choiceKeyToRemove) {
      const choiceToRemove = rootGetters['builder/activeBlock'].config.choices[choiceKeyToRemove]
      commit('deleteChoiceByKey', {choiceKeyToRemove: choiceKeyToRemove, blockId: rootGetters['builder/activeBlock'].uuid})
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

  async editEmptyChoice({state, commit, dispatch, getters, rootGetters}, choice: IInflatedChoicesInterface) {
    if (choice === state.inflatedEmptyChoice && !getters.isInflatedEmptyChoiceBlank) {
      // push the current value into choices & exits
      const activeBlock = rootGetters['builder/activeBlock'];
      const newIndex = Object.keys(activeBlock.config.choices || {}).length + 1
      const resourceUuid = state.inflatedEmptyChoice.resource.uuid
      commit('pushNewChoice', {choiceId: resourceUuid, blockId: activeBlock.uuid, newIndex})
      commit('flow/block_pushNewExit', {blockId: activeBlock.uuid, newExit: state.inflatedEmptyChoice.exit}, {root: true})

      // associate new blank resource to the empty choice, this is important to stop endless watching
      const blankResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {root: true})
      await dispatch('createVolatileEmptyChoice', { blankResource, index: newIndex })
    }
  },

  // todo: in the flow-spec, there's mention that we can configure to swap between exit-per-choice and a default exit
  //       but, it doesn't seem to mention how this is configured
  async createWith({ state, commit, dispatch, rootGetters }, { props }: {props: {uuid: string} & Partial<ISelectOneResponseBlock>}) {
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

    await dispatch('createVolatileEmptyChoice', { index: 0 })

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
