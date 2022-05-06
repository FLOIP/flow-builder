import {ActionTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlockExit} from '@floip/flow-runner'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {ICaseBlock} from '@floip/flow-runner/src/model/block/ICaseBlock'
import {cloneDeep} from 'lodash'
import {OutputBranchingType} from '@/components/interaction-designer/block-editors/BlockOutputBranchingConfig.vue'
import BaseStore from '@/store/flow/block-types/BaseBlock'
import {IFlowsState} from '../index'

export const BLOCK_TYPE = 'Core.Case'

const baseActions = cloneDeep(BaseStore.actions)

const actions: ActionTree<IFlowsState, IRootState> = {
  async createWith({dispatch}, {props}: { props: { uuid: string } & Partial<ICaseBlock> }) {
    props.type = BLOCK_TYPE
    props.exits = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: await (new IdGeneratorUuidV4()).generate(),
        }) as IBlockExit,
      }, {root: true}),
    ]
    props.vendor_metadata = {
      io_viamo: {
        branchingType: OutputBranchingType.ADVANCED,
      },
    }
    //TODO - fix this
    // @ts-ignore - Not all constituents of type 'Action<IFlowsState, IRootState>' are callable.
    return baseActions.createWith({dispatch}, {props})
  },
}

const Core_CaseBlockStore = cloneDeep(BaseStore)
Core_CaseBlockStore.actions.createWith = actions.createWith

export default Core_CaseBlockStore
