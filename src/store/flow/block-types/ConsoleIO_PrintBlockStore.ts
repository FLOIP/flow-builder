import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlockExit} from '@floip/flow-runner'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {IPrintBlock} from '@floip/flow-runner/src/model/block/IPrintBlock'
import {defaultsDeep} from 'lodash'
import {IFlowsState} from '../index'

export const BLOCK_TYPE = 'ConsoleIO.Print'

export const getters: GetterTree<IFlowsState, IRootState> = {}

export const mutations: MutationTree<IFlowsState> = {}
export const actions: ActionTree<IFlowsState, IRootState> = {
  async editMessage({commit}, {blockId, message}: { blockId: string, message: string }): Promise<string> {
    commit('flow/block_updateConfig', {blockId, newConfig: {message}}, {root: true})
    return message
  },
  async createWith({dispatch}, {props}: { props: { uuid: string } & Partial<IPrintBlock> }) {
    const exits: IBlockExit[] = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: await (new IdGeneratorUuidV4()).generate(),
          name: 'Default',
        }) as IBlockExit,
      }, {root: true}),
    ]

    return defaultsDeep(props, {
      type: BLOCK_TYPE,
      name: '',
      label: '',
      semantic_label: '',
      exits,
      config: {
        message: '',
      },
      tags: [],
    })
  },

}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
}
