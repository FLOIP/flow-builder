import {ActionContext, Dispatch, GetterTree, Module, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlock, IBlockExit} from '@floip/flow-runner'
import {defaultsDeep, last} from 'lodash'
import {validateBlockWithJsonSchema} from '@/store/validation/validationHelpers'
import {IValidationStatus} from '@/store/validation'

export interface IEmptyState {}

export const getters: GetterTree<IEmptyState, IRootState> = {}

export const mutations: MutationTree<IEmptyState> = {}

export const actions = {
  async createWith(
    {dispatch}: {dispatch: Dispatch},
    {props}: { props: { uuid: string } & Partial<IBlock> },
  ): Promise<IBlock> {
    return defaultsDeep(
      {},
      // Props from the block type createWith
      props, {
      // Default props if not provided yet
      type: '',
      name: '',
      label: '',
      semantic_label: '',
      config: {},
      exits: props?.exits ?? await dispatch('flow/block_generateExitsBasedOnUiConfig', {
        blockType: props.type,
        primaryExitTest: await dispatch('computePrimaryExitTestFunction'),
      }, {root: true}),
      tags: [],
      vendor_metadata: {
        floip: {
          ui_metadata: {
            branching_type: 'UNIFIED',
            should_auto_update_name: true,
          },
        },
      },
    }, {
      // Extra vendor_metadata from consumer side (eg: some configs under a new namespace)
      vendor_metadata: await dispatch('initiateExtraVendorConfig'),
    },
    )
  },

  /**
   * Compute the primary exit test.
   * We can override this from block type store, or from the consumer side. This has priority over test defined in builder.config.blockClasses
   * If we have undefined, then we try to use what we defined in builder.config.blockClasses
   */
  async computePrimaryExitTestFunction(_ctx: unknown): Promise<any> {
    return undefined
  },

  /**
   * This will be the default standard exit mode,
   * but we can override it in the specific block store (eg: for dynamic test generation in MCQ)
   */
  async handleBranchingTypeChangedToUnified(
    {dispatch, rootGetters}: {dispatch: Dispatch, rootGetters: any},
    {block}: {block: IBlock},
  ): Promise<void> {
    if (rootGetters['flow/block_shouldHave2Exits'](block.type) === true) {
      await dispatch('flow/block_resetBranchingExitsByCollapsingNonDefault', {
        blockId: block.uuid,
        primaryExitTest: await dispatch('computePrimaryExitTestFunction'),
      }, {root: true})
    } else {
      await dispatch('flow/block_resetBranchingExitsToDefaultOnly', {
        blockId: block.uuid,
      }, {root: true})
    }
  },

  /**
   * Override this method in the consumer side to add extra config attributes
   * to avoid the validation saying we have missing prop at the creation.
   *
   * Remember to namespace the fields, e.g.:
   *
   * return {
   *   org_example: {
   *     foo: 1,
   *     bar: 'baz',
   *   },
   * }
   */
  async initiateExtraVendorConfig(_ctx: unknown): Promise<object> {
    return {}
  },

  /**
   * Validate the Consumer block
   * By overriding this action in the consumer side, we will be able to customize it using different json schema for eg.
   *
   * Important: This will be overridden in the consumer side, so DO NOT add generic validations here,
   * instead edit the `validate()` if needed.
   */
  async validateBlockWithCustomJsonSchema(
    _ctx: unknown,
    {block, schemaVersion}: {block: IBlock, schemaVersion: string},
  ): Promise<IValidationStatus> {
    return validateBlockWithJsonSchema({block, schemaVersion})
  },

  //Will need to be fully overridden in block stores if needed (see MobilePrimitives_NumericResponseBlockStore.ts, for example)
  async validate(
    {dispatch}: ActionContext<IEmptyState, IRootState>,
    {block, schemaVersion}: {block: IBlock, schemaVersion: string},
  ): Promise<IValidationStatus> {
    return dispatch('validateBlockWithCustomJsonSchema', {block, schemaVersion})
  },
}

const BaseBlockStore: Module<IEmptyState, IRootState> = {
  namespaced: true,
  getters,
  mutations,
  actions,
}

export default BaseBlockStore
