import {ActionTree, Module} from 'vuex'
import {IRootState} from '@/store'
import {IBlock, IBlockExit} from '@floip/flow-runner'
import {cloneDeep} from 'lodash'
import BaseStore, {actions as baseActions, IEmptyState} from '@/store/flow/block-types/BaseBlock'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'

export const BLOCK_TYPE = 'SmartDevices.LocationResponse'

const actions: ActionTree<IEmptyState, IRootState> = {
  ...baseActions,

  async setAccuracyThreshold({commit}, {blockId, value}: { blockId: string, value: number }) {
    commit('flow/block_updateConfigByKey', {
      blockId,
      key: 'accuracy_threshold_meters',
      value,
    }, {root: true})
    return value
  },

  async setAccuracyTimeout({commit}, {blockId, value}: { blockId: string, value: number }) {
    commit('flow/block_updateConfigByKey', {
      blockId,
      key: 'accuracy_timeout_seconds',
      value,
    }, {root: true})
    return value
  },

  async createWith({dispatch}, {props}: { props: { uuid: string } & Partial<IBlock> }) {
    props.type = BLOCK_TYPE
    const blankMessageResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {root: true})
    props.config = {
      prompt: blankMessageResource.uuid,
      accuracy_threshold_meters: 5.0,
      accuracy_timeout_seconds: 120,
      ...await dispatch('initiateExtraVendorConfig'),
    }

    props.exits = [
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
    dispatch('flow/block_resetBranchingExitsByCollapsingNonDefault', {
      blockId: block.uuid,
      test: 'NOT(block.value = false)',
      name: 'Valid',
    }, {root: true})
  },
}

const SmartDevices_LocationResponseBlockStore: Module<IEmptyState, IRootState> = {
  ...cloneDeep(BaseStore),
  actions,
}

export default SmartDevices_LocationResponseBlockStore
