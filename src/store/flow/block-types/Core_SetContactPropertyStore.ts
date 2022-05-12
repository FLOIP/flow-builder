import {ActionTree, Module} from 'vuex'
import {IRootState} from '@/store'
import {IBlockConfig} from '@floip/flow-runner'
import {cloneDeep} from 'lodash'
import BaseStore, {actions as baseActions, IEmptyState} from '@/store/flow/block-types/BaseBlock'

export interface IContactPropertyOption {
  id: string,
  name: string,
  display_label: string,
}

export const BLOCK_TYPE = 'Core.SetContactProperty'

const actions: ActionTree<IEmptyState, IRootState> = {
  ...baseActions,

  async createWith({dispatch}, {props}: { props: { uuid: string } & Partial<IBlockConfig> }) {
    props.type = BLOCK_TYPE
    props.config = {
        set_contact_property: {
          property_key: '',
          property_value: '',
        },
    }
    return baseActions.createWith({dispatch}, {props})
  },
}

const Core_SetContactPropertyStore: Module<IEmptyState, IRootState> = {
  ...cloneDeep(BaseStore),
  actions,
}

export default Core_SetContactPropertyStore
