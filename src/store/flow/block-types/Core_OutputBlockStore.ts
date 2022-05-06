import {ActionTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlock, IBlockExit} from '@floip/flow-runner'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {IOutputBlock} from '@floip/flow-runner/src/model/block/IOutputBlock'
import {cloneDeep} from 'lodash'
import BaseStore from '@/store/flow/block-types/BaseBlock'
import {IFlowsState} from '../index'

export const BLOCK_TYPE = 'Core.Output'

const baseActions = cloneDeep(BaseStore.actions)

const actions: ActionTree<IFlowsState, IRootState> = {
  async editOutputExpression({commit}, {blockId, value}: { blockId: string, value: string }): Promise<string> {
    commit('flow/block_updateConfig', {blockId, newConfig: {value}}, {root: true})
    return value
  },
  async createWith({dispatch}, {props}: { props: { uuid: string } & Partial<IOutputBlock> }) {
    props.type = BLOCK_TYPE
    props.exits = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: await (new IdGeneratorUuidV4()).generate(),
        }) as IBlockExit,
      }, {root: true}),
    ]
    props.config = {
      value: null,
    }
    //TODO - fix this
    // @ts-ignore - Not all constituents of type 'Action<IFlowsState, IRootState>' are callable.
    return baseActions.createWith({dispatch}, {props})
  },

  handleBranchingTypeChangedToUnified({dispatch}, {block}: { block: IBlock }) {
    dispatch('flow/block_convertExitFormationToUnified', {
      blockId: block.uuid,
      test: 'block.value > 0',
    }, {root: true})
  },
}

const Core_OutputBlockStore = cloneDeep(BaseStore)
Core_OutputBlockStore.actions.editOutputExpression = actions.editOutputExpression
Core_OutputBlockStore.actions.createWith = actions.createWith
Core_OutputBlockStore.actions.handleBranchingTypeChangedToUnified = actions.handleBranchingTypeChangedToUnified

export default Core_OutputBlockStore
