import {ActionContext, Dispatch, GetterTree, Module, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlockConfig, IBlock, IBlockExit} from '@floip/flow-runner'
import {defaults} from 'lodash'
import {validateCommunityBlock} from '@/store/validation/validationHelpers'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {IValidationStatus} from '@/store/validation'

export type ActionHandlerTree<S, R> = {
  [key: string]: (injectee: ActionContext<S, R>, payload?: any) => void,
}

export interface IEmptyState {}

export const getters: GetterTree<IEmptyState, IRootState> = {}

export const mutations: MutationTree<IEmptyState> = {}

export const actions = {
  async createWith(
    {dispatch}: {dispatch: Dispatch},
    {props}: { props: { uuid: string } & Partial<IBlockConfig> },
  ): Promise<IBlock> {
    return defaults(props, {
      type: '',
      name: '',
      label: '',
      semantic_label: '',
      config: {},
      exits: [
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

  async handleBranchingTypeChangedToUnified(
    {dispatch}: {dispatch: Dispatch},
    {block}: {block: IBlock},
  ): Promise<void> {
    return dispatch('flow/block_convertExitFormationToUnified', {
      blockId: block.uuid,
      test: 'block.value = true',
    }, {root: true})
  },

  //Will need to be fully overridden in embedding apps
  validate(ctx: unknown, {block, schemaVersion}: {block: IBlock, schemaVersion: string}): IValidationStatus {
    return validateCommunityBlock({block, schemaVersion})
  },
}

const BaseBlockStore: Module<IEmptyState, IRootState> = {
  namespaced: true,
  getters,
  mutations,
  actions,
}

export default BaseBlockStore
