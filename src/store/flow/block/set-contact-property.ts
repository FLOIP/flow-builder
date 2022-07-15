import {IRootState} from '@/store'
import {findBlockOnActiveFlowWith as findBlock, IBlock, IContext, SetContactProperty} from '@floip/flow-runner'
import {ActionTree, MutationTree} from 'vuex'
import {IFlowsState} from '../index'

export interface ISetContactPropertyBlockKey {
  blockId: IBlock['uuid'],
  key: SetContactProperty['property_key'],
}

export interface ISetContactPropertyBlockKeyWithValue extends ISetContactPropertyBlockKey {
  value: SetContactProperty['property_value'],
}

export const mutations: MutationTree<IFlowsState> = {
  /**
   * Adds a new contact_property to a specific block.
   *
   * @throws {Error} When a property with given key already exists
   */
  block_addContactProperty(state, {blockId, key, value}: ISetContactPropertyBlockKeyWithValue) {
    const block = findBlock(blockId, state as unknown as IContext)

    if (!block.config.set_contact_property) {
      block.config.set_contact_property = []
    }

    if (block.config.set_contact_property.find(({property_key}) => property_key === key)) {
      throw new Error(`set_contact_property[${key}] already exists`)
    }

    block.config.set_contact_property = [
      // Prepending because we currently display the foremost property only
      // TODO VMO-6509 Push instead for better UX when we displayed all properties
      {
        property_key: key,
        property_value: value,
      },
      ...block.config.set_contact_property ?? [],
    ]
  },

  block_removeContactProperty(state, {blockId, key}: ISetContactPropertyBlockKey) {
    const block = findBlock(blockId, state as unknown as IContext)

    block.config.set_contact_property = (block.config.set_contact_property ?? [])
      .filter(({property_key}) => property_key !== key)
  },

  block_changeContactProperty(state, {blockId, key, value: newValue}: ISetContactPropertyBlockKeyWithValue) {
    const block = findBlock(blockId, state as unknown as IContext)

    block.config.set_contact_property = (block.config.set_contact_property ?? [])
      .map(({property_key, property_value: oldValue}) => ({
        property_key,
        property_value: property_key === key ? newValue : oldValue,
      }))
  },
}

export const actions: ActionTree<IFlowsState, IRootState> = {
  block_getContactPropertyByKey(state, {blockId, key}: ISetContactPropertyBlockKey): string | undefined {
    return findBlock(blockId, state as unknown as IContext)
      .config
      .set_contact_property
      ?.find(({property_key}) => property_key === key)
      ?.property_value
  },

  block_setContactPropertyByKey({commit, dispatch}, {blockId, key, value}: ISetContactPropertyBlockKeyWithValue): void {
    if (dispatch('block_getContactPropertyByKey', {blockId, key}) === undefined) {
      commit('block_addContactProperty', {blockId, key, value})
    } else {
      commit('block_changeContactProperty', {blockId, key, value})
    }
  },

  block_deleteContactPropertyByKey({commit}, {blockId, key}: ISetContactPropertyBlockKey): void {
    commit('block_removeContactProperty', {blockId, key})
  },
}
