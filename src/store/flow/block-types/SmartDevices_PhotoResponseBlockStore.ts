import {ActionTree, Module} from 'vuex'
import {IRootState} from '@/store'
import {IBlock, IBlockExit} from '@floip/flow-runner'
import {cloneDeep} from 'lodash'
import BaseStore, {actions as baseActions, IEmptyState} from '@/store/flow/block-types/BaseBlock'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'

export const BLOCK_TYPE = 'SmartDevices.PhotoResponse'

const TEST_ON_VALID_EXIT = 'NOT(block.value = false)'

const actions: ActionTree<IEmptyState, IRootState> = {
  ...baseActions,

  async createWith({dispatch}, {props}: { props: { uuid: string } & Partial<IBlock> }) {
    props.type = BLOCK_TYPE
    const blankMessageResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {root: true})
    props.config = {
      prompt: blankMessageResource.uuid,
    }

    props.exits = [
      await dispatch('flow/block_createBlockExitWith', {
        props: ({
          uuid: await (new IdGeneratorUuidV4()).generate(),
          name: 'Valid',
          test: TEST_ON_VALID_EXIT,
        }) as IBlockExit,
      }, {root: true}),
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: await (new IdGeneratorUuidV4()).generate(),
          name: 'Invalid',
        }) as IBlockExit,
      }, {root: true}),
    ]

    return baseActions.createWith({dispatch}, {props})
  },

  handleBranchingTypeChangedToUnified({dispatch}, {block}: { block: IBlock }) {
    dispatch('flow/block_updateBranchingExitsWithInvalidScenario', {
      blockId: block.uuid,
      test: TEST_ON_VALID_EXIT,
    }, {root: true})
  },
}

const SmartDevices_PhotoResponseBlockStore: Module<IEmptyState, IRootState> = {
  ...cloneDeep(BaseStore),
  actions,
}

export default SmartDevices_PhotoResponseBlockStore
