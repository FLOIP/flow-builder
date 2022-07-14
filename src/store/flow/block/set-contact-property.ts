import {IRootState} from '@/store'
import {findBlockOnActiveFlowWith as findBlock, IBlock, IContext, SetContactProperty} from '@floip/flow-runner'
import {ActionTree, MutationTree} from 'vuex'
import {IFlowsState} from '../index'

export interface ISetContactPropertyIndex {
  blockId: IBlock['uuid'],
  key: SetContactProperty['property_key'],
}

export interface ISetContactPropertyIndexWithValue extends ISetContactPropertyIndex {
  value: SetContactProperty['property_value'],
}

export const mutations: MutationTree<IFlowsState> = {
  block_addContactProperty(state, {blockId, key, value}: ISetContactPropertyIndexWithValue) {
    const block = findBlock(blockId, state as unknown as IContext)

    // Ensure the block has a set_contact_property[]
    if (!block.config.set_contact_property) {
      block.config.set_contact_property = []
    }

    // We should avoid duplicates
    if (block.config.set_contact_property.find(({property_key}) => property_key === key)) {
      throw new Error(`set_contact_property[${key}] already exists`)
    }

    block.config.set_contact_property = [
      {
        property_key: key,
        property_value: value,
      },
      ...block.config.set_contact_property ?? [],
    ]
  },

  block_removeContactProperty(state, {blockId, key}: ISetContactPropertyIndex) {
    const block = findBlock(blockId, state as unknown as IContext)

    block.config.set_contact_property = (block.config.set_contact_property ?? [])
      .filter(({property_key}) => property_key !== key)
  },

  block_changeContactProperty(state, {blockId, key, value: newValue}: ISetContactPropertyIndexWithValue) {
    const block = findBlock(blockId, state as unknown as IContext)

    block.config.set_contact_property = (block.config.set_contact_property ?? [])
      .map(({property_key, property_value: oldValue}) => ({
        property_key,
        property_value: property_key === key ? newValue : oldValue,
      }))
  },
}

export const actions: ActionTree<IFlowsState, IRootState> = {
  block_getContactPropertyByKey(state, {blockId, key}: ISetContactPropertyIndex) {
    return findBlock(blockId, state as unknown as IContext)
      .config
      .set_contact_property
      ?.find(({property_key}) => property_key === key)
      ?.property_value ?? undefined
  },

  block_setContactPropertyByKey({commit, dispatch}, {blockId, key, value}: ISetContactPropertyIndexWithValue) {
    if (dispatch('block_getContactPropertyByKey', {blockId, key}) === undefined) {
      commit('block_addContactProperty', {blockId, key, value})
    } else {
      commit('block_changeContactProperty', {blockId, key, value})
    }
  },

  block_deleteContactPropertyByKey({commit}, {blockId, key}: ISetContactPropertyIndex) {
    commit('block_removeContactProperty', {blockId, key})
  },
}
