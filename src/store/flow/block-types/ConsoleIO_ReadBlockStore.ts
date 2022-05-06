import {ActionTree, GetterTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlockExit} from '@floip/flow-runner'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {IRunFlowBlock} from '@floip/flow-runner/src/model/block/IRunFlowBlock'
import {cloneDeep, split} from 'lodash'
import BaseStore from '@/store/flow/block-types/BaseBlock'
import {IFlowsState} from '../index'

export const BLOCK_TYPE = 'ConsoleIO.Read'

const getters: GetterTree<IFlowsState, IRootState> = {
  destinationVariablesFields: (state, _getters, _rootState, rootGetters): string[] => {
    const activeBlock = rootGetters['builder/activeBlock']
    // TODO: correct the destination variables array according to scanf library we're using and think about consecutive % or other error we should avoid
    return new Array(split(activeBlock.config.format_string || '', '%').length - 1)
  },
}

const baseActions = cloneDeep(BaseStore.actions)

const actions: ActionTree<IFlowsState, IRootState> = {
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
    props.type = BLOCK_TYPE
    props.exits = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: await (new IdGeneratorUuidV4()).generate(),
        }) as IBlockExit,
      }, {root: true}),
    ]
    props.config = {
      format_string: '',
      destination_variables: [],
    }
    //TODO - fix this
    // @ts-ignore - Not all constituents of type 'Action<IFlowsState, IRootState>' are callable.
    return baseActions.createWith({dispatch}, {props})
  },
}

const ConsoleIO_ReadBlockStore = cloneDeep(BaseStore)

ConsoleIO_ReadBlockStore.getters.destinationVariablesFields = getters.destinationVariablesFields

ConsoleIO_ReadBlockStore.actions.setFormatString = actions.setFormatString
ConsoleIO_ReadBlockStore.actions.editDestinationVariable = actions.editDestinationVariable
ConsoleIO_ReadBlockStore.actions.createWith = actions.createWith

export default ConsoleIO_ReadBlockStore
