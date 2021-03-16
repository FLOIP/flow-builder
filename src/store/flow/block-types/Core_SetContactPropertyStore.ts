import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {
  IBlockExit,
  ISetContactPropertyBlockConfig
} from '@floip/flow-runner'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {defaults} from 'lodash'
import {IFlowsState} from '../index'

export const BLOCK_TYPE = 'Core\\SetContactProperty'

export const getters: GetterTree<IFlowsState, IRootState> = {}

export const mutations: MutationTree<IFlowsState> = {}

export const actions: ActionTree<IFlowsState, IRootState> = {
  async editSetContactPropertyExpression({commit}, {blockId, value}: { blockId: string; value: string }): Promise<string> {
    commit('flow/block_updateConfigByPath', {
      blockId: blockId,
      path: 'set_contact_property.property_value',
      value
    }, {root: true})

    return value
  },
  async createWith({dispatch}, {props}: { props: { uuid: string } & Partial<ISetContactPropertyBlockConfig> }) {
    const exits: IBlockExit[] = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: (new IdGeneratorUuidV4()).generate(),
          tag: 'Default',
          label: 'Default',
        }) as IBlockExit,
      }, {root: true}),
    ]

    return defaults(props, {
      type: BLOCK_TYPE,
      name: '',
      label: '',
      semanticLabel: '',
      config: {
        set_contact_property: {
          property_key: '',
          property_value: ''
        },
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
