import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { IRootState } from '@/store'
import {
  IBlockExit,
  ISetGroupMembershipBlockConfig,
} from '@floip/flow-runner'
import { IdGeneratorUuidV4 } from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import { defaultsDeep } from 'lodash'
import { IFlowsState } from '../index'
import { IBlockClassConfig } from '@/store/flow/block'

export const BLOCK_CLASS_CONFIG: IBlockClassConfig = {
  name: 'Core.SetGroupMembership',
  type: 'Core.SetGroupMembership',
  is_interactive: false,
  is_branching: false,
  category:  0
}

export const ADD_KEY = 'add'
export const REMOVE_KEY = 'remove'

export const getters: GetterTree<IFlowsState, IRootState> = {}

export const mutations: MutationTree<IFlowsState> = {}

export const actions: ActionTree<IFlowsState, IRootState> = {
  async createWith({ dispatch }, { props }: { props: { uuid: string } & Partial<ISetGroupMembershipBlockConfig> }) {
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
        group_key: '',
        group_name: '',
        is_member: null,
      },
      exits,
    })
  },

  async setIsMember({ commit, rootGetters }, action) {
    const activeBlock = rootGetters['builder/activeBlock']
    let isMember = ''
    if(action) {
      const isMemberBoolean = action.id === ADD_KEY
      isMember = isMemberBoolean.toString() // is_member is an expression, that's why it's a string
    }

    commit('flow/block_updateConfigByPath', {
      blockId: activeBlock.uuid,
      path: 'is_member',
      value: isMember,
    }, { root: true })
  },
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
}
