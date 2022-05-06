import {ISelectOneResponseBlock} from '@floip/flow-runner/dist/model/block/ISelectOneResponseBlock'
import {findBlockWith, IBlock, IBlockExit, ISelectManyResponseBlock} from '@floip/flow-runner'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {cloneDeep, isNumber} from 'lodash'
import {ActionTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlockWithBranchingType, OutputBranchingType} from '@/components/interaction-designer/block-editors/BlockOutputBranchingConfig.vue'
import BaseStore from '@/store/flow/block-types/BaseBlock'
import MobilePrimitives_SelectOneResponseBlockStore, {
  ICustomFlowState,
  stateFactory,
} from './MobilePrimitives_SelectOneResponseBlockStore'

export const BLOCK_TYPE = 'MobilePrimitives.SelectManyResponse'

const baseActions = cloneDeep(BaseStore.actions)

const actions: ActionTree<ICustomFlowState, IRootState> = {
  setMinChoices({commit, dispatch, rootGetters}, {blockId, value}: { blockId: IBlock['uuid'], value?: number }): void {
    const block: ISelectManyResponseBlock = findBlockWith(blockId, rootGetters['flow/activeFlow']) as ISelectManyResponseBlock
    commit('flow/block_updateConfigByKey', {
      blockId: block.uuid,
      key: 'minimum_choices',
      value: isNumber(value) ? value : undefined,
    }, {root: true})

    const {vendor_metadata: metadata} = block as unknown as IBlockWithBranchingType
    const {UNIFIED} = OutputBranchingType
    if (metadata.io_viamo.branchingType === UNIFIED) {
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
    if (metadata.io_viamo.branchingType === UNIFIED) {
      dispatch('handleBranchingTypeChangedToUnified', {block})
    }
  },

  handleBranchingTypeChangedToUnified({dispatch}, {block}: { block: ISelectManyResponseBlock }) {
    dispatch('flow/block_convertExitFormationToUnified', {
      blockId: block.uuid,
      test: formatTestValueForUnifiedBranchingType(block),
    }, {root: true})
  },

  async createWith({dispatch}, {props}: { props: { uuid: string } & Partial<ISelectOneResponseBlock> }) {
    props.type = BLOCK_TYPE
    props.exits = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: await (new IdGeneratorUuidV4()).generate(),
        }) as IBlockExit,
      }, {root: true}),
    ]

    const blankPromptResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {root: true})
    props.config = {
      prompt: blankPromptResource.uuid,
      choices: {},
      minimum_choices: undefined,
      maximum_choices: undefined,
    }
    //TODO - fix this
    // @ts-ignore - Not all constituents of type 'Action<IFlowsState, IRootState>' are callable.
    return baseActions.createWith({dispatch}, {props})
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

const MobilePrimitives_SelectManyResponseBlockStore = cloneDeep(MobilePrimitives_SelectOneResponseBlockStore)

MobilePrimitives_SelectManyResponseBlockStore.actions.setMinChoices = actions.setMinChoices
MobilePrimitives_SelectManyResponseBlockStore.actions.setMaxChoices = actions.setMaxChoices
MobilePrimitives_SelectManyResponseBlockStore.actions.handleBranchingTypeChangedToUnified = actions.handleBranchingTypeChangedToUnified
MobilePrimitives_SelectManyResponseBlockStore.actions.createWith = actions.createWith

MobilePrimitives_SelectManyResponseBlockStore.state = stateFactory

export default MobilePrimitives_SelectManyResponseBlockStore
