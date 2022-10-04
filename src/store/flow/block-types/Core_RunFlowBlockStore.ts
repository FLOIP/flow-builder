import {ActionContext, ActionTree, GetterTree, Module} from 'vuex'
import {IRootState} from '@/store'
import {IBlock, IFlow} from '@floip/flow-runner'
import {cloneDeep} from 'lodash'
import BaseBlockStore, {actions as baseActions, getters as baseGetters, IEmptyState} from '@/store/flow/block-types/BaseBlockStore'

export const BLOCK_TYPE = 'Core.RunFlow'

const getters: GetterTree<IEmptyState, IRootState> = {
  ...baseGetters,
  otherFlows: (
    state,
    _getters,
    rootState,
    rootGetters,
  ): IFlow[] => rootState.flow.flows.filter((flow: IFlow) => flow.uuid !== rootGetters['flow/activeFlow'].uuid),
}

const actions: ActionTree<IEmptyState, IRootState> = {
  ...baseActions,

  async setDestinationFlowId({commit}, {blockId, newDestinationFlowId}: { blockId: string, newDestinationFlowId: string | undefined }) {
    commit('flow/block_updateConfig', {blockId, newConfig: {flow_id: newDestinationFlowId}}, {root: true})
    return newDestinationFlowId
  },
  async createWith({getters, dispatch}, {props}: { props: { uuid: string } & Partial<IBlock> }) {
    props.type = BLOCK_TYPE
    props.config = {
      flow_id: undefined,
    }
    return baseActions.createWith({getters, dispatch} as ActionContext<IEmptyState, IRootState>, {props})
  },
}

const Core_RunFlowBlockStore: Module<IEmptyState, IRootState> = {
  ...cloneDeep(BaseBlockStore),
  getters,
  actions,
}

export default Core_RunFlowBlockStore
