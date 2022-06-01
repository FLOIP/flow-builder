import {ActionTree, Module} from 'vuex'
import {IRootState} from '@/store'
import {IBlock} from '@floip/flow-runner'
import {IOutputBlock} from '@floip/flow-runner/src/model/block/IOutputBlock'
import {cloneDeep} from 'lodash'
import BaseStore, {actions as baseActions, IEmptyState} from '@/store/flow/block-types/BaseBlock'

export const BLOCK_TYPE = 'Core.Output'

const actions: ActionTree<IEmptyState, IRootState> = {
  ...baseActions,

  async editOutputExpression({commit}, {blockId, value}: { blockId: string, value: string }): Promise<string> {
    commit('flow/block_updateConfig', {blockId, newConfig: {value}}, {root: true})
    return value
  },

  async createWith({dispatch}, {props}: { props: { uuid: string } & Partial<IOutputBlock> }) {
    props.type = BLOCK_TYPE
    props.config = {
      value: '@',
    }
    return baseActions.createWith({dispatch}, {props})
  },

  handleBranchingTypeChangedToUnified({dispatch}, {block}: { block: IBlock }) {
    dispatch('flow/block_convertExitFormationToUnified', {
      blockId: block.uuid,
      test: 'block.value > 0',
    }, {root: true})
  },
}

const Core_OutputBlockStore: Module<IEmptyState, IRootState> = {
  ...cloneDeep(BaseStore),
  actions,
}

export default Core_OutputBlockStore
