import Vue from 'vue'
import Vuex from 'vuex'

import OpenResponseBlock from '@/components/interaction-designer/block-types/MobilePrimitives_OpenResponseBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'

import {IRootState, store} from '@/store'
import caseBlockStore, {BLOCK_TYPE as CASE_BLOCK_TYPE} from '@/store/flow/block-types/Core_CaseBlockStore'
import openResponseBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_OpenResponseBlockStore'
import {SupportedMode, IFlow, SupportedContentType} from '@floip/flow-runner'
import {IResourceDefinitionVariantOverModesFilter} from '@/store/flow/resource'

import {baseMounted, BaseMountedVueClass, safeRegisterBlockModule} from './story-utils/storeSetup'
import {Component} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import {get} from 'lodash'

Vue.use(Vuex)

const flowVuexNamespace = namespace('flow')
const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)

export default {
  title: 'MobilePrimitives/Open Response Block',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
}

const OpenResponseBlockTemplate = `
  <flow-builder-sidebar-editor-container :block="activeBlock">
    <open-response-block 
      :block="activeBlock" 
      :flow="activeFlow"/>
  </flow-builder-sidebar-editor-container>
`

const BaseOptions = {
  components: {OpenResponseBlock, FlowBuilderSidebarEditorContainer},
  template: OpenResponseBlockTemplate,
}

// default open-response block state
@Component<any>(
    {
      ...BaseOptions,
      store: new Vuex.Store<IRootState>(store),
      async mounted() {
        await baseMounted.bind(this)(BLOCK_TYPE, openResponseBlockStore)
      },
    }
)
class CurrentClass1 extends BaseMountedVueClass {}
export const Default = () => (CurrentClass1)

//ExistingDataForAllModes
@Component<any>({
  ...BaseOptions,
  store: new Vuex.Store<IRootState>(store),
  async mounted() {
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await baseMounted.bind(this)(BLOCK_TYPE, openResponseBlockStore)
    const {
      languages: {
        0: {id: languageId}
      },
    }: IFlow = this.activeFlow
    const resourceId = get(this.activeBlock, `config.prompt`, '')

    this.setDescription(blockId)
    this.setResourceData(languageId, resourceId)
    this.setMaxDurationSeconds(3*60)
    this.setMaxResponseCharacters(160)
  },
})
class CurrentClass2 extends BaseMountedVueClass {

  setDescription(blockId) { // TODO: Find a wait to define this in BaseClass or other ParentClass without '_this.setDescription is not a function' error
    this.block_setName({blockId: blockId, value: "A Name"})
    this.block_setLabel({blockId: blockId, value: "A Label"})
    this.block_setSemanticLabel({blockId: blockId, value: "A Semantic Label"})
  }

  setResourceData(languageId, resourceId) {
    // Set values on resource editor // TODO: find better way to do this once the resource editor is fully implemented
    const variantSms: IResourceDefinitionVariantOverModesFilter = {
      languageId,
      modes: ['sms'],
      // @ts-ignore: TODO: remove this ts-ignore once we find a way to match `contentType` type from /@floip/flow-runner/dist/domain/IResourceResolver.d.ts:IResourceDefinitionContentTypeSpecific interface
      contentType: [SupportedContentType.TEXT],
    }
    const variantUssd: IResourceDefinitionVariantOverModesFilter = {
      languageId,
      modes: ['ussd'],
      // @ts-ignore: TODO: remove this ts-ignore once we find a way to match `contentType` type from /@floip/flow-runner/dist/domain/IResourceResolver.d.ts:IResourceDefinitionContentTypeSpecific interface
      contentType: [SupportedContentType.TEXT],
    }
    const variantIvr: IResourceDefinitionVariantOverModesFilter = {
      languageId,
      modes: ['ivr'],
      // @ts-ignore: TODO: remove this ts-ignore once we find a way to match `contentType` type from /@floip/flow-runner/dist/domain/IResourceResolver.d.ts:IResourceDefinitionContentTypeSpecific interface
      contentType: [SupportedContentType.AUDIO],
    }
    // we're assuming this pseudo-variants exist
    this.resource_setValue({resourceId, filter: variantSms, value: "text for SMS"})
    this.resource_setValue({resourceId, filter: variantUssd, value: "text for USSD"})
    this.resource_setValue({resourceId, filter: variantIvr, value: "path/to/ivr audio.mp3"})
  }

  @blockVuexNamespace.Action setMaxDurationSeconds:any
  @blockVuexNamespace.Action setMaxResponseCharacters:any

  @flowVuexNamespace.Mutation block_setName:any
  @flowVuexNamespace.Mutation block_setLabel:any
  @flowVuexNamespace.Mutation block_setSemanticLabel:any
  @flowVuexNamespace.Mutation resource_setValue:any
}
export const ExistingDataForAllModes = () => (CurrentClass2)

//ExistingDataForIvrOnly
@Component<any>({
  ...BaseOptions,
  store: new Vuex.Store<IRootState>(store),
  async mounted() {
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await baseMounted.bind(this)(BLOCK_TYPE, openResponseBlockStore)
    const {
      languages: {
        0: {id: languageId}
      },
    }: IFlow = this.activeFlow
    const resourceId = get(this.activeBlock, `config.prompt`, '')

    this.flow_setSupportedMode({flowId, value: SupportedMode.IVR})
    this.setMaxDurationSeconds(3*60)
    this.setDescription(blockId)
    this.setResourceData(languageId, resourceId)
  },
})
class CurrentClass3 extends BaseMountedVueClass {
  setDescription(blockId) { // TODO: Find a wait to define this in BaseClass or other ParentClass without '_this.setDescription is not a function' error
    this.block_setName({blockId: blockId, value: "A Name"})
    this.block_setLabel({blockId: blockId, value: "A Label"})
    this.block_setSemanticLabel({blockId: blockId, value: "A Semantic Label"})
  }

  setResourceData(languageId, resourceId) {
    // Set values on resource editor // TODO: find better way to do this once the resource editor is fully implemented
    const variantSms: IResourceDefinitionVariantOverModesFilter = {
      languageId,
      modes: ['sms'],
      // @ts-ignore: TODO: remove this ts-ignore once we find a way to match `contentType` type from /@floip/flow-runner/dist/domain/IResourceResolver.d.ts:IResourceDefinitionContentTypeSpecific interface
      contentType: [SupportedContentType.TEXT],
    }
    const variantUssd: IResourceDefinitionVariantOverModesFilter = {
      languageId,
      modes: ['ussd'],
      // @ts-ignore: TODO: remove this ts-ignore once we find a way to match `contentType` type from /@floip/flow-runner/dist/domain/IResourceResolver.d.ts:IResourceDefinitionContentTypeSpecific interface
      contentType: [SupportedContentType.TEXT],
    }
    const variantIvr: IResourceDefinitionVariantOverModesFilter = {
      languageId,
      modes: ['ivr'],
      // @ts-ignore: TODO: remove this ts-ignore once we find a way to match `contentType` type from /@floip/flow-runner/dist/domain/IResourceResolver.d.ts:IResourceDefinitionContentTypeSpecific interface
      contentType: [SupportedContentType.AUDIO],
    }
    // we're assuming this pseudo-variants exist
    this.resource_setValue({resourceId, filter: variantSms, value: "text for SMS"})
    this.resource_setValue({resourceId, filter: variantUssd, value: "text for USSD"})
    this.resource_setValue({resourceId, filter: variantIvr, value: "path/to/ivr audio.mp3"})
  }

  @blockVuexNamespace.Action setMaxDurationSeconds:any

  @flowVuexNamespace.Mutation block_setName:any
  @flowVuexNamespace.Mutation block_setLabel:any
  @flowVuexNamespace.Mutation block_setSemanticLabel:any
  @flowVuexNamespace.Mutation resource_setValue:any
  @flowVuexNamespace.Mutation flow_setSupportedMode:any
}
export const ExistingDataForIvrOnly = () => (CurrentClass3)

//ExistingDataForTextOnly
@Component<any>({
  ...BaseOptions,
  store: new Vuex.Store<IRootState>(store),
  async mounted() {
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await baseMounted.bind(this)(BLOCK_TYPE, openResponseBlockStore)
    const {
      languages: {
        0: {id: languageId}
      },
    }: IFlow = this.activeFlow
    const resourceId = get(this.activeBlock, `config.prompt`, '')

    this.flow_setSupportedMode({flowId, value: [SupportedMode.SMS, SupportedMode.USSD]})
    this.setMaxResponseCharacters(160)
    this.setDescription(blockId)
    this.setResourceData(languageId, resourceId)
  },
})
class CurrentClass4 extends BaseMountedVueClass {
  setDescription(blockId) { // TODO: Find a wait to define this in BaseClass or other ParentClass without '_this.setDescription is not a function' error
    this.block_setName({blockId: blockId, value: "A Name"})
    this.block_setLabel({blockId: blockId, value: "A Label"})
    this.block_setSemanticLabel({blockId: blockId, value: "A Semantic Label"})
  }

  setResourceData(languageId, resourceId) {
    // Set values on resource editor // TODO: find better way to do this once the resource editor is fully implemented
    const variantSms: IResourceDefinitionVariantOverModesFilter = {
      languageId,
      modes: ['sms'],
      // @ts-ignore: TODO: remove this ts-ignore once we find a way to match `contentType` type from /@floip/flow-runner/dist/domain/IResourceResolver.d.ts:IResourceDefinitionContentTypeSpecific interface
      contentType: [SupportedContentType.TEXT],
    }
    const variantUssd: IResourceDefinitionVariantOverModesFilter = {
      languageId,
      modes: ['ussd'],
      // @ts-ignore: TODO: remove this ts-ignore once we find a way to match `contentType` type from /@floip/flow-runner/dist/domain/IResourceResolver.d.ts:IResourceDefinitionContentTypeSpecific interface
      contentType: [SupportedContentType.TEXT],
    }
    const variantIvr: IResourceDefinitionVariantOverModesFilter = {
      languageId,
      modes: ['ivr'],
      // @ts-ignore: TODO: remove this ts-ignore once we find a way to match `contentType` type from /@floip/flow-runner/dist/domain/IResourceResolver.d.ts:IResourceDefinitionContentTypeSpecific interface
      contentType: [SupportedContentType.AUDIO],
    }
    // we're assuming this pseudo-variants exist
    this.resource_setValue({resourceId, filter: variantSms, value: "text for SMS"})
    this.resource_setValue({resourceId, filter: variantUssd, value: "text for USSD"})
    this.resource_setValue({resourceId, filter: variantIvr, value: "path/to/ivr audio.mp3"})
  }

  @blockVuexNamespace.Action setMaxResponseCharacters:any

  @flowVuexNamespace.Mutation block_setName:any
  @flowVuexNamespace.Mutation block_setLabel:any
  @flowVuexNamespace.Mutation block_setSemanticLabel:any
  @flowVuexNamespace.Mutation resource_setValue:any
  @flowVuexNamespace.Mutation flow_setSupportedMode:any
}
export const ExistingDataForTextOnly = () => (CurrentClass4)

//NonStartingBlock
@Component<any>(
    {
      ...BaseOptions,
      store: new Vuex.Store<IRootState>(store),
      async mounted() {
        const {block: {uuid: blockId}, flow: {uuid: flowId}} = await baseMounted.bind(this)(BLOCK_TYPE, openResponseBlockStore)

        this.block_setName({blockId: blockId, value: "A Name"})
        this.block_setLabel({blockId: blockId, value: "A Label"})
        this.block_setSemanticLabel({blockId: blockId, value: "A Semantic Label"})

        // Fake a 1st block to make sure the current block won't be selected
        // @ts-ignore
        await safeRegisterBlockModule.bind(this)(CASE_BLOCK_TYPE, caseBlockStore)
        const caseBlock = await this.flow_addBlankBlockByType({type: CASE_BLOCK_TYPE})
        const {uuid: caseBlockId} = caseBlock

        this.flow_setFirstBlockId({blockId: caseBlockId, flowId: flowId})
      },
    }
)
class CurrentClass5 extends BaseMountedVueClass {
  @flowVuexNamespace.Mutation block_setName:any
  @flowVuexNamespace.Mutation block_setLabel:any
  @flowVuexNamespace.Mutation block_setSemanticLabel:any
  @flowVuexNamespace.Mutation flow_setFirstBlockId:any
}
export const NonStartingBlock = () => (CurrentClass5)
