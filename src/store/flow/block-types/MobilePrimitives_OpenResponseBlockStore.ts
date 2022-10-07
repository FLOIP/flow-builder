import {ActionContext, ActionTree, Module} from 'vuex'
import {IRootState} from '@/store'
import {IOpenResponseBlock} from '@floip/flow-runner/src/model/block/IOpenResponseBlock'
import {cloneDeep} from 'lodash'
import BaseBlockStore, {actions as baseActions, IEmptyState} from '@/store/flow/block-types/BaseBlockStore'

export const BLOCK_TYPE = 'MobilePrimitives.OpenResponse'

const actions: ActionTree<IEmptyState, IRootState> = {
  ...baseActions,

  async setMaxDurationSeconds({commit, rootGetters}, duration: number) {
    const activeBlock = rootGetters['builder/activeBlock']
    commit('flow/block_updateConfigByPath', {
      blockId: activeBlock.uuid,
      path: 'ivr.max_duration_seconds',
      value: duration,
    }, {root: true})
  },

  async setEndRecordingDigits({commit, rootGetters}, endRecordingDigits: number) {
    const activeBlock = rootGetters['builder/activeBlock']
    commit('flow/block_updateConfigByPath', {
      blockId: activeBlock.uuid,
      path: 'ivr.end_recording_digits',
      value: endRecordingDigits,
    }, {root: true})
  },

  async createWith({getters, dispatch, commit}, {props}: { props: { uuid: string } & Partial<IOpenResponseBlock> }) {
    props.type = BLOCK_TYPE
    const blankResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {root: true})
    props.config = {
      prompt: blankResource.uuid,
    }
    return baseActions.createWith({getters, dispatch} as ActionContext<IEmptyState, IRootState>, {props})
  },
}

const MobilePrimitives_OpenResponseBlockStore: Module<IEmptyState, IRootState> = {
  ...cloneDeep(BaseBlockStore),
  actions,
}

export default MobilePrimitives_OpenResponseBlockStore
