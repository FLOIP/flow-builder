import {getters as selectOneGetters, mutations as selectOneMutations, actions as selectOneActions} from './MobilePrimitives_SelectOneResponseBlockStore'

export const BLOCK_TYPE = 'MobilePrimitives\\SelectManyResponse'

export const getters = Object.assign({}, selectOneGetters)

export const mutations = Object.assign({}, selectOneMutations)

export const actions = Object.assign({}, selectOneActions)

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
}
