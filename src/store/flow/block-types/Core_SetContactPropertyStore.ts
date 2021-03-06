import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlockExit, ISetContactPropertyBlockConfig} from '@floip/flow-runner'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {defaultsDeep} from 'lodash'
import {IFlowsState} from '../index'

export interface IContactPropertyOption {
  id: string,
  name: string,
  displayLabel: string,
}

export const BLOCK_TYPE = 'Core.SetContactProperty'

export const getters: GetterTree<IFlowsState, IRootState> = {}

export const mutations: MutationTree<IFlowsState> = {}

export const actions: ActionTree<IFlowsState, IRootState> = {
  async createWith({dispatch}, {props}: { props: { uuid: string } & Partial<ISetContactPropertyBlockConfig> }) {
    const exits: IBlockExit[] = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: await (new IdGeneratorUuidV4()).generate(),
          tag: 'Default',
          label: 'Default',
        }),
      }, {root: true}) as IBlockExit,
    ]

    return defaultsDeep(props, {
      type: BLOCK_TYPE,
      name: '',
      label: '',
      semantic_label: '',
      config: {
        set_contact_property: {
          property_key: '',
          property_value: '',
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
