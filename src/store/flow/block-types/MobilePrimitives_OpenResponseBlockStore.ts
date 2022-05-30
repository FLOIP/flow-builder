import {ActionTree, Module} from 'vuex'
import {IRootState} from '@/store'
import {IBlock} from '@floip/flow-runner'
import {IOpenResponseBlock} from '@floip/flow-runner/src/model/block/IOpenResponseBlock'
import {cloneDeep} from 'lodash'
import BaseStore, {actions as baseActions, IEmptyState} from '@/store/flow/block-types/BaseBlock'

export const BLOCK_TYPE = 'MobilePrimitives.OpenResponse'

const actions: ActionTree<IEmptyState, IRootState> = {
  ...baseActions,

  async setMaxDurationSeconds({commit, rootGetters}, newDuration: number) {
    const activeBlock = rootGetters['builder/activeBlock']
    commit('flow/block_updateConfigByKey', {
      blockId: activeBlock.uuid,
      key: 'ivr',
      value: {
        ...activeBlock.config?.ivr,
        max_duration_seconds: newDuration,
      },
    }, {root: true})
    return newDuration
  },

  async setEndRecordingDigits({commit, rootGetters}, endRecordingDigits: number) {
    const activeBlock = rootGetters['builder/activeBlock']
    commit('flow/block_updateConfigByKey', {
      blockId: activeBlock.uuid,
      key: 'ivr',
      value: {
        ...activeBlock.config?.ivr,
        end_recording_digits: endRecordingDigits,
      },
    }, {root: true})
    return endRecordingDigits
  },

  async createWith({dispatch, commit}, {props}: { props: { uuid: string } & Partial<IOpenResponseBlock> }) {
    props.type = BLOCK_TYPE
    const blankResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {root: true})
    props.config = {
      prompt: blankResource.uuid,
    }
    return baseActions.createWith({dispatch}, {props})
  },

  handleBranchingTypeChangedToUnified({dispatch}, {block}: { block: IBlock }) {
    dispatch('flow/block_convertExitFormationToUnified', {
      blockId: block.uuid,
      test: 'LEN(block.value) > 0',
    }, {root: true})
  },
}

const MobilePrimitives_OpenResponseBlockStore: Module<IEmptyState, IRootState> = {
  ...cloneDeep(BaseStore),
  actions,
}

export default MobilePrimitives_OpenResponseBlockStore
