import {ActionTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlock, IBlockExit} from '@floip/flow-runner'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {IOpenResponseBlock} from '@floip/flow-runner/src/model/block/IOpenResponseBlock'
import {cloneDeep} from 'lodash'
import BaseStore from '@/store/flow/block-types/BaseBlock'
import {IFlowsState} from '../index'

export const BLOCK_TYPE = 'MobilePrimitives.OpenResponse'

const baseActions = cloneDeep(BaseStore.actions)

const actions: ActionTree<IFlowsState, IRootState> = {
  async setMaxDurationSeconds({commit, rootGetters}, newDuration: number) {
    const activeBlock = rootGetters['builder/activeBlock']
    commit('flow/block_updateConfigByKey', {
      blockId: activeBlock.uuid,
      key: 'ivr',
      value: {
        max_duration_seconds: newDuration,
      },
    }, {root: true})
    return newDuration
  },

  async setMaxResponseCharacters({commit, rootGetters}, newLength: number) {
    const activeBlock = rootGetters['builder/activeBlock']
    const value = {
      max_response_characters: newLength,
    }
    commit('flow/block_updateConfigByKey', {
      blockId: activeBlock.uuid,
      key: 'text',
      value,
    }, {root: true})
    return value
  },

  async createWith({dispatch, commit}, {props}: { props: { uuid: string } & Partial<IOpenResponseBlock> }) {
    props.type = BLOCK_TYPE
    props.exits = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: await (new IdGeneratorUuidV4()).generate(),
        }) as IBlockExit,
      }, {root: true}),
    ]

    const blankResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {root: true})
    props.config = {
      prompt: blankResource.uuid,
    }

    //TODO - fix this
    // @ts-ignore - Not all constituents of type 'Action<IFlowsState, IRootState>' are callable.
    return baseActions.createWith({dispatch}, {props})
  },

  handleBranchingTypeChangedToUnified({dispatch}, {block}: { block: IBlock }) {
    dispatch('flow/block_convertExitFormationToUnified', {
      blockId: block.uuid,
      test: 'LEN(block.value) > 0',
    }, {root: true})
  },
}

const MobilePrimitives_OpenResponseBlockStore = cloneDeep(BaseStore)
MobilePrimitives_OpenResponseBlockStore.actions.setMaxDurationSeconds = actions.setMaxDurationSeconds
MobilePrimitives_OpenResponseBlockStore.actions.setMaxResponseCharacters = actions.setMaxResponseCharacters
MobilePrimitives_OpenResponseBlockStore.actions.createWith = actions.createWith
MobilePrimitives_OpenResponseBlockStore.actions.handleBranchingTypeChangedToUnified = actions.handleBranchingTypeChangedToUnified

export default MobilePrimitives_OpenResponseBlockStore
