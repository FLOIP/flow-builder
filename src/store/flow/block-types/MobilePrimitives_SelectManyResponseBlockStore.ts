import {ISelectOneResponseBlock} from '@floip/flow-runner/dist/model/block/ISelectOneResponseBlock'
import {IBlockExit} from '@floip/flow-runner'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {defaultsDeep} from 'lodash'
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

  async createWith({dispatch}, {props}: { props: { uuid: string } & Partial<ISelectOneResponseBlock> }) {
    const blankPromptResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {root: true})
    const defaultExitProps: Partial<IBlockExit> = {
      uuid: await (new IdGeneratorUuidV4()).generate(),
      name: 'Default',
      default: true,
      // test: '',
    }

    const defaultExit = await dispatch('flow/block_createBlockDefaultExitWith', { props: defaultExitProps }, { root: true })

    return defaultsDeep(props, {
      type: BLOCK_TYPE,
      name: '',
      label: '',
      semantic_label: '',
      exits: [
        defaultExit,
      ],
      config: {
        prompt: blankPromptResource.uuid,
        choices: {},
      },
      vendor_metadata: {},
    })
  },
}

export default {
  namespaced: true,
  state: stateFactory,
  getters,
  mutations,
  actions,
}
