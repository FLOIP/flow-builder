import {ActionContext, ActionTree, Module} from 'vuex'
import {IRootState} from '@/store'
import {IBlockConfig} from '@floip/flow-runner'
import {cloneDeep} from 'lodash'
import BaseStore, {actions as baseActions, IEmptyState} from '@/store/flow/block-types/BaseBlock'

export const BLOCK_TYPE = 'Core.SetContactProperty'

const actions: ActionTree<IEmptyState, IRootState> = {
  ...baseActions,

  async createWith({getters, dispatch}, {props}: { props: { uuid: string } & Partial<IBlockConfig> }) {
    props.type = BLOCK_TYPE
    props.config = {
      // Important, set_contact_property should be empty by default, to avoid weird validation behaviour in consumer side
      set_contact_property: [],
    }
    return baseActions.createWith({getters, dispatch} as ActionContext<IEmptyState, IRootState>, {props})
  },
}

const Core_SetContactPropertyStore: Module<IEmptyState, IRootState> = {
  ...cloneDeep(BaseStore),
  actions,
}

export default Core_SetContactPropertyStore
