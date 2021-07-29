import {ISelectOneResponseBlock} from '@floip/flow-runner/dist/model/block/ISelectOneResponseBlock'
import {findBlockWith, IBlock, IBlockExit, IResource, ISelectManyResponseBlock, ValidationException} from '@floip/flow-runner'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {defaultsDeep, findKey, isNumber, omit} from 'lodash'
import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {
  actions as selectOneActions,
  getters as selectOneGetters,
  ICustomFlowState,
  mutations as selectOneMutations,
  stateFactory,
} from './MobilePrimitives_SelectOneResponseBlockStore'

export const BLOCK_TYPE = 'MobilePrimitives.SelectManyResponse'

export const getters: GetterTree<ICustomFlowState, IRootState> = {
  ...selectOneGetters,
}

export const mutations: MutationTree<ICustomFlowState> = {
  ...selectOneMutations,
}

export const actions: ActionTree<ICustomFlowState, IRootState> = {
  ...selectOneActions,

  setMinChoices({commit, rootGetters}, {blockId, value}: {blockId: IBlock['uuid'], value?: number}): void {
    const block: ISelectManyResponseBlock = findBlockWith(blockId, rootGetters['flow/activeFlow']) as ISelectManyResponseBlock
    commit('flow/block_updateConfigByKey', {
      blockId: block.uuid,
      key: 'minimum_choices',
      value: isNumber(value) ? value : undefined,
    }, {root: true})
  },

  setMaxChoices({commit, rootGetters}, {blockId, value}: {blockId: IBlock['uuid'], value: number}): void {
    const block: ISelectManyResponseBlock = findBlockWith(blockId, rootGetters['flow/activeFlow']) as ISelectManyResponseBlock
    commit('flow/block_updateConfigByKey', {
      blockId: block.uuid,
      key: 'maximum_choices',
      value: isNumber(value) ? value : undefined,
    }, {root: true})
  },

  handleBranchingTypeChangedToUnified({dispatch}, {block}: {block: ISelectManyResponseBlock}) {
    dispatch('flow/block_convertExitFormationToUnified', {
      blockId: block.uuid,
      test: formatTestValueForUnifiedBranchingType(block),
    }, {root: true})
  },

  async createWith({dispatch}, {props}: { props: { uuid: string } & Partial<ISelectOneResponseBlock> }) {
    const blankPromptResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {root: true})
    const exits: IBlockExit[] = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: await (new IdGeneratorUuidV4()).generate(),
        }) as IBlockExit,
      }, {root: true}),
    ]

    return defaultsDeep(props, {
      type: BLOCK_TYPE,
      name: '',
      label: '',
      semantic_label: '',
      exits,
      config: {
        prompt: blankPromptResource.uuid,
        choices: {},
        minimum_choices: undefined,
        maximum_choices: undefined,
      },
      vendor_metadata: {},
      tags: [],
    })
  },
}

function formatTestValueForUnifiedBranchingType(block: ISelectManyResponseBlock): string {
  const {choices, minimum_choices: max, maximum_choices: min} = block.config
  const choiceKeys = Object.keys(choices)

  if (choiceKeys.length === 0) {
    console.warn('Choices are empty for SelectManyBlock, providing `true` by default')
    return 'true'
  }

  const validMinCount = `COUNT(block.value) >= ${min}`
  const validMaxCount = `COUNT(block.value) <= ${max}`
  const validChoices = `OR(${choiceKeys.map((choice) =>
    `IN('${choice}', block.value)`).join(', ')})`

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

export default {
  namespaced: true,
  state: stateFactory,
  getters,
  mutations,
  actions,
}
