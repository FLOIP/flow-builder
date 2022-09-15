import {ISelectOneResponseBlock} from '@floip/flow-runner/dist/model/block/ISelectOneResponseBlock'
import {findBlockWith, IBlock, ISelectManyResponseBlock} from '@floip/flow-runner'
import {cloneDeep, isNumber} from 'lodash'
import {ActionContext, ActionTree, GetterTree, Module} from 'vuex'
import {IRootState} from '@/store'
import {IBlockWithBranchingType, OutputBranchingType} from '@/components/interaction-designer/block-editors/BlockOutputBranchingConfig.model'
import {actions as baseActions, getters as baseGetters, IEmptyState} from '@/store/flow/block-types/BaseBlock'
import MobilePrimitives_SelectOneResponseBlockStore from './MobilePrimitives_SelectOneResponseBlockStore'

export const BLOCK_TYPE = 'MobilePrimitives.SelectManyResponse'

export const getters: GetterTree<IEmptyState, IRootState> = {
  ...baseGetters,
  /**
   * TODO: customize selectMany's tests here in the future
   */
  primaryExitTest: () => (_blockProps: Partial<IBlock>) => undefined,
}

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

  async createWith({getters, dispatch}, {props}: { props: { uuid: string } & Partial<ISelectOneResponseBlock> }) {
    props.type = BLOCK_TYPE
    const blankPromptResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {root: true})
    props.config = {
      prompt: blankPromptResource.uuid,
      choices: [],
      minimum_choices: undefined,
      maximum_choices: undefined,
    }
    props.vendor_metadata = {
      floip: {
        ui_metadata: {
          branching_type: OutputBranchingType.EXIT_PER_CHOICE,
          choices: {},
        },
      },
    }
    return baseActions.createWith({getters, dispatch} as ActionContext<IEmptyState, IRootState>, {props})
  },
}

const MobilePrimitives_SelectManyResponseBlockStore: Module<IEmptyState, IRootState> = {
  ...cloneDeep(MobilePrimitives_SelectOneResponseBlockStore),
  actions,
  getters,
}

export default MobilePrimitives_SelectManyResponseBlockStore
