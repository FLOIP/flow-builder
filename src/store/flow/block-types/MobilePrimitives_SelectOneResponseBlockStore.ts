import {ActionTree, Module} from 'vuex'
import {IRootState} from '@/store'
import {findBlockWith, IBlock, IBlockExit, IResource, ValidationException} from '@floip/flow-runner'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {ISelectOneResponseBlock} from '@floip/flow-runner/dist/model/block/ISelectOneResponseBlock'
import Vue from 'vue'
import {cloneDeep, findKey, get, map, omit, snakeCase} from 'lodash'
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

    const choiceKey = String(findKey(block.config.choices, (v) => v === resourceId))
    // omit() will inadvertently but desirably remove an empty `choiceKey`
    block.config.choices = omit(block.config.choices, choiceKey)
    dispatch('addChoiceByResourceIdTo', {blockId, resourceId})
  },

  addChoiceByResourceIdTo({rootGetters}, {blockId, resourceId}: { blockId: IBlock['uuid'], resourceId: IResource['uuid'] }) {
    const block: ISelectOneResponseBlock = findBlockWith(blockId, rootGetters['flow/activeFlow']) as ISelectOneResponseBlock
    const resource: IResource = rootGetters['flow/resourcesByUuidOnActiveFlow'][resourceId]

    if (resource == null) {
      throw new ValidationException(`Unable to find resource for choice: ${resourceId}`)
    }

    // defaulted to `resourceId` to mitigate empty keys and associated error handling altogether
    const desiredChoiceKey = snakeCase(get(resource.values[0], 'value')) || resource.uuid
    const doesChoiceKeyAlreadyExist = desiredChoiceKey in block.config.choices
    // apply suffix as resourceId when duplicated to prevent overwriting as input is received
    const suffix = doesChoiceKeyAlreadyExist ? `-${resource.uuid}` : ''
    Vue.set(block.config.choices, `${desiredChoiceKey}${suffix}`, resource.uuid)
  },

  deleteChoiceByResourceIdFrom({rootGetters}, {blockId, resourceId}: { blockId: IBlock['uuid'], resourceId: IResource['uuid'] }) {
    const block: ISelectOneResponseBlock = findBlockWith(blockId, rootGetters['flow/activeFlow']) as ISelectOneResponseBlock
    const choiceKey = String(findKey(block.config.choices, (v) => v === resourceId))
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
      choices: {},
    }
    return baseActions.createWith({getters, dispatch}, {props})
  },

  handleBranchingTypeChangedToUnified({dispatch}, {block}: { block: IBlock }) {
    dispatch('flow/block_convertExitFormationToUnified', {
      blockId: block.uuid,
      test: formatTestValueForUnifiedBranchingType(block as ISelectOneResponseBlock),
    }, {root: true})
  },
}

function formatTestValueForUnifiedBranchingType(block: ISelectOneResponseBlock): string {
  const blockChoicesKey = Object.keys(block.config.choices)
  if (blockChoicesKey.length === 0) {
    console.warn('Choices are empty for SelectOneBlock, providing `true` by default')
    return 'true'
  }
  return `OR(${map(blockChoicesKey, (choice) => `block.value = "${choice}"`).join(',')})`
}

const MobilePrimitives_SelectOneResponseBlockStore: Module<IEmptyState, IRootState> = {
  ...cloneDeep(BaseStore),
  actions,
}

export default MobilePrimitives_SelectOneResponseBlockStore
