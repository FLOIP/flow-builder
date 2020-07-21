import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {
  SupportedContentType,
  SupportedMode,
  IBlockExit,
} from '@floip/flow-runner'
import IdGeneratorUuidV4 from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import ILogBlock from '@floip/flow-runner/src/model/block/ILogBlock'
import {defaults} from 'lodash'
import {IFlowsState} from '../index'

export const BLOCK_TYPE = 'Core\\Log'

export const getters: GetterTree<IFlowsState, IRootState> = {}

export const mutations: MutationTree<IFlowsState> = {
}
export const actions: ActionTree<IFlowsState, IRootState> = {

  async createWith({rootGetters, commit, dispatch}, {props}: {props: {uuid: string} & Partial<ILogBlock>}) {
    //TODO - figure out of there should only be one value here at first? How would the resource editor change this?
    //TODO - is this right for setup of languages?
    const values = rootGetters['flow/activeFlow'].languages.reduce((memo: object[], language: {id: string, name: string}) => {
      Object.values(SupportedMode).forEach((mode: string) => {
        memo.push({
          languageId: language.id,
          value: '',
          contentType: SupportedContentType.TEXT,
          modes: [
            mode
          ],
        })
      })
      return memo
    }, [])
    const blankLogResource = await dispatch('flow/resource_createWith', {
      props: {
        uuid: (new IdGeneratorUuidV4()).generate(),
        values: values,
      },
    }, {root: true})
    commit('flow/resource_add', {resource: blankLogResource}, {root: true})

    const exits: IBlockExit[] = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: (new IdGeneratorUuidV4()).generate(),
        }) as IBlockExit,
      }, {root: true}),
    ]

    return defaults(props, {
      type: BLOCK_TYPE,
      name: '',
      label: '',
      semanticLabel: '',
      exits,
      config: {
        message: blankLogResource.uuid,
      },
    })
  },

}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
}
