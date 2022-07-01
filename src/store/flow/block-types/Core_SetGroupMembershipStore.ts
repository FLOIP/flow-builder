import {ActionTree, Module} from 'vuex'
import {IRootState} from '@/store'
import {IBlock, ISetGroupMembershipBlockConfig} from '@floip/flow-runner'
import {cloneDeep} from 'lodash'
import BaseStore, {actions as baseActions, IEmptyState} from '@/store/flow/block-types/BaseBlock'

export interface IGroupOption {
  id: string,
  name: string,
}

export const ADD_KEY = 'add'
export const REMOVE_KEY = 'remove'

export const BLOCK_TYPE = 'Core.SetGroupMembership'

const actions: ActionTree<IEmptyState, IRootState> = {
  ...baseActions,

  async createWith({dispatch}, {props}: { props: { uuid: string } & Partial<ISetGroupMembershipBlockConfig> }) {
    props.type = BLOCK_TYPE
    props.config = {
      is_member: true,
      groups: [],
      clear: false,
    }
    return baseActions.createWith({dispatch}, {props})
  },

  handleBranchingTypeChangedToUnified({dispatch}, {block}: { block: IBlock }) {
    dispatch('flow/block_resetBranchingExitsToDefaultOnly', {
      blockId: block.uuid,
    }, {root: true})
  },

  async setIsMember({commit, rootGetters}, action) {
    const activeBlock = rootGetters['builder/activeBlock']
    let isMember = false
    if (action) {
      isMember = action.id === ADD_KEY
    }
    commit('flow/block_updateConfigByPath', {
      blockId: activeBlock.uuid,
      path: 'is_member',
      value: isMember,
    }, {root: true})
  },
}

const Core_SetGroupMembershipStore: Module<IEmptyState, IRootState> = {
  ...cloneDeep(BaseStore),
  actions,
}

export default Core_SetGroupMembershipStore
