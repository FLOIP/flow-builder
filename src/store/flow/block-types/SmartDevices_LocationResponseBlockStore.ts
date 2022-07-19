import {ActionTree, Module} from 'vuex'
import {IRootState} from '@/store'
import {IBlock} from '@floip/flow-runner'
import {cloneDeep} from 'lodash'
import BaseStore, {actions as baseActions, IEmptyState} from '@/store/flow/block-types/BaseBlock'

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

  async createWith({getters, dispatch}, {props}: { props: { uuid: string } & Partial<IBlock> }) {
    props.type = BLOCK_TYPE
    const blankMessageResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {root: true})
    props.config = {
      prompt: blankMessageResource.uuid,
      accuracy_threshold_meters: 5.0,
      accuracy_timeout_seconds: 120,
    }

    return baseActions.createWith({getters, dispatch}, {props})
  },
}

const SmartDevices_LocationResponseBlockStore: Module<IEmptyState, IRootState> = {
  ...cloneDeep(BaseStore),
  actions,
}

export default SmartDevices_LocationResponseBlockStore
