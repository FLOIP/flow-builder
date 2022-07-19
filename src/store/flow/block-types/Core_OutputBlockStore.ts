import {ActionTree, Module} from 'vuex'
import {IRootState} from '@/store'
import {IOutputBlock} from '@floip/flow-runner/src/model/block/IOutputBlock'
import {cloneDeep} from 'lodash'
import BaseStore, {actions as baseActions, IEmptyState} from '@/store/flow/block-types/BaseBlock'

export const BLOCK_TYPE = 'Core.Output'

const actions: ActionTree<IEmptyState, IRootState> = {
  ...baseActions,

  async editOutputExpression({commit}, {blockId, value}: { blockId: string, value: string }): Promise<string> {
    commit('flow/block_updateConfigByKey', {
      blockId,
      key: 'value',
      value,
    }, {root: true})
    return value
  },

  async createWith({getters, dispatch}, {props}: { props: { uuid: string } & Partial<IOutputBlock> }) {
    props.type = BLOCK_TYPE
    props.config = {
      value: '@',
    }
    return baseActions.createWith({getters, dispatch}, {props})
  },
}

const Core_OutputBlockStore: Module<IEmptyState, IRootState> = {
  ...cloneDeep(BaseStore),
  actions,
}

export default Core_OutputBlockStore
