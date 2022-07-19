import {ActionTree, Module} from 'vuex'
import {IRootState} from '@/store'
import {IPrintBlock} from '@floip/flow-runner/src/model/block/IPrintBlock'
import {cloneDeep} from 'lodash'
import BaseStore, {actions as baseActions, IEmptyState} from '@/store/flow/block-types/BaseBlock'

export const BLOCK_TYPE = 'ConsoleIO.Print'

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

  async createWith({getters, dispatch}, {props}: { props: { uuid: string } & Partial<IPrintBlock> }) {
    props.type = BLOCK_TYPE
    props.config = {
      message: '',
    }
    return baseActions.createWith({getters, dispatch}, {props})
  },
}

const ConsoleIO_PrintBlockStore: Module<IEmptyState, IRootState> = {
  ...cloneDeep(BaseStore),
  actions,
}

export default ConsoleIO_PrintBlockStore
