import {ActionContext, Dispatch, GetterTree, Module, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlockConfig, IBlock, IBlockExit} from '@floip/flow-runner'
import {defaults} from 'lodash'
import {validateBlockWithJsonSchema} from '@/store/validation/validationHelpers'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {IValidationStatus} from '@/store/validation'

export interface IEmptyState {}

export const getters: GetterTree<IEmptyState, IRootState> = {}

export const mutations: MutationTree<IEmptyState> = {}

export const actions = {
  async createWith(
    {dispatch}: {dispatch: Dispatch},
    {props}: { props: { uuid: string } & Partial<IBlock> },
  ): Promise<IBlock> {
    return defaults({
      config: {
        ...props?.config,
        ...await dispatch('initiateExtraVendorConfig'),
      },
    }, props, {
      type: '',
      name: '',
      label: '',
      semantic_label: '',
      exits: props?.exits ?? [
        await dispatch('flow/block_createBlockDefaultExitWith', {
          props: ({
            uuid: await (new IdGeneratorUuidV4()).generate(),
          }) as IBlockExit,
        }, {root: true}),
      ],
      tags: [],
      vendor_metadata: {},
    })
  },

  /**
   * This will be the default standard exit mode, but we can override it in the specific block store
   */
  async handleBranchingTypeChangedToUnified(
    {dispatch}: {dispatch: Dispatch},
    {block}: {block: IBlock},
  ): Promise<void> {
    return dispatch('flow/block_resetBranchingExitsByCollapsingNonDefault', {
      blockId: block.uuid,
      test: 'block.value = true',
      name: 'Valid',
    }, {root: true})
  },

  /**
   * Override this in the consumer side to add extra config props to avoid the validation saying we have missing prop at the creation
   * eg: {
   *   prop1: undefined,
   *   prop2: undefined,
   * }
   */
  async initiateExtraVendorConfig(_ctx: unknown): Promise<object> {
    return {}
  },

  /**
   * Validate the vendor block (Consumer block)
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
