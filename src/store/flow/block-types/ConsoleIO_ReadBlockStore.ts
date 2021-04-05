import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { IRootState } from '@/store'
import {
  IBlockExit,
} from '@floip/flow-runner'
import { IdGeneratorUuidV4 } from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import { IRunFlowBlock } from '@floip/flow-runner/src/model/block/IRunFlowBlock'
import { defaults, split } from 'lodash'
import { IFlowsState } from '../index'
import { sscanf } from 'scanf'

export const BLOCK_TYPE = 'ConsoleIO\\Read'

export const getters: GetterTree<IFlowsState, IRootState> = {
  destinationVariablesFields: (state, getters, rootState, rootGetters): string[] => {
    const activeBlock = rootGetters['builder/activeBlock']
    try {
      //We don't care what string we use to test the format string
      //...we just want to know how many scanf variables we will read.
      //When we would only read a single variable the library only gives back one value
      //...rather than an array so we have to force it into an array.
      const destinationVariables = sscanf('any string', activeBlock.config.format_string || '')
      return (typeof destinationVariables === 'object') ? destinationVariables : [destinationVariables]
    } catch (error) {
      return []
    }
  },
}

export const mutations: MutationTree<IFlowsState> = {}

export const actions: ActionTree<IFlowsState, IRootState> = {
  async setFormatString({ commit, rootGetters }, newFormatString: string) {
    const activeBlock = rootGetters['builder/activeBlock']
    const newConfig = {
      format_string: newFormatString,
    }
    commit('flow/block_updateConfigByKey', {
      blockId: activeBlock.uuid,
      key: 'format_string',
      value: newFormatString,
    }, { root: true })
    return newConfig
  },
  async editDestinationVariable({
    commit, dispatch, getters, rootGetters,
  }, { variableName, keyIndex }: {variableName: string; keyIndex: number}) {
    const activeBlock = rootGetters['builder/activeBlock']
    const newDestinationVariables = activeBlock.config.destination_variables || []
    newDestinationVariables[keyIndex] = variableName
    commit('flow/block_updateConfigByKey', {
      blockId: activeBlock.uuid,
      key: 'destination_variables',
      value: newDestinationVariables,
    }, { root: true })
    return newDestinationVariables
  },
  async createWith({ dispatch }, { props }: {props: {uuid: string} & Partial<IRunFlowBlock>}) {
    const exits: IBlockExit[] = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: (new IdGeneratorUuidV4()).generate(),
          tag: 'Default',
          label: 'Default',
        }) as IBlockExit,
      }, { root: true }),
    ]
    exits.push(
      await dispatch('flow/block_createBlockExitWith', {
        props: ({
          uuid: (new IdGeneratorUuidV4()).generate(),
          tag: 'Error',
          label: 'Error',
        }) as IBlockExit,
      }, { root: true }),
    )

    return defaults(props, {
      type: BLOCK_TYPE,
      name: '',
      label: '',
      semanticLabel: '',
      config: {
        format_string: '',
        destination_variables: [],
      },
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
