import { ActionTree, GetterTree, MutationTree } from 'vuex'
import {IRootState} from '@/store'
import {
  IBlockExit,
  ISetGroupMembershipBlockConfig
} from '@floip/flow-runner'
import { IdGeneratorUuidV4 } from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import { defaults } from 'lodash'
import { IFlowsState } from '../index'

export const ADD_KEY = 'add'
export const REMOVE_KEY = 'remove'

export const BLOCK_TYPE = 'Core\\SetGroupMembership'

export const getters: GetterTree<IFlowsState, IRootState> = {}

export const mutations: MutationTree<IFlowsState> = {}

export const actions: ActionTree<IFlowsState, IRootState> = {
  async createWith({dispatch}, {props}: { props: { uuid: string } & Partial<ISetGroupMembershipBlockConfig> }) {
    const exits: IBlockExit[] = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: (new IdGeneratorUuidV4()).generate(),
          tag: 'Default',
          label: 'Default',
        }) as IBlockExit,
      }, {root: true}),
    ]

    return defaults(props, {
      type: BLOCK_TYPE,
      name: '',
      label: '',
      semanticLabel: '',
      config: {
        groupKey: '',
        groupName: '',
        isMember: null,
      },
      exits,
    })
  },

  setIsMember({ commit, rootGetters }, { value }) {
    const activeBlock = rootGetters['builder/activeBlock']
    commit('flow/block_updateConfigByPath', {
      blockId: activeBlock.uuid,
      path: 'isMember',
      value: value === null || value === undefined ? null : (value.id === ADD_KEY),
    })
  }
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
}
