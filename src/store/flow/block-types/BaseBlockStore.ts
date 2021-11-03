import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlockExit, IBlockConfig, IBlock} from '@floip/flow-runner'
import {defaultsDeep} from 'lodash'
import {validateCommunityBlock} from '@/store/validation/validationHelpers'
import {IFlowsState} from '../index'

export const getters: GetterTree<IFlowsState, IRootState> = {}

export const mutations: MutationTree<IFlowsState> = {}

export const actions: ActionTree<IFlowsState, IRootState> = {
  async createWith({dispatch}, {props}: { props: { uuid: string } & Partial<IBlockConfig> }) {
    return defaultsDeep(props, {
      type: '',
      name: '',
      label: '',
      semantic_label: '',
      config: {
      },
      exits: [],
      tags: [],
      vendor_metadata: {},
    })
  },

  handleBranchingTypeChangedToUnified({dispatch}, {block}: {block: IBlock}) {
    dispatch('flow/block_convertExitFormationToUnified', {
      blockId: block.uuid,
      test: 'block.value = true',
    }, {root: true})
  },

  //Will need to be fully overridden in embedding apps
  validate({rootGetters}, {block, schemaVersion}: {block: IBlock, schemaVersion: string}) {
    return validateCommunityBlock({block, schemaVersion})
  },
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
}
