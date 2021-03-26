import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { IRootState } from '@/store'
import {
  SupportedContentType,
  SupportedMode,
  IBlockExit,
} from '@floip/flow-runner'
import { IdGeneratorUuidV4 } from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import { IMessageBlock } from '@floip/flow-runner/src/model/block/IMessageBlock'
import { defaults } from 'lodash'
import { IFlowsState } from '../index'

export const BLOCK_TYPE = 'MobilePrimitives.Message'

export const getters: GetterTree<IFlowsState, IRootState> = {}

export const mutations: MutationTree<IFlowsState> = {
}
export const actions: ActionTree<IFlowsState, IRootState> = {

  async createWith({ rootGetters, commit, dispatch }, { props }: {props: {uuid: string} & Partial<IMessageBlock>}) {
    const blankMessageResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, { root: true })

    const exits: IBlockExit[] = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: await (new IdGeneratorUuidV4()).generate(),
          tag: 'Default',
          label: 'Default',
        }) as IBlockExit,
      }, { root: true }),
    ]

    return defaults(props, {
      type: BLOCK_TYPE,
      name: '',
      label: '',
      semantic_label: '',
      exits,
      config: {
        prompt: blankMessageResource.uuid,
        messageAudio: '', // TODO: remove this once flow-runner doesn't require it anymore
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
