import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { IRootState } from '@/store'
import {
  IBlock,
  IBlockExitTestRequired,
  IBlockExit,
  IResource, ValidationException,
} from '@floip/flow-runner'
import { IdGeneratorUuidV4 } from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import { ISelectOneResponseBlock } from '@floip/flow-runner/dist/model/block/ISelectOneResponseBlock'
import Vue from 'vue'
import {defaultsDeep, filter, find, findKey, first, get, isEmpty, omit, snakeCase} from 'lodash'
import {IFlowsState} from '../index'

export const BLOCK_TYPE = 'MobilePrimitives.SelectOneResponse'

export interface ICustomFlowState extends Partial<IFlowsState> {}

export const stateFactory = (): ICustomFlowState => ({})

export const getters: GetterTree<ICustomFlowState, IRootState> = {}

export const mutations: MutationTree<ICustomFlowState> = {}

export const actions: ActionTree<ICustomFlowState, IRootState> = {
  rewriteChoiceKeyFor({rootGetters, dispatch}, {resourceId, blockId}: {resourceId: IResource['uuid'], blockId: IBlock['uuid']}) {
    const block: ISelectOneResponseBlock = rootGetters['builder/blocksById'][blockId]
    if (block == null) {
      throw new ValidationException(`Unable to find block: ${blockId}`)
    }

    const resource: IResource = rootGetters['flow/resourcesByUuid'][resourceId]
    if (resource == null) {
      throw new ValidationException(`Unable to find resource for choice: ${resourceId}`)
    }

    const choiceKey = String(findKey(resourceId))
    // omit() will inadvertently but desirably remove an empty `choiceKey`
    block.config.choices = omit(block.config.choices, choiceKey)
    dispatch('addChoiceByResourceIdTo', {blockId, resourceId})
  },

  addChoiceByResourceIdTo({rootGetters}, {blockId, resourceId}: {blockId: IBlock['uuid'], resourceId: IResource['uuid']}) {
    const block: ISelectOneResponseBlock = rootGetters['builder/blocksById'][blockId]
    if (block == null) {
      throw new ValidationException(`Unable to find block: ${blockId}`)
    }

    const resource: IResource = rootGetters['flow/resourcesByUuid'][resourceId]
    if (resource == null) {
      throw new ValidationException(`Unable to find resource for choice: ${resourceId}`)
    }

    // defaulted to `resourceId` to mitigate empty keys and associated error handling altogether
    const desiredChoiceKey = snakeCase(get(resource.values[0], 'value')) || resource.uuid
    Vue.set(block.config.choices, desiredChoiceKey, resource.uuid)
  },

  deleteChoiceByResourceIdFrom({rootGetters}, {blockId, resourceId}: {blockId: IBlock['uuid'], resourceId: IResource['uuid']}) {
    const block: ISelectOneResponseBlock = rootGetters['builder/blocksById'][blockId]
    if (block == null) {
      throw new ValidationException(`Unable to find block: ${blockId}`)
    }

    const choiceKey = String(findKey(block.config.choices, resourceId))
    Vue.delete(block.config.choices, choiceKey)
  },

  async reflowExitsFromChoices({dispatch, rootGetters}, {blockId}: {blockId: IBlock['uuid']}) {
    const block: ISelectOneResponseBlock = rootGetters['builder/blocksById'][blockId]
    if (block == null) {
      throw new ValidationException(`Unable to find block: ${blockId}`)
    }

    const {config: {choices}, exits}: ISelectOneResponseBlock = block
    const choiceKeys = Object.keys(choices)
    const exitsForChoices: IBlockExitTestRequired[] = exits.slice(0, -1) // non-default exits; default should always be last

    // reflow exits based on choices
    await Promise.all(choiceKeys.map(async (choiceKey, i) => {
      if (exitsForChoices[i] == null) {
        const uuid = await (new IdGeneratorUuidV4()).generate()
        const exit = await dispatch('flow/block_createBlockExitWith', {props: {uuid} as IBlockExit}, {root: true})
        exitsForChoices.push(exit)
      }

      Object.assign(exitsForChoices[i], {
        name: choiceKey,
        test: `block.value = ${i}`,
      })
    }))

    exits.splice(0, exits.length - 1, ...exitsForChoices)
  },

  async createWith({dispatch}, {props}: { props: { uuid: string } & Partial<ISelectOneResponseBlock> }) {
    const blankPromptResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {root: true})
    const defaultExitProps: Partial<IBlockExit> = {
      uuid: await (new IdGeneratorUuidV4()).generate(),
      name: 'Default',
      default: true,
      // test: '',
    }

    const defaultExit = await dispatch('flow/block_createBlockDefaultExitWith', {props: defaultExitProps}, {root: true})

    return defaultsDeep(props, {
      type: BLOCK_TYPE,
      name: '',
      label: '',
      semantic_label: '',
      config: {
        prompt: blankPromptResource.uuid,
        choices: {},
      },
      exits: [defaultExit],
    })
  },
}

export default {
  namespaced: true,
  state: stateFactory,
  getters,
  mutations,
  actions,
}
