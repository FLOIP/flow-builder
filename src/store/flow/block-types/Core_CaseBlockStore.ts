import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlockExit} from '@floip/flow-runner'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {ICaseBlock} from '@floip/flow-runner/src/model/block/ICaseBlock'
import {defaultsDeep} from 'lodash'
import {IFlowsState} from '../index'

import {allItemsHaveValue, twoItemsBlank} from '../utils/listBuilder'

export const BLOCK_TYPE = 'Core.Case'

export const getters: GetterTree<IFlowsState, IRootState> = {
  allExitsHaveTests: (state, _getters, _rootState, rootGetters): boolean => allItemsHaveValue(
    rootGetters['builder/activeBlock'].exits,
    'test',
  ),
  twoExitsBlank: (state, _getters, _rootState, rootGetters): boolean => twoItemsBlank(rootGetters['builder/activeBlock'].exits, 'test'),

}

export const mutations: MutationTree<IFlowsState> = {}

export const actions: ActionTree<IFlowsState, IRootState> = {
  async editCaseBlockExit({
    commit, dispatch, getters, rootGetters,
  }, {identifier, value}: { identifier: string, value: string }) {
    const activeBlock = rootGetters['builder/activeBlock']
    await dispatch('flow/block_updateBlockExitWith', {
      blockId: rootGetters['builder/activeBlock'].uuid,
      exitId: identifier,
      props: {
        name: value,
        test: value,
      },
    }, {root: true})

    if (getters.allExitsHaveTests) {
      const exit: IBlockExit = await dispatch('flow/block_createBlockExitWith', {
        props: ({
          uuid: await (new IdGeneratorUuidV4()).generate(),
          name: '',
          test: '',
        }) as IBlockExit,
      }, {root: true})
      commit('flow/block_addExit', {blockId: activeBlock.uuid, newExit: exit}, {root: true})
    } else if (getters.twoExitsBlank) {
      commit('flow/block_popFirstExitWithoutTest', {blockId: activeBlock.uuid}, {root: true})
    }
  },
  async createWith({dispatch}, {props}: { props: { uuid: string } & Partial<ICaseBlock> }) {
    const exits: IBlockExit[] = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: await (new IdGeneratorUuidV4()).generate(),
          name: '',
          test: '',
        }) as IBlockExit,
      }, {root: true}),
    ]

    return defaultsDeep(props, {
      type: BLOCK_TYPE,
      name: '',
      label: '',
      semantic_label: '',
      exits,
      config: {},
    })
  },

}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
}
