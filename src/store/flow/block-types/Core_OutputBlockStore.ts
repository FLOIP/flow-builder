import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlock, IBlockExit} from '@floip/flow-runner'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {IOutputBlock} from '@floip/flow-runner/src/model/block/IOutputBlock'
import {defaultsDeep} from 'lodash'
import {validateBlockWithJsonSchema} from '@/store/validation/validationHelpers'
import {IFlowsState} from '../index'

export const BLOCK_TYPE = 'Core.Output'

export const getters: GetterTree<IFlowsState, IRootState> = {}

export const mutations: MutationTree<IFlowsState> = {}

export const actions: ActionTree<IFlowsState, IRootState> = {
  async editOutputExpression({commit}, {blockId, value}: { blockId: string, value: string }): Promise<string> {
    commit('flow/block_updateConfig', {blockId, newConfig: {value}}, {root: true})
    return value
  },
  async createWith({dispatch}, {props}: { props: { uuid: string } & Partial<IOutputBlock> }) {
    const exits: IBlockExit[] = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: await (new IdGeneratorUuidV4()).generate(),
        }) as IBlockExit,
      }, {root: true}),
    ]

    return defaultsDeep(props, {
      type: BLOCK_TYPE,
      name: '',
      label: '',
      semantic_label: '',
      config: {
        value: null,
      },
      exits,
      tags: [],
      vendor_metadata: {},
    })
  },

  handleBranchingTypeChangedToUnified({dispatch}, {block}: {block: IBlock}) {
    dispatch('flow/block_convertExitFormationToUnified', {
      blockId: block.uuid,
      test: 'block.value > 0',
    }, {root: true})
  },

  validate({rootGetters}, {block, schemaVersion}: {block: IBlock, schemaVersion: string}) {
    return validateBlockWithJsonSchema({block, schemaVersion})
  },
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
}
