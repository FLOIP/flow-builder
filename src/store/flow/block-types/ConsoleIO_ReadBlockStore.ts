import {ActionTree, GetterTree, Module} from 'vuex'
import {IRootState} from '@/store'
import {IReadBlock} from '@floip/flow-runner'
import {cloneDeep, split} from 'lodash'
import BaseStore, {actions as baseActions, IEmptyState} from '@/store/flow/block-types/BaseBlock'

export const BLOCK_TYPE = 'ConsoleIO.Read'

const getters: GetterTree<IEmptyState, IRootState> = {
  destinationVariablesFields: (state, _getters, _rootState, rootGetters): string[] => {
    const activeBlock = rootGetters['builder/activeBlock']
    // TODO: correct the destination variables array according to scanf library we're using
    //   and think about consecutive % or other error we should avoid
    return new Array(split(activeBlock.config.format_string || '', '%').length - 1)
  },
}

const actions: ActionTree<IEmptyState, IRootState> = {
  ...baseActions,

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

  async createWith({getters, dispatch}, {props}: { props: { uuid: string } & Partial<IReadBlock> }) {
    props.type = BLOCK_TYPE
    props.config = {
      format_string: '',
      destination_variables: [],
    }
    return baseActions.createWith({getters, dispatch}, {props})
  },
}

const ConsoleIO_ReadBlockStore: Module<IEmptyState, IRootState> = {
  ...cloneDeep(BaseStore),
  getters,
  actions,
}

export default ConsoleIO_ReadBlockStore
