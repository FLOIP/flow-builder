import {ActionContext, ActionTree, Module} from 'vuex'
import {IRootState} from '@/store'
import {IChoice, findBlockWith, IBlock, IBlockExit, IResource, ValidationException, IResourceValue} from '@floip/flow-runner'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {ISelectOneResponseBlock} from '@floip/flow-runner/dist/model/block/ISelectOneResponseBlock'
import Vue from 'vue'
import {cloneDeep, find, reject} from 'lodash'
import BaseStore, {actions as baseActions, IEmptyState} from '@/store/flow/block-types/BaseBlock'
import {OutputBranchingType} from '@/components/interaction-designer/block-editors/BlockOutputBranchingConfig.vue'
import {choicesToExpression} from '@/components/interaction-designer/block-editors/choices/expressionTransformers'

export const BLOCK_TYPE = 'MobilePrimitives.SelectOneResponse'

const actions: ActionTree<IEmptyState, IRootState> = {
  ...baseActions,

  updateChoiceName(
    {rootGetters, dispatch},
    {blockId, resourceId, resourceValue}: {blockId: IBlock['uuid'], resourceId: IResource['uuid'], resourceValue: IResourceValue},
  ) {
    const block: ISelectOneResponseBlock = findBlockWith(blockId, rootGetters['flow/activeFlow']) as ISelectOneResponseBlock
    const resource: IResource = rootGetters['flow/resourcesByUuidOnActiveFlow'][resourceId]

    if (resource == null) {
      throw new ValidationException(`Unable to find resource for choice: ${resourceId}`)
    }

    // reactive way of editing choice.name
    block.config.choices = block.config.choices.map(choice =>
      (choice.prompt === resourceId
        ? ({...choice, name: resourceValue.value})
        : choice
      ))
  },

  addChoiceByResourceIdTo({rootGetters}, {blockId, resourceId}: { blockId: IBlock['uuid'], resourceId: IResource['uuid'] }) {
    const block: ISelectOneResponseBlock = findBlockWith(blockId, rootGetters['flow/activeFlow']) as ISelectOneResponseBlock
    const resource: IResource = rootGetters['flow/resourcesByUuidOnActiveFlow'][resourceId]

    if (resource == null) {
      throw new ValidationException(`Unable to find resource for choice: ${resourceId}`)
    }

    // Do not attribute the resource if it has been done already
    const existingChoiceByResource = find(block.config.choices, {prompt: resource.uuid})
    if (existingChoiceByResource === undefined) {
      const allChoices = block.config.choices
      allChoices.push({
        prompt: resource.uuid,
      } as IChoice)
    }
  },

  deleteChoiceByResourceIdFrom({rootGetters}, {blockId, resourceId}: { blockId: IBlock['uuid'], resourceId: IResource['uuid'] }) {
    const block: ISelectOneResponseBlock = findBlockWith(blockId, rootGetters['flow/activeFlow']) as ISelectOneResponseBlock
    const newChoices = reject(block.config.choices, v => v.prompt === resourceId)
    Vue.set(block.config, 'choices', newChoices)

    Vue.delete(block.vendor_metadata?.floip.ui_metadata.set_contact_property.property_value_mapping, resourceId)
    Vue.set(
      block.config.set_contact_property?.[0] ?? {},
      'property_value',
      choicesToExpression(block.vendor_metadata?.floip?.ui_metadata?.set_contact_property?.property_value_mapping),
    )
  },

  async reflowExitsFromChoices({dispatch, rootGetters}, {blockId}: { blockId: IBlock['uuid'] }) {
    const block: ISelectOneResponseBlock = findBlockWith(blockId, rootGetters['flow/activeFlow']) as ISelectOneResponseBlock
    const {config: {choices}, exits}: ISelectOneResponseBlock = block

    // non-default exits; default should always be last
    let exitsForChoices: IBlockExit[] = exits.slice(0, -1)

    // reflow exits based on choices
    await Promise.all(choices.map(async (choice, i) => {
      // create new exit if it doesn't exist yet
      if (exitsForChoices[i] == null) {
        const uuid = await (new IdGeneratorUuidV4()).generate()
        const exit = await dispatch('flow/block_createBlockExitWith', {props: {uuid} as IBlockExit}, {root: true})
        exitsForChoices.push(exit)
      }

      Object.assign(exitsForChoices[i], {
        name: choice.name,
        test: `@block.value = '${choice.name}'`,
      })
    }))

    // delete exits if not present in choices
    exitsForChoices = reject(exitsForChoices, exit => {
      const checkExist = find(choices, c => c.name === exit.name) === undefined

      if (checkExist === true) {
        console.debug('removing exit named', exit.name)
      }

      return checkExist
    })

    exits.splice(0, exits.length - 1, ...exitsForChoices)
  },

  async createWith({getters, dispatch}, {props}: { props: { uuid: string } & Partial<ISelectOneResponseBlock> }) {
    props.type = BLOCK_TYPE
    const blankPromptResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {root: true})
    props.config = {
      prompt: blankPromptResource.uuid,
      choices: [],
    }
    props.vendor_metadata = {
      floip: {
        ui_metadata: {
          branching_type: OutputBranchingType.EXIT_PER_CHOICE,
        },
      },
    }
    return baseActions.createWith({getters, dispatch} as ActionContext<IEmptyState, IRootState>, {props})
  },
}

const MobilePrimitives_SelectOneResponseBlockStore: Module<IEmptyState, IRootState> = {
  ...cloneDeep(BaseStore),
  actions,
}

export default MobilePrimitives_SelectOneResponseBlockStore
