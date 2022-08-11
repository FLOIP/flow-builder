import {ActionContext, GetterTree, Module, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlock} from '@floip/flow-runner'
import {defaultsDeep} from 'lodash'
import {IValidationStatus} from '@/store/validation'
import {ExtendedValidatorBase} from '@/lib/validations'

export interface IEmptyState {}

export const getters: GetterTree<IEmptyState, IRootState> = {
  /**
   * Compute the primary exit test.
   * We can override this from block type store, or from the consumer side.
   *
   * We're sending the blockProps because we might need them for customization
   */
  primaryExitTest: () => (_blockProps: Partial<IBlock>) => undefined,
}

export const mutations: MutationTree<IEmptyState> = {}

export const actions = {
  async createWith(
    {getters, dispatch}: ActionContext<IEmptyState, IRootState>,
    {props}: { props: { uuid: string } & Partial<IBlock> },
  ): Promise<IBlock> {
    const mainProps = defaultsDeep(
      {},
      // Props from the block type createWith
      props, {
      // Default props if not provided yet
      type: '',
      name: '',
      label: '',
      semantic_label: '',
      config: {},
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

    // Define exits after we have the whole final props, this is important for dynamic test value
    if (props?.exits === undefined) {
      mainProps.exits = await dispatch('flow/block_generateExitsBasedOnUiConfig', {
        blockType: props.type,
        primaryExitTest: getters.primaryExitTest(mainProps),
      }, {root: true})
    }

    return mainProps
  },

  /**
   * This will be the default standard exit mode,
   * but we can override it in the specific block store (eg: for dynamic test generation in MCQ)
   */
  async handleBranchingTypeChangedToUnified(
    {dispatch, getters, rootGetters}: ActionContext<IEmptyState, IRootState>,
    {block}: {block: IBlock},
  ): Promise<void> {
    if (rootGetters['flow/block_shouldHave2Exits'](block.type) === true) {
      await dispatch('flow/block_resetBranchingExitsByCollapsingNonDefault', {
        blockId: block.uuid,
        primaryExitTest: getters.primaryExitTest(block),
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
  // async validateBlockWithCustomJsonSchema(
  //   _ctx: unknown,
  //   {block, schemaVersion, customBlockJsonSchema}: {block: IBlock, schemaVersion: string, customBlockJsonSchema?: JSONSchema7},
  // ): Promise<IValidationStatus> {
  //   console.debug('floip/validateBlockWithCustomJsonSchema()', `${block.type}`)
  //   return validateBlockWithJsonSchema({block, schemaVersion, customBlockJsonSchema})
  // },

  /**
   * Override this in block stores if needed (see MobilePrimitives_NumericResponseBlockStore.ts, for example)
   */
  async validate(
    {dispatch}: ActionContext<IEmptyState, IRootState>,
    {block, schemaVersion}: {block: IBlock, schemaVersion: string},
  ): Promise<IValidationStatus> {
    console.debug('floip/BaseBlock/validate()', `${block.type}`)
    // return dispatch('validateBlockWithCustomJsonSchema', {block, schemaVersion, customBlockJsonSchema})
    return ExtendedValidatorBase.runAllValidations(block, schemaVersion)
  },
}

const BaseBlockStore: Module<IEmptyState, IRootState> = {
  namespaced: true,
  getters,
  mutations,
  actions,
}

export default BaseBlockStore
