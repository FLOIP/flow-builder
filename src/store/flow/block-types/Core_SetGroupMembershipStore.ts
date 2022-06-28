import {ActionTree, Module} from 'vuex'
import {IRootState} from '@/store'
import {IBlock, ISetGroupMembershipBlockConfig} from '@floip/flow-runner'
import {cloneDeep} from 'lodash'
import BaseStore, {actions as baseActions, IEmptyState} from '@/store/flow/block-types/BaseBlock'
import SupplementaryAJVErrorsBuilder from '@/lib/validations/SupplementaryAJVErrorsBuilder'

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
    dispatch('flow/block_updateBranchingExitsToDefaultOnly', {
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

  async validate({rootGetters, dispatch}, {block, schemaVersion}: {block: IBlock, schemaVersion: string}) {
    const validationResults = await dispatch('validateBlockWithCustomJsonSchema', {block, schemaVersion})
    const errors = new SupplementaryAJVErrorsBuilder()

    const {groups, clear} = block.config

    console.info(`sgm custom validation: clear ${clear} groups count ${groups.length}`)

    if (clear === false && groups.length === 0) {
      errors.add('/config/groups', 'set-group-membership-groups-required')
    }

    const allErrors = [
      ...validationResults.ajvErrors ?? [],
      ...errors.list(),
    ]

    validationResults.ajvErrors = allErrors.length > 0 ? allErrors : null

    return validationResults
  },
}

const Core_SetGroupMembershipStore: Module<IEmptyState, IRootState> = {
  ...cloneDeep(BaseStore),
  actions,
}

export default Core_SetGroupMembershipStore
