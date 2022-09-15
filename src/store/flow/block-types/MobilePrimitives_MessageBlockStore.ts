import {ActionContext, ActionTree, Module} from 'vuex'
import {IRootState} from '@/store'
import {IMessageBlock} from '@floip/flow-runner/src/model/block/IMessageBlock'
import {cloneDeep} from 'lodash'
import BaseStore, {actions as baseActions, IEmptyState} from '@/store/flow/block-types/BaseBlock'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'

export const BLOCK_TYPE = 'MobilePrimitives.Message'

const actions: ActionTree<IEmptyState, IRootState> = {
  ...baseActions,

  async createWith({getters, dispatch}, {props}: { props: { uuid: string } & Partial<IMessageBlock> }) {
    props.type = BLOCK_TYPE
    const blankMessageResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {root: true})
    props.config = {
      prompt: blankMessageResource.uuid,
    }
    return baseActions.createWith({getters, dispatch} as ActionContext<IEmptyState, IRootState>, {props})
  },
}

export const MobilePrimitives_MessageBlockStore: Module<IEmptyState, IRootState> = {
  ...cloneDeep(BaseStore),
  actions,
}

export default MobilePrimitives_MessageBlockStore
export const messageBlockInstaller = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, MobilePrimitives_MessageBlockStore)
