import {ActionTree, Module} from 'vuex'
import {IRootState} from '@/store'
import {IBlock} from '@floip/flow-runner'
import {IMessageBlock} from '@floip/flow-runner/src/model/block/IMessageBlock'
import {cloneDeep} from 'lodash'
import BaseStore, {actions as baseActions, IEmptyState} from '@/store/flow/block-types/BaseBlock'

export const BLOCK_TYPE = 'MobilePrimitives.Message'

const actions: ActionTree<IEmptyState, IRootState> = {
  ...baseActions,

  async createWith({dispatch}, {props}: { props: { uuid: string } & Partial<IMessageBlock> }) {
    props.type = BLOCK_TYPE
    const blankMessageResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {root: true})
    props.config = {
      prompt: blankMessageResource.uuid,
    }
    return baseActions.createWith({dispatch}, {props})
  },

  handleBranchingTypeChangedToUnified({dispatch}, {block}: { block: IBlock }) {
    dispatch('flow/block_updateBranchingExitsToDefaultOnly', {
      blockId: block.uuid,
    }, {root: true})
  },
}

const MobilePrimitives_MessageBlockStore: Module<IEmptyState, IRootState> = {
  ...cloneDeep(BaseStore),
  actions,
}

export default MobilePrimitives_MessageBlockStore
