import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlockExit, IBlockConfig, IBlock} from '@floip/flow-runner'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {defaultsDeep} from 'lodash'
import {validate_community_block} from '@/store/validation/validationHelpers'
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
  async createWith({dispatch}, {props}: { props: { uuid: string } & Partial<IBlockConfig> }) {
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
        set_contact_property: {
          property_key: '',
          property_value: '',
        },
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

  validate_block({rootGetters}, {block, schemaVersion}: {block: IBlock, schemaVersion: string}) {
    return validate_community_block({block, schemaVersion})
  },
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
}
