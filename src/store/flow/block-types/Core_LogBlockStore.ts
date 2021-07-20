import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlockExit} from '@floip/flow-runner'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {ILogBlock} from '@floip/flow-runner/src/model/block/ILogBlock'
import {defaultsDeep} from 'lodash'
import {IFlowsState} from '../index'

export const BLOCK_TYPE = 'Core.Log'

export const getters: GetterTree<IFlowsState, IRootState> = {}

export const mutations: MutationTree<IFlowsState> = {}
export const actions: ActionTree<IFlowsState, IRootState> = {

  async createWith({dispatch}, {props}: { props: { uuid: string } & Partial<ILogBlock> }) {
    // todo: do we need to generate this resource here? and do we need overrides??
    //       (check the other block types as well; I thought the idea was to generate them
    //       in-flight)

    const blankLogResource = await dispatch('flow/flow_addBlankResource', null, {root: true})

    const exits: IBlockExit[] = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: await (new IdGeneratorUuidV4()).generate(),
          tag: 'Default',
          label: 'Default',
        }) as IBlockExit,
      }, {root: true}),
    ]

    return defaultsDeep(props, {
      type: BLOCK_TYPE,
      name: '',
      label: '',
      semantic_label: '',
      exits,
      config: {
        message: blankLogResource.uuid,
      },
      tags: [],
    })
  },

}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
}
