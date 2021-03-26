import { ISelectOneResponseBlock } from "@floip/flow-runner/dist/model/block/ISelectOneResponseBlock"
import { IBlockExit } from "@floip/flow-runner"
import { IdGeneratorUuidV4 } from "@floip/flow-runner/dist/domain/IdGeneratorUuidV4"
import { defaults } from 'lodash'
import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { IFlowsState } from '@/store/flow'
import { IRootState } from '@/store'
import { getters as selectOneGetters, mutations as selectOneMutations, actions as selectOneActions } from './MobilePrimitives_SelectOneResponseBlockStore'

export const BLOCK_TYPE = 'MobilePrimitives\\SelectManyResponse'

export const getters: GetterTree<IFlowsState, IRootState> = {
  ...selectOneGetters,
}

export const mutations: MutationTree<IFlowsState> = {
  ...selectOneMutations,
}

export const actions: ActionTree<IFlowsState, IRootState> = {
  ...selectOneActions,

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
      semantic_label: '',
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
  },
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
}
