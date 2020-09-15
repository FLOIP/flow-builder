import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlock, IBlockExit, SupportedMode, SupportedContentType} from '@floip/flow-runner'
import IdGeneratorUuidV4 from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
// import IPhotoResponseBlock from '@floip/flow-runner/src/model/block/IPhotoResponseBlock' // TODO: to create at flow-runner
import {defaults} from 'lodash'
import {IFlowsState} from '../index'

export const BLOCK_TYPE = 'SmartDevices\\PhotoResponse'

export const getters: GetterTree<IFlowsState, IRootState> = {}

export const mutations: MutationTree<IFlowsState> = {}

export const actions: ActionTree<IFlowsState, IRootState> = {
  async createWith({rootGetters, dispatch, commit}, {props}: {props: {uuid: string} & Partial<IBlock>}) {
    const exits: IBlockExit[] = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: (new IdGeneratorUuidV4()).generate(),
          tag: 'Default',
          label: 'Default',
        }) as IBlockExit,
      }, {root: true}),
      await dispatch('flow/block_createBlockExitWith', {
        props: ({
          uuid: (new IdGeneratorUuidV4()).generate(),
          tag: 'Error',
          label: 'Error',
        }) as IBlockExit}, {root: true}),
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
