import {ActionTree, GetterTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlockExit, IFlow} from '@floip/flow-runner'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {IRunFlowBlock} from '@floip/flow-runner/src/model/block/IRunFlowBlock'
import {cloneDeep} from 'lodash'
import BaseStore from '@/store/flow/block-types/BaseBlock'
import {IFlowsState} from '../index'

export const BLOCK_TYPE = 'Core.RunFlow'

const getters: GetterTree<IFlowsState, IRootState> = {
  otherFlows: (
    state,
    _getters,
    rootState,
    rootGetters,
  ): IFlow[] => rootState.flow.flows.filter((flow: IFlow) => flow.uuid !== rootGetters['flow/activeFlow'].uuid),
}

const baseActions = cloneDeep(BaseStore.actions)

const actions: ActionTree<IFlowsState, IRootState> = {
  async setDestinationFlowId({commit}, {blockId, newDestinationFlowId}: { blockId: string, newDestinationFlowId: string }) {
    commit('flow/block_updateConfig', {blockId, newConfig: {flow_id: newDestinationFlowId}}, {root: true})
    return newDestinationFlowId
  },
  async createWith({dispatch}, {props}: { props: { uuid: string } & Partial<IRunFlowBlock> }) {
    props.type = BLOCK_TYPE
    props.exits = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: await (new IdGeneratorUuidV4()).generate(),
        }) as IBlockExit,
      }, {root: true}),
    ]
    props.config = {
      flow_id: '',
    }
    //TODO - fix this
    // @ts-ignore - Not all constituents of type 'Action<IFlowsState, IRootState>' are callable.
    return baseActions.createWith({dispatch}, {props})
  },
}

const Core_RunFlowBlockStore = cloneDeep(BaseStore)

Core_RunFlowBlockStore.getters.otherFlows = getters.otherFlows

Core_RunFlowBlockStore.actions.setDestinationFlowId = actions.setDestinationFlowId
Core_RunFlowBlockStore.actions.createWith = actions.createWith

export default Core_RunFlowBlockStore
