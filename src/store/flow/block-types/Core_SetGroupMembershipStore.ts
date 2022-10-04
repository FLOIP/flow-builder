import {ActionContext, ActionTree, Module} from 'vuex'
import {IRootState} from '@/store'
import {ISetContactPropertyBlock, ISetGroupMembershipBlockConfig} from '@floip/flow-runner'
import {cloneDeep} from 'lodash'
import BaseBlockStore, {actions as baseActions, IEmptyState} from '@/store/flow/block-types/BaseBlockStore'
import {ValidationResults} from '@/lib/validations'

export interface IGroupOption {
  id: string,
  name: string,
}

export const ADD_KEY = 'add'
export const REMOVE_KEY = 'remove'

export const BLOCK_TYPE = 'Core.SetGroupMembership'

const actions: ActionTree<IEmptyState, IRootState> = {
  ...baseActions,

  async createWith({getters, dispatch}, {props}: { props: { uuid: string } & Partial<ISetGroupMembershipBlockConfig> }) {
    props.type = BLOCK_TYPE
    props.config = {
      is_member: true,
      groups: [],
      clear: false,
    }
    return baseActions.createWith({getters, dispatch} as ActionContext<IEmptyState, IRootState>, {props})
  },

  async setIsMember({commit, rootGetters}, action) {
    const activeBlock = rootGetters['builder/activeBlock']
    let isMember = false
    if (action === true) {
      isMember = action.id === ADD_KEY
    }
    commit('flow/block_updateConfigByPath', {
      blockId: activeBlock.uuid,
      path: 'is_member',
      value: isMember,
    }, {root: true})
  },

  async validateWithProgrammaticLogic(
    _ctx: unknown,
    {block}: {block: ISetContactPropertyBlock},
  ): Promise<ValidationResults> {
    console.debug('floip/SetGroupMembership/validateWithProgrammaticLogic()', `${block.type}`)
    const errors: ValidationResults = []

    const {groups, is_member} = block.config

    if (is_member !== undefined && groups?.length === 0) {
      errors.push(['/config/groups', 'set-group-membership-groups-required'])
    }
    return errors
  },
}

const Core_SetGroupMembershipStore: Module<IEmptyState, IRootState> = {
  ...cloneDeep(BaseBlockStore),
  actions,
}

export default Core_SetGroupMembershipStore
