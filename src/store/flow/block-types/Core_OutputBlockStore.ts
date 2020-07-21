import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {
  IBlockExit,
} from '@floip/flow-runner'
import IdGeneratorUuidV4 from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import IOutputBlock from '@floip/flow-runner/src/model/block/IOutputBlock'
import {defaults} from 'lodash'
import {IFlowsState} from '../index'

export const BLOCK_TYPE = 'Core\\Output'

export const getters: GetterTree<IFlowsState, IRootState> = {
}

export const mutations: MutationTree<IFlowsState> = {
}

export const actions: ActionTree<IFlowsState, IRootState> = {
  async editOutputExpression({commit}, {blockId, value}: {blockId: string; value: string}) {
    commit('flow/block_updateConfig', {blockId, newConfig: {value}}, {root: true})
    return value
  },
  async createWith({dispatch}, {props}: {props: {uuid: string} & Partial<IOutputBlock>}) {
    const exits: IBlockExit[] = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: (new IdGeneratorUuidV4()).generate(),
        }) as IBlockExit,
      }, {root: true}),
    ]

    return defaults(props, {
      type: BLOCK_TYPE,
      name: '',
      label: '',
      semanticLabel: '',
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
