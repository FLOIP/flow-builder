import {ActionTree, GetterTree, Module} from 'vuex'
import {IRootState} from '@/store'
import {IBlock, IFlow} from '@floip/flow-runner'
import {IRunFlowBlock} from '@floip/flow-runner/src/model/block/IRunFlowBlock'
import {cloneDeep} from 'lodash'
import BaseStore, {actions as baseActions, IEmptyState} from '@/store/flow/block-types/BaseBlock'
import {Core_RunFlowBlockValidator} from '@/lib/validations'

export const BLOCK_TYPE = 'Core.RunFlow'

const getters: GetterTree<IEmptyState, IRootState> = {
  otherFlows: (
    state,
    _getters,
    rootState,
    rootGetters,
  ): IFlow[] => rootState.flow.flows.filter((flow: IFlow) => flow.uuid !== rootGetters['flow/activeFlow'].uuid),
}

const actions: ActionTree<IEmptyState, IRootState> = {
  ...baseActions,

  async setDestinationFlowId({commit}, {blockId, newDestinationFlowId}: { blockId: string, newDestinationFlowId: string }) {
    commit('flow/block_updateConfig', {blockId, newConfig: {flow_id: newDestinationFlowId}}, {root: true})
    return newDestinationFlowId
  },
  async createWith({dispatch}, {props}: { props: { uuid: string } & Partial<IRunFlowBlock> }) {
    props.type = BLOCK_TYPE
    props.config = {
      flow_id: '',
    }
    return baseActions.createWith({dispatch}, {props})
  },

  async validate({rootGetters}, {block, schemaVersion}: {block: IBlock, schemaVersion: string}) {
    return Core_RunFlowBlockValidator.runAllValidations(block, schemaVersion)
  },
}

const Core_RunFlowBlockStore: Module<IEmptyState, IRootState> = {
  ...cloneDeep(BaseStore),
  getters,
  actions,
}

export default Core_RunFlowBlockStore
