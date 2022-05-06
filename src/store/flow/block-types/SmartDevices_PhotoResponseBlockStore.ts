import {ActionTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlock, IBlockExit} from '@floip/flow-runner'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {cloneDeep} from 'lodash'
import BaseStore from '@/store/flow/block-types/BaseBlock'
import {IFlowsState} from '../index'

export const BLOCK_TYPE = 'SmartDevices.PhotoResponse'

const baseActions = cloneDeep(BaseStore.actions)

const actions: ActionTree<IFlowsState, IRootState> = {
  async createWith({dispatch}, {props}: { props: { uuid: string } & Partial<IBlock> }) {
    props.type = BLOCK_TYPE
    props.exits = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: await (new IdGeneratorUuidV4()).generate(),
        }) as IBlockExit,
      }, {root: true}),
    ]

    const blankMessageResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {root: true})
    props.config = {
      prompt: blankMessageResource.uuid,
    }

    //TODO - fix this
    // @ts-ignore - Not all constituents of type 'Action<IFlowsState, IRootState>' are callable.
    return baseActions.createWith({dispatch}, {props})
  },

  handleBranchingTypeChangedToUnified({dispatch}, {block}: { block: IBlock }) {
    dispatch('flow/block_convertExitFormationToUnified', {
      blockId: block.uuid,
      test: 'NOT(block.value = false)',
    }, {root: true})
  },
}

const SmartDevices_PhotoResponseBlockStore = cloneDeep(BaseStore)
SmartDevices_PhotoResponseBlockStore.actions.createWith = actions.createWith
SmartDevices_PhotoResponseBlockStore.actions.handleBranchingTypeChangedToUnified = actions.handleBranchingTypeChangedToUnified

export default SmartDevices_PhotoResponseBlockStore
