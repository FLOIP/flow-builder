import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {
  IBlockExitTestRequired,
  findBlockOnActiveFlowWith,
  IContext,
} from '@floip/flow-runner'
import IdGeneratorUuidV4 from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import ICaseBlock from '@floip/flow-runner/src/model/block/ICaseBlock'
import {defaults} from 'lodash'
import {IFlowsState} from '../index'

import { allItemsHaveValue, twoItemsBlank} from '../utils/listBuilder'

export const BLOCK_TYPE = 'Core\\Case'

export const getters: GetterTree<IFlowsState, IRootState> = {
  allExitsHaveTests: (state, getters, rootState, rootGetters): boolean => {
    return allItemsHaveValue(rootGetters['builder/activeBlock'].exits, 'test')
  },
  twoExitsBlank: (state, getters, rootState, rootGetters): boolean => {
    return twoItemsBlank(rootGetters['builder/activeBlock'].exits, 'test')
  },

}

export const mutations: MutationTree<IFlowsState> = {
}

export const actions: ActionTree<IFlowsState, IRootState> = {
  async editCaseBlockExit({commit, dispatch, getters, rootGetters}, {identifier, value}: {identifier: string; value: string}) {
    const activeBlock = rootGetters['builder/activeBlock']
    await dispatch('flow/block_updateBlockExitWith', {
      blockId: rootGetters['builder/activeBlock'].uuid,
      exitId: identifier,
      value,
    }, {root: true})
    if (getters.allExitsHaveTests) {
      const exit: IBlockExitTestRequired = await dispatch('flow/block_createBlockExitWith', {
        props: ({
          uuid: (new IdGeneratorUuidV4()).generate(),
          test: '', // todo: get started on a basic expression api
        }) as IBlockExitTestRequired,
      }, {root: true})
      commit('flow/block_pushNewExit', {blockId: activeBlock.uuid, newExit: exit}, {root: true})
    } else if (getters.twoExitsBlank) {
      commit('flow/block_popFirstExitWithoutTest', {blockId: activeBlock.uuid}, {root: true})
    }
  },
  async createWith({dispatch}, {props}: {props: {uuid: string} & Partial<ICaseBlock>}) {
    const exits: IBlockExitTestRequired[] = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: (new IdGeneratorUuidV4()).generate(),
          test: '',
        }) as IBlockExitTestRequired,
      }, {root: true}),
    ]

    return defaults(props, {
      type: BLOCK_TYPE,
      name: '',
      label: '',
      semanticLabel: '',
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
