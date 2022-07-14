import {ActionTree, Module} from 'vuex'
import {IRootState} from '@/store'
import {ICaseBlock} from '@floip/flow-runner/src/model/block/ICaseBlock'
import {cloneDeep} from 'lodash'
import {OutputBranchingType} from '@/components/interaction-designer/block-editors/BlockOutputBranchingConfig.vue'
import BaseStore, {actions as baseActions, IEmptyState} from '@/store/flow/block-types/BaseBlock'

export const BLOCK_TYPE = 'Core.Case'

const actions: ActionTree<IEmptyState, IRootState> = {
  ...baseActions,

  async createWith({dispatch}, {props}: { props: { uuid: string } & Partial<ICaseBlock> }) {
    props.type = BLOCK_TYPE
    props.vendor_metadata = {
      floip: {
        ui_metadata: {
          branching_type: OutputBranchingType.ADVANCED,
          should_auto_update_name: true,
        },
      },
    }
    return baseActions.createWith({dispatch}, {props})
  },
}

const Core_CaseBlockStore: Module<IEmptyState, IRootState> = {
  ...cloneDeep(BaseStore),
  actions,
}

export default Core_CaseBlockStore
