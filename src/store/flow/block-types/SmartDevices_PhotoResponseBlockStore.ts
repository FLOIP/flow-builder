import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { IRootState } from '@/store'
import {
  IBlock, IBlockExit, SupportedMode, SupportedContentType,
} from '@floip/flow-runner'
import { IdGeneratorUuidV4 } from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
// import IPhotoResponseBlock from '@floip/flow-runner/src/model/block/IPhotoResponseBlock' // TODO: to create at flow-runner
import { defaultsDeep } from 'lodash'
import { IFlowsState } from '../index'
import { IBlockClassConfig } from '@/store/flow/block'

export const BLOCK_CLASS_CONFIG: IBlockClassConfig = {
  name: 'SmartDevices.PhotoResponse',
  type: 'SmartDevices.PhotoResponse',
  is_interactive: true,
  is_branching: false,
  category:  1
}

export const getters: GetterTree<IFlowsState, IRootState> = {}

export const mutations: MutationTree<IFlowsState> = {}

export const actions: ActionTree<IFlowsState, IRootState> = {
  async createWith({ rootGetters, dispatch, commit }, { props }: {props: {uuid: string} & Partial<IBlock>}) {
    const exits: IBlockExit[] = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: await (new IdGeneratorUuidV4()).generate(),
          tag: 'Default',
          label: 'Default',
        }) as IBlockExit,
      }, { root: true }),
      await dispatch('flow/block_createBlockExitWith', {
        props: ({
          uuid: await (new IdGeneratorUuidV4()).generate(),
          tag: 'Error',
          label: 'Error',
        }) as IBlockExit,
      }, { root: true }),
    ]

    return defaultsDeep(props, {
      type: BLOCK_CLASS_CONFIG.type,
      name: '',
      label: '',
      semantic_label: '',
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
