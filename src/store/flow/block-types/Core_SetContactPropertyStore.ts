import {ActionTree, Module} from 'vuex'
import {IRootState} from '@/store'
import {IBlock, IBlockConfig} from '@floip/flow-runner'
import {cloneDeep} from 'lodash'
import BaseStore, {actions as baseActions, IEmptyState} from '@/store/flow/block-types/BaseBlock'

export interface IContactPropertyOption {
  id: string,
  name: string,
  display_label: string,
  data_type: string,
}

export interface IContactPropertyOptionForUISelector extends IContactPropertyOption {
  // $isDisabled is used by vue-multiselect
  $isDisabled: boolean,
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

  handleBranchingTypeChangedToUnified({dispatch}, {block}: { block: IBlock }) {
    dispatch('flow/block_resetBranchingExitsToDefaultOnly', {
      blockId: block.uuid,
    }, {root: true})
  },
}

const Core_SetContactPropertyStore: Module<IEmptyState, IRootState> = {
  ...cloneDeep(BaseStore),
  actions,
}

export default Core_SetContactPropertyStore
