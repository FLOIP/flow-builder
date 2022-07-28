import {ActionContext, ActionTree, Module} from 'vuex'
import {IRootState} from '@/store'
import {Choice, findBlockWith, IBlock, IBlockExit, IResource, ValidationException} from '@floip/flow-runner'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {ISelectOneResponseBlock} from '@floip/flow-runner/dist/model/block/ISelectOneResponseBlock'
import Vue from 'vue'
import {cloneDeep, find, get, snakeCase} from 'lodash'
import BaseStore, {actions as baseActions, IEmptyState} from '@/store/flow/block-types/BaseBlock'

export const BLOCK_TYPE = 'MobilePrimitives.SelectOneResponse'

const actions: ActionTree<IEmptyState, IRootState> = {
  ...baseActions,

  rewriteChoiceKeyFor({rootGetters, dispatch}, {resourceId, blockId}: { resourceId: IResource['uuid'], blockId: IBlock['uuid'] }) {
    const block: ISelectOneResponseBlock = findBlockWith(blockId, rootGetters['flow/activeFlow']) as ISelectOneResponseBlock
    const resource: IResource = rootGetters['flow/resourcesByUuidOnActiveFlow'][resourceId]

    if (resource == null) {
      throw new ValidationException(`Unable to find resource for choice: ${resourceId}`)
    }

    const choiceKey = String(find(block.config.choices, (v) => v.prompt === resourceId))
    Vue.delete(block.config.choices, choiceKey)
    dispatch('addChoiceByResourceIdTo', {blockId, resourceId})
  },

  addChoiceByResourceIdTo({rootGetters}, {blockId, resourceId}: { blockId: IBlock['uuid'], resourceId: IResource['uuid'] }) {
    const block: ISelectOneResponseBlock = findBlockWith(blockId, rootGetters['flow/activeFlow']) as ISelectOneResponseBlock
    const resource: IResource = rootGetters['flow/resourcesByUuidOnActiveFlow'][resourceId]

    if (resource == null) {
      throw new ValidationException(`Unable to find resource for choice: ${resourceId}`)
    }

    // TODO: think about the previous implementation and assess if we need to check duplicates
    // defaulted to `resourceId` to mitigate empty keys and associated error handling altogether
    // const desiredChoiceKey = snakeCase(get(resource.values[0], 'value')) || resource.uuid
    // const doesChoiceKeyAlreadyExist = desiredChoiceKey in block.config.choices
    // // apply suffix as resourceId when duplicated to prevent overwriting as input is received
    // const suffix = doesChoiceKeyAlreadyExist ? `-${resource.uuid}` : ''
    const allChoices = block.config.choices
    allChoices.push({
      prompt: resource.uuid,
    } as Choice)
    Vue.set(block.config, 'choices', allChoices)
  },

  deleteChoiceByResourceIdFrom({rootGetters}, {blockId, resourceId}: { blockId: IBlock['uuid'], resourceId: IResource['uuid'] }) {
    const block: ISelectOneResponseBlock = findBlockWith(blockId, rootGetters['flow/activeFlow']) as ISelectOneResponseBlock
    const choiceKey = String(find(block.config.choices, (v) => v.prompt === resourceId))
    Vue.delete(block.config.choices, choiceKey)
  },

  async reflowExitsFromChoices({dispatch, rootGetters}, {blockId}: { blockId: IBlock['uuid'] }) {
    const block: ISelectOneResponseBlock = findBlockWith(blockId, rootGetters['flow/activeFlow']) as ISelectOneResponseBlock
    const {config: {choices}, exits}: ISelectOneResponseBlock = block
    const choiceKeys = Object.keys(choices)
    // non-default exits; default should always be last
    const exitsForChoices: IBlockExit[] = exits.slice(0, -1)

    // reflow exits based on choices
    await Promise.all(choiceKeys.map(async (choiceKey, i) => {
      if (exitsForChoices[i] == null) {
        const uuid = await (new IdGeneratorUuidV4()).generate()
        const exit = await dispatch('flow/block_createBlockExitWith', {props: {uuid} as IBlockExit}, {root: true})
        exitsForChoices.push(exit)
      }

      Object.assign(exitsForChoices[i], {
        name: choiceKey,
        test: `block.value = "${choiceKey}"`,
      })
    }))

    exits.splice(0, exits.length - 1, ...exitsForChoices)
  },

  async createWith({getters, dispatch}, {props}: { props: { uuid: string } & Partial<ISelectOneResponseBlock> }) {
    props.type = BLOCK_TYPE
    const blankPromptResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {root: true})
    props.config = {
      prompt: blankPromptResource.uuid,
      choices: [],
    }
    return baseActions.createWith({getters, dispatch} as ActionContext<IEmptyState, IRootState>, {props})
  },
}

const MobilePrimitives_SelectOneResponseBlockStore: Module<IEmptyState, IRootState> = {
  ...cloneDeep(BaseStore),
  actions,
}

export default MobilePrimitives_SelectOneResponseBlockStore
