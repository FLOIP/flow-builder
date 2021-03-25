import Vue from 'vue'
import Vuex from 'vuex'
import {Component} from 'vue-property-decorator'

import { baseMounted, BaseMountedVueClass, BaseMountedVueClassWithResourceAndMode } from './story-utils/storeSetup'

Vue.use(Vuex)

import SelectOneResponseBlock from '@/components/interaction-designer/block-types/MobilePrimitives_SelectOneResponseBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'
import {IRootState, store} from '@/store'
import selectOneStore, {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_SelectOneResponseBlockStore'

import {get} from 'lodash'

import {
  SupportedMode,
  SupportedContentType,
  IFlow,
} from '@floip/flow-runner'
import {IResourceDefinitionVariantOverModesFilter} from '@/store/flow/resource'

export default {
  component: SelectOneResponseBlock,
  title: 'MobilePrimitives/SelectOneResponseBlock',
  store: new Vuex.Store({}),
}

const SelectOneResponseBlockTemplate = `
    <flow-builder-sidebar-editor-container :block="activeBlock">
      <select-one-response-block
          :block="activeBlock"
          :flow="activeFlow"/>
    </flow-builder-sidebar-editor-container>
  `

@Component<any>({
  template: SelectOneResponseBlockTemplate,
  components: {
    FlowBuilderSidebarEditorContainer,
    SelectOneResponseBlock,
  },

  store: new Vuex.Store<IRootState>(store),

  async mounted() {
    // @ts-ignore
    await baseMounted.bind(this)(BLOCK_TYPE, selectOneStore)
  },
})
class InFlowBuilderClass extends BaseMountedVueClass {}

export const InFlowBuilder = () => {
  return InFlowBuilderClass
}

@Component<any>({
  template: SelectOneResponseBlockTemplate,
  
  components: {
    FlowBuilderSidebarEditorContainer,
    SelectOneResponseBlock,
  },

  store: new Vuex.Store<IRootState>(store),

  async mounted() {
    // @ts-ignore
    const {block, flow} = await baseMounted.bind(this)(BLOCK_TYPE, selectOneStore)
    flow.supportedModes = [SupportedMode.IVR]
  },

})
class IvrOnlyClass extends BaseMountedVueClass {}

export const IvrOnly = () => {
  return IvrOnlyClass
}
@Component<any>({
  template: SelectOneResponseBlockTemplate,
  
  components: {
    FlowBuilderSidebarEditorContainer,
    SelectOneResponseBlock,
  },

  store: new Vuex.Store<IRootState>(store),

  async mounted() {
    // @ts-ignore
    const {block, flow} = await baseMounted.bind(this)(BLOCK_TYPE, selectOneStore)
    flow.languages = [{id: '1', name: 'English'}, {id: '2', name: 'French'}] // mutation
  },

})
class MoreLanguagesClass extends BaseMountedVueClass {}

export const MoreLanguages = () => {
  return MoreLanguagesClass
}
@Component<any>({
  template: SelectOneResponseBlockTemplate,
  
  components: {
    FlowBuilderSidebarEditorContainer,
    SelectOneResponseBlock,
  },

  store: new Vuex.Store<IRootState>(store),

  async mounted() {
    // @ts-ignore
    const {block: {uuid: blockId}, flow} = await baseMounted.bind(this)(BLOCK_TYPE, selectOneStore)
    this.setDescription(blockId)
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
      // @ts-ignore: TODO: remove this ts-ignore once we find a way to match `contentType` type from /@floip/flow-runner/dist/domain/IResourceResolver.d.ts:IResourceDefinitionContentTypeSpecific interface
      contentType: [SupportedContentType.TEXT],
    }
    const variantUssd: IResourceDefinitionVariantOverModesFilter = {
      languageId,
      modes: [SupportedMode.USSD],
      // @ts-ignore: TODO: remove this ts-ignore once we find a way to match `contentType` type from /@floip/flow-runner/dist/domain/IResourceResolver.d.ts:IResourceDefinitionContentTypeSpecific interface
      contentType: [SupportedContentType.TEXT],
    }
    const variantIvr: IResourceDefinitionVariantOverModesFilter = {
      languageId,
      modes: [SupportedMode.IVR],
      // @ts-ignore: TODO: remove this ts-ignore once we find a way to match `contentType` type from /@floip/flow-runner/dist/domain/IResourceResolver.d.ts:IResourceDefinitionContentTypeSpecific interface
      contentType: [SupportedContentType.AUDIO],
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
class ExistingDataClass extends BaseMountedVueClassWithResourceAndMode {}

export const ExistingData = () => {
  return ExistingDataClass 
}
