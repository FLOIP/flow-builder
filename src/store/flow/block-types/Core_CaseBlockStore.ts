import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {
  IBlockExitTestRequired,
  IBlockExit,
  findBlockOnActiveFlowWith,
  IContext,
} from '@floip/flow-runner'
import IdGeneratorUuidV4 from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import ICaseBlock from '@floip/flow-runner/src/model/block/ICaseBlock'
import {defaults, find, without} from 'lodash'
import {IFlowsState} from '../index'

export const BLOCK_TYPE = 'Core\\Case'

export const getters: GetterTree<IFlowsState, IRootState> = {
  allExitsHaveTests: (state, getters, rootState, rootGetters): boolean => {
    return rootGetters['flow/activeBlock'].exits.every((exit: IBlockExitTestRequired) => !!exit.test)
  },
  twoExitsBlank: (state, getters, rootState, rootGetters): boolean => {
    let blankNumber = 0

    return rootGetters['flow/activeBlock'].exits.some((exit: IBlockExitTestRequired) => {
      if (!exit.test) {
        blankNumber += 1
      }

      if (blankNumber > 1) {
        return true
      }

      return false
    })
  },

}

export const mutations: MutationTree<IFlowsState> = {
  popFirstEmptyExit(state, {blockId}: {blockId: string}) {
    //TODO - this shouldn't be necessary
    // @ts-ignore - TS2339: Property 'flow' does not exist on type
    const block = findBlockOnActiveFlowWith(blockId, this.state.flow as unknown as IContext)
    const exitToRemove = find(block.exits, (exit: IBlockExit) => !exit.test)
    if (exitToRemove) {
      block.exits = without(block.exits, exitToRemove)
    }
  },
}

export const actions: ActionTree<IFlowsState, IRootState> = {
  async editCaseBlockExit({commit, dispatch, getters, rootGetters}, {identifier, value}: {identifier: string; value: string}) {
    const activeBlock = rootGetters['flow/activeBlock']
    await dispatch('flow/block_updateBlockExitWith', {
      blockId: rootGetters['flow/activeBlock'].uuid,
      exitId: identifier,
      value,
    }, {root: true})
    if (getters.allExitsHaveTests) {
      const exit: IBlockExitTestRequired = await dispatch('flow/block_createBlockExitWith', {
        props: ({
          uuid: (new IdGeneratorUuidV4()).generate(),
          test: '', // todo: get started on a basic expression api
        }) as IBlockExitTestRequired,
      }, {root: true})
      commit('flow/block_pushNewExit', {blockId: activeBlock.uuid, newExit: exit}, {root: true})
    } else if (getters.twoExitsBlank) {
      commit('popFirstEmptyExit', {blockId: activeBlock.uuid})
    }
  },
  async createWith({dispatch}, {props}: {props: {uuid: string} & Partial<ICaseBlock>}) {
    const exits: IBlockExitTestRequired[] = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: (new IdGeneratorUuidV4()).generate(),
          test: '', // todo: get started on a basic expression api
        }) as IBlockExitTestRequired,
      }, {root: true}),
    ]

    return defaults(props, {
      type: BLOCK_TYPE,
      name: '',
      label: '',
      semanticLabel: '',
      exits,
    })
  },

}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
}
