import {ActionContext, ActionTree, Module} from 'vuex'
import {IRootState} from '@/store'
import {IBlock} from '@floip/flow-runner'
import {cloneDeep} from 'lodash'
import BaseBlockStore, {actions as baseActions, IEmptyState} from '@/store/flow/block-types/BaseBlockStore'

export const BLOCK_TYPE = 'SmartDevices.PhotoResponse'

const actions: ActionTree<IEmptyState, IRootState> = {
  ...baseActions,

  async createWith({getters, dispatch}, {props}: { props: { uuid: string } & Partial<IBlock> }) {
    props.type = BLOCK_TYPE
    const blankMessageResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {root: true})
    props.config = {
      prompt: blankMessageResource.uuid,
    }

    return baseActions.createWith({getters, dispatch} as ActionContext<IEmptyState, IRootState>, {props})
  },
}

const SmartDevices_PhotoResponseBlockStore: Module<IEmptyState, IRootState> = {
  ...cloneDeep(BaseBlockStore),
  actions,
}

export default SmartDevices_PhotoResponseBlockStore
