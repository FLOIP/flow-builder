import Vue from 'vue'
import Vuex from 'vuex'
import {Component} from 'vue-property-decorator'

import { baseMounted, BaseMountedVueClass } from '@/stories/story-utils/storeSetup'

Vue.use(Vuex)

import selectManyResponseBlock from '@/components/interaction-designer/block-types/MobilePrimitives_SelectManyResponseBlock.vue'
import FlowBuilderSidebarEditorContainer from '@/stories/story-utils/FlowBuilderSidebarEditorContainer.vue'
import {IRootState, store} from '@/store'
import selectManyStore, {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_SelectManyResponseBlockStore'
import {namespace} from 'vuex-class'
import {get} from 'lodash'

const flowVuexNamespace = namespace('flow')

import {
  SupportedMode,
  SupportedContentType,
  IFlow,
} from '@floip/flow-runner'
import {IResourceDefinitionVariantOverModesFilter} from '@/store/flow/resource'

export default {
  component: selectManyResponseBlock,
  title: 'MobilePrimitives/selectManyResponseBlock',
  store: new Vuex.Store({}),
}

const SelectManyTemplate = `
    <flow-builder-sidebar-editor-container :block="activeBlock">
      <select-many-response-block
          :block="activeBlock"
          :flow="activeFlow"/>
    </flow-builder-sidebar-editor-container>
  `

@Component<any>({
  template: SelectManyTemplate,
  
  components: {
    FlowBuilderSidebarEditorContainer,
    selectManyResponseBlock,
  },

  store: new Vuex.Store<IRootState>(store),

  async mounted() {
    // @ts-ignore
    await baseMounted.bind(this)(BLOCK_TYPE, selectManyStore)
  },
})
class InFlowBuilderClass extends BaseMountedVueClass {}

export const InFlowBuilder = () => {
  return InFlowBuilderClass
}

@Component<any>({
  template: SelectManyTemplate,
  components: {
    FlowBuilderSidebarEditorContainer,
    selectManyResponseBlock,
  },

  store: new Vuex.Store<IRootState>(store),

  async mounted() {
    // @ts-ignore
    const {block, flow} = await baseMounted.bind(this)(BLOCK_TYPE, selectManyStore)
    flow.supportedModes = [SupportedMode.IVR]
  },

})
class IvrOnlyClass extends BaseMountedVueClass {}

export const IvrOnly = () => {
  return IvrOnlyClass
}
@Component<any>({
  template: SelectManyTemplate,
  
  components: {
    FlowBuilderSidebarEditorContainer,
    selectManyResponseBlock,
  },

  store: new Vuex.Store<IRootState>(store),

  async mounted() {
    // @ts-ignore
    const {block, flow} = await baseMounted.bind(this)(BLOCK_TYPE, selectManyStore)
    flow.languages = [{id: '1', name: 'English'}, {id: '2', name: 'French'}] // mutation
  },

})
class MoreLanguagesClass extends BaseMountedVueClass {}

export const MoreLanguages = () => {
  return MoreLanguagesClass
}
@Component<any>({
  template: SelectManyTemplate,
  
  components: {
    FlowBuilderSidebarEditorContainer,
    selectManyResponseBlock,
  },

  store: new Vuex.Store<IRootState>(store),

  async mounted() {
    // @ts-ignore
    const {block: {uuid: blockId}, flow} = await baseMounted.bind(this)(BLOCK_TYPE, selectManyStore)
    this.block_setName({blockId: blockId, value: "A Name"})
    this.block_setLabel({blockId: blockId, value: "A Label"})
    this.block_setSemanticLabel({blockId: blockId, value: "A Semantic Label"})
    // Set values on resource editor // TODO: find better way to do this once the resource editor is fully implemented
    const {
      languages: {
        0: {id: languageId}
      },
    }: IFlow = this.activeFlow
    const resourceId = get(this.activeBlock, `config.prompt`, '')
    const choiceResourceId = get(this.activeBlock, `config.choices.1`, '')

    const variantSms: IResourceDefinitionVariantOverModesFilter = {
      languageId,
      modes: [SupportedMode.SMS],
      contentType: SupportedContentType.TEXT,
    }
    const variantUssd: IResourceDefinitionVariantOverModesFilter = {
      languageId,
      modes: [SupportedMode.USSD],
      contentType: SupportedContentType.TEXT,
    }
    const variantIvr: IResourceDefinitionVariantOverModesFilter = {
      languageId,
      modes: [SupportedMode.IVR],
      contentType: SupportedContentType.AUDIO,
    }
    // we're assuming this pseudo-variants exist
    this.resource_setValue({resourceId, filter: variantSms, value: "text for SMS"})
    this.resource_setValue({resourceId, filter: variantUssd, value: "text for USSD"})
    this.resource_setValue({resourceId, filter: variantIvr, value: "path/to/ivr audio.mp3"})

    this.resource_setValue({resourceId: choiceResourceId, filter: variantSms, value: "text for SMS"})
    this.resource_setValue({resourceId: choiceResourceId, filter: variantUssd, value: "text for USSD"})
    this.resource_setValue({resourceId: choiceResourceId, filter: variantIvr, value: "path/to/ivr audio.mp3"})
  },

})
class ExistingDataClass extends BaseMountedVueClass {
  @flowVuexNamespace.Mutation block_setName!: void
  @flowVuexNamespace.Mutation block_setLabel!: void
  @flowVuexNamespace.Mutation block_setSemanticLabel!: void
  @flowVuexNamespace.Mutation resource_setValue!: void
}

export const ExistingData = () => {
  return ExistingDataClass 
}
