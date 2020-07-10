import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IFlowsState} from '../index'
import {IRootState} from '@/store'
import {
  IBlockExitTestRequired,
  IFlow,
  IContext,
  SupportedContentType,
  findBlockOnActiveFlowWith,
} from '@floip/flow-runner'
import IdGeneratorUuidV4 from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import ISelectOneResponseBlock from '@floip/flow-runner/dist/model/block/ISelectOneResponseBlock'
import {IResourceDefinitionVariantOverModesFilter} from '../resource'
import Vue from 'vue'
import { defaults } from 'lodash'

export const BLOCK_TYPE = 'MobilePrimitives\\SelectOneResponse'

export const getters: GetterTree<IFlowsState, IRootState> = {}

export const mutations: MutationTree<IFlowsState> = {
  setChoiceResource(state, {blockId, key, resourceId}) {
    // const flow = get(this, 'getters.flow/activeFlow')
    // const flow2 = this.getters['flow/activeFlow']
    //
    // console.log(
    //     'We can access root getters and state via this (aka $store)',
    //     {flow, flow2})
  },

  renameChoiceKey(state, {blockId, key, desiredKey}) {
    const block: ISelectOneResponseBlock = findBlockOnActiveFlowWith(
        blockId,
        (this.state as unknown as {flow: IContext}).flow as unknown as IContext
    ) as ISelectOneResponseBlock

    if (key === desiredKey) { // this would end up deleting the resource ref below
      return // bail
    }

    // todo: handle case where resourceId is `resource.values[0].value` and not an actual resourceId
    Vue.set(block.config.choices, desiredKey, block.config.choices[key])
    delete block.config.choices[key]
  },
}

export const actions: ActionTree<IFlowsState, IRootState> = {

  // todo: in the flow-spec, there's mention that we can configure to swap between exit-per-choice and a default exit
  //       but, it doesn't seem to mention how this is configured
  async createWith({state, commit, dispatch}, {props}: {props: {uuid: string} & Partial<ISelectOneResponseBlock>}) {
    const {uuid: prompt} = await dispatch('flow/flow_addBlankResource', null, {root: true})

    const sampleChoiceResource = await dispatch('flow/resource_createWith', {
      props: {uuid: (new IdGeneratorUuidV4).generate()}}, {root: true})
    commit('flow/resource_add', {resource: sampleChoiceResource}, {root: true})

    const exits: IBlockExitTestRequired[] = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: (new IdGeneratorUuidV4).generate(),
          test: '@(true)', // todo: get started on a basic expression api
        }) as IBlockExitTestRequired}, {root: true})
    ]

    return defaults(props, {
      type: BLOCK_TYPE,
      name: props.uuid,
      exits,

      config: {
        prompt,
        choices: {sample: sampleChoiceResource.uuid},

        promptAudio: '', // todo: we need to deprecate this from flow-runner interface; replaced by prompt variants
      },
    })
  },

  // todo: update this to be for all languages
  // todo: do we generate, update + maintain all languages? when a choice is renamed?
  updateChoiceValueForDefaultLanguage({state, commit, dispatch}, {blockId, resourceId, key, value}) {

    commit('renameChoiceKey', {blockId, key, desiredKey: value})

    const {
      languages: {0: {id: languageId}},
      supportedModes: modes}: IFlow = this.getters['flow/activeFlow']

    const variant: IResourceDefinitionVariantOverModesFilter = {
      languageId,
      modes,
      contentType: SupportedContentType.TEXT}

    // change this to setOrCreate
    commit('flow/resource_setValue', {resourceId, filter: variant, value}, {root: true}) // we're assuming this pseudo-variant exists

    // todo: update block exit label
  },

  createChoiceValueForDefaultLanguage() {
    // const resourceId = commit('flow/resource_create', {variants: []}, {root: true})
    // setChoiceResource({blockId, key, resourceId})
    // chain up to updateChoiceValueForDefaultLanguage() 👆🏽
    // generate block exit like: commit('flow/blockExit_create', {blockId, label} as Partial<IBlockExit>)
  }
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
}
