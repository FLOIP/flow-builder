import {ISelectOneResponseBlock} from '@floip/flow-runner/dist/model/block/ISelectOneResponseBlock'
import {findBlockWith, IBlock, ISelectManyResponseBlock} from '@floip/flow-runner'
import {cloneDeep, isNumber} from 'lodash'
import {ActionContext, ActionTree, Module} from 'vuex'
import {IRootState} from '@/store'
import {IBlockWithBranchingType, OutputBranchingType} from '@/components/interaction-designer/block-editors/BlockOutputBranchingConfig.vue'
import {actions as baseActions, IEmptyState} from '@/store/flow/block-types/BaseBlock'
import MobilePrimitives_SelectOneResponseBlockStore from './MobilePrimitives_SelectOneResponseBlockStore'

export const BLOCK_TYPE = 'MobilePrimitives.SelectManyResponse'

const actions: ActionTree<IEmptyState, IRootState> = {
  ...baseActions,

  setMinChoices({commit, dispatch, rootGetters}, {blockId, value}: { blockId: IBlock['uuid'], value?: number }): void {
    const block: ISelectManyResponseBlock = findBlockWith(blockId, rootGetters['flow/activeFlow']) as ISelectManyResponseBlock
    commit('flow/block_updateConfigByKey', {
      blockId: block.uuid,
      key: 'minimum_choices',
      value: isNumber(value) ? value : undefined,
    }, {root: true})

    const {vendor_metadata: metadata} = block as unknown as IBlockWithBranchingType
    const {UNIFIED} = OutputBranchingType
    if (metadata.floip.ui_metadata.branching_type === UNIFIED) {
      dispatch('handleBranchingTypeChangedToUnified', {block})
    }
  },

  setMaxChoices({commit, dispatch, rootGetters}, {blockId, value}: { blockId: IBlock['uuid'], value: number }): void {
    const block: ISelectManyResponseBlock = findBlockWith(blockId, rootGetters['flow/activeFlow']) as ISelectManyResponseBlock
    commit('flow/block_updateConfigByKey', {
      blockId: block.uuid,
      key: 'maximum_choices',
      value: isNumber(value) ? value : undefined,
    }, {root: true})

    // todo: we should probably review our getters + setters in vue files and pull domain logic our stores ?! Schedule this?11
    const {vendor_metadata: metadata} = block as unknown as IBlockWithBranchingType
    const {UNIFIED} = OutputBranchingType
    if (metadata.floip.ui_metadata.branching_type === UNIFIED) {
      dispatch('handleBranchingTypeChangedToUnified', {block})
    }
  },

  handleBranchingTypeChangedToUnified({dispatch}, {block}: { block: ISelectManyResponseBlock }) {
    dispatch('flow/block_convertExitFormationToUnified', {
      blockId: block.uuid,
      test: formatTestValueForUnifiedBranchingType(block),
    }, {root: true})
  },

  async createWith({getters, dispatch}, {props}: { props: { uuid: string } & Partial<ISelectOneResponseBlock> }) {
    props.type = BLOCK_TYPE
    const blankPromptResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {root: true})
    props.config = {
      prompt: blankPromptResource.uuid,
      choices: {},
      minimum_choices: undefined,
      maximum_choices: undefined,
    }
    return baseActions.createWith({getters, dispatch} as ActionContext<IEmptyState, IRootState>, {props})
  },
}

function formatTestValueForUnifiedBranchingType(block: ISelectManyResponseBlock): string {
  const {choices, minimum_choices: min, maximum_choices: max} = block.config
  const choiceKeys = Object.keys(choices)

  if (choiceKeys.length === 0) {
    console.warn('Choices are empty for SelectManyBlock, providing `true` by default')
    return 'true'
  }

  const validMinCount = `COUNT(block.value) >= ${min}`
  const validMaxCount = `COUNT(block.value) <= ${max}`
  const validChoices = `OR(${choiceKeys.map((choice) =>
    `IN("${choice}", block.value)`).join(', ')})`

  if (isNumber(min) && isNumber(max)) {
    return `AND(${[validMinCount, validMaxCount, validChoices].join(', ')})`
  }

  if (isNumber(min)) {
    return `AND(${[validMinCount, validChoices].join(', ')})`
  }

  if (isNumber(max)) {
    return `AND(${[validMaxCount, validChoices].join(', ')})`
  }

  return validChoices
}

const MobilePrimitives_SelectManyResponseBlockStore: Module<IEmptyState, IRootState> = {
  ...cloneDeep(MobilePrimitives_SelectOneResponseBlockStore),
  actions,
}

export default MobilePrimitives_SelectManyResponseBlockStore
