import {ActionTree, Module} from 'vuex'
import {IRootState} from '@/store'
import {ILogBlock} from '@floip/flow-runner/src/model/block/ILogBlock'
import {cloneDeep} from 'lodash'
import BaseStore, {actions as baseActions, IEmptyState} from '@/store/flow/block-types/BaseBlock'

export const BLOCK_TYPE = 'Core.Log'

const actions: ActionTree<IEmptyState, IRootState> = {
  ...baseActions,

  async editMessage({commit}, {blockId, message}: { blockId: string, message: string }): Promise<string> {
    commit('flow/block_updateConfigByKey', {
      blockId,
      key: 'message',
      value: message,
    }, {root: true})
    return message
  },

  async createWith({dispatch}, {props}: { props: { uuid: string } & Partial<ILogBlock> }) {
    props.type = BLOCK_TYPE
    props.config = {
      message: '',
    }
    return baseActions.createWith({dispatch}, {props})
  },
}

const Core_LogBlockStore: Module<IEmptyState, IRootState> = {
  ...cloneDeep(BaseStore),
  actions,
}

export default Core_LogBlockStore
