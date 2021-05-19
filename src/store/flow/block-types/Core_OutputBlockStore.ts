import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { IRootState } from '@/store'
import {
  IBlockExit,
} from '@floip/flow-runner'
import { IdGeneratorUuidV4 } from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import { IOutputBlock } from '@floip/flow-runner/src/model/block/IOutputBlock'
import { defaultsDeep } from 'lodash'
import { IFlowsState } from '../index'
import { IBlockClassConfig } from '@/store/flow/block'

export const BLOCK_CLASS_CONFIG: IBlockClassConfig = {
  name: 'Core.Output',
  type: 'Core.Output',
  is_interactive: false,
  is_branching: false,
  category:  0
}

export const getters: GetterTree<IFlowsState, IRootState> = {
}

export const mutations: MutationTree<IFlowsState> = {
}

export const actions: ActionTree<IFlowsState, IRootState> = {
  async editOutputExpression({ commit }, { blockId, value }: {blockId: string; value: string}): Promise<string> {
    commit('flow/block_updateConfig', { blockId, newConfig: { value } }, { root: true })
    return value
  },
  async createWith({ dispatch }, { props }: {props: {uuid: string} & Partial<IOutputBlock>}) {
    const exits: IBlockExit[] = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: await (new IdGeneratorUuidV4()).generate(),
          tag: 'Default',
          label: 'Default',
        }) as IBlockExit,
      }, { root: true }),
    ]

    return defaultsDeep(props, {
      type: BLOCK_CLASS_CONFIG.type,
      name: '',
      label: '',
      semantic_label: '',
      config: {
        value: '',
      },
      exits,
    })
  },

}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
}
