import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlock, IBlockExit} from '@floip/flow-runner'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {IRunFlowBlock} from '@floip/flow-runner/src/model/block/IRunFlowBlock'
import {defaultsDeep, split} from 'lodash'
import {validateBlockWithJsonSchema} from '@/store/validation/validationHelpers'
import {IFlowsState} from '../index'

export const BLOCK_TYPE = 'ConsoleIO.Read'

export const getters: GetterTree<IFlowsState, IRootState> = {
  destinationVariablesFields: (state, _getters, _rootState, rootGetters): string[] => {
    const activeBlock = rootGetters['builder/activeBlock']
    // TODO: correct the destination variables array according to scanf library we're using, and think about consecutive % or other error we should avoid
    return new Array(split(activeBlock.config.format_string || '', '%').length - 1)
  },
}

export const mutations: MutationTree<IFlowsState> = {}

export const actions: ActionTree<IFlowsState, IRootState> = {
  async setFormatString({commit, rootGetters}, newFormatString: string) {
    const activeBlock = rootGetters['builder/activeBlock']
    const newConfig = {
      format_string: newFormatString,
    }
    commit('flow/block_updateConfigByKey', {
      blockId: activeBlock.uuid,
      key: 'format_string',
      value: newFormatString,
    }, {root: true})
    return newConfig
  },
  async editDestinationVariable({
    commit, rootGetters,
  }, {variableName, keyIndex}: { variableName: string, keyIndex: number }) {
    const activeBlock = rootGetters['builder/activeBlock']
    const newDestinationVariables = activeBlock.config.destination_variables || []
    newDestinationVariables[keyIndex] = variableName
    commit('flow/block_updateConfigByKey', {
      blockId: activeBlock.uuid,
      key: 'destination_variables',
      value: newDestinationVariables,
    }, {root: true})
    return newDestinationVariables
  },
  async createWith({dispatch}, {props}: { props: { uuid: string } & Partial<IRunFlowBlock> }) {
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
        format_string: '',
        destination_variables: [],
      },
      exits,
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
