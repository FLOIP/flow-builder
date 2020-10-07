import Vue from 'vue'
import Vuex from 'vuex'

import NumericResponseBlock from '@/components/interaction-designer/block-types/MobilePrimitives_NumericResponseBlock.vue'
import FlowBuilderSidebarEditorContainer from '@/stories/story-utils/FlowBuilderSidebarEditorContainer.vue'

import {IRootState, store} from '@/store'
import caseBlockStore, {BLOCK_TYPE as CASE_BLOCK_TYPE} from '@/store/flow/block-types/Core_CaseBlockStore'
import numericResponseBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_NumericResponseBlockStore'
import {SupportedMode, IFlow, SupportedContentType} from '@floip/flow-runner'
import {IResourceDefinitionVariantOverModesFilter} from '@/store/flow/resource'

import stubbedFilters from '@/stories/story-utils/stubbedFilters'
import {baseMounted, BaseMountedVueClass} from '@/stories/story-utils/storeSetup'
import {Component} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import {get} from 'lodash'

Vue.filter('trans', stubbedFilters.trans)
Vue.use(Vuex)

const flowVuexNamespace = namespace('flow')
const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)

export default {
  title: 'MobilePrimitives/Numeric Response Block',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
}

const NumericResponseBlockTemplate = `
  <flow-builder-sidebar-editor-container :block="activeBlock">
    <numeric-response-block 
      :block="activeBlock" 
      :flow="activeFlow"/>
  </flow-builder-sidebar-editor-container>
`

const BaseOptions = {
  components: {NumericResponseBlock, FlowBuilderSidebarEditorContainer},
  template: NumericResponseBlockTemplate,
}

class DefaultClass extends BaseMountedVueClass {}

// default numeric-response block state
export const Default = () => (
  @Component<any>(
    {
      ...BaseOptions,
      store: new Vuex.Store<IRootState>(store),
      async mounted() {
        await baseMounted.bind(this)(BLOCK_TYPE, numericResponseBlockStore)
      },
    }
  )
  class CurrentClass1 extends DefaultClass {}
)

export const ExistingDataForAllModes = () => (
  @Component<any>({
    ...BaseOptions,
    store: new Vuex.Store<IRootState>(store),
    async mounted() {
      const {block: {uuid: blockId}, flow: {uuid: flowId}} = await baseMounted.bind(this)(BLOCK_TYPE, numericResponseBlockStore)
      const {
        languages: {
          0: {id: languageId}
        },
      }: IFlow = this.activeFlow
      const resourceId = get(this.activeBlock, `config.prompt`, '')

      this.setDescription(blockId)
      this.setResourceData(languageId, resourceId)
      this.setValidationMinimum({blockId, value:0})
      this.setValidationMaximum({blockId, value:99})
      this.setMaxDigits({blockId, value:2})
    },
  })
  class CurrentClass2 extends DefaultClass {

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
        contentType: SupportedContentType.TEXT,
      }
      const variantUssd: IResourceDefinitionVariantOverModesFilter = {
        languageId,
        modes: ['ussd'],
        contentType: SupportedContentType.TEXT,
      }
      const variantIvr: IResourceDefinitionVariantOverModesFilter = {
        languageId,
        modes: ['ivr'],
        contentType: SupportedContentType.TEXT,
      }
      // we're assuming this pseudo-variants exist
      this.resource_setValue({resourceId, filter: variantSms, value: "text for SMS"})
      this.resource_setValue({resourceId, filter: variantUssd, value: "text for USSD"})
      this.resource_setValue({resourceId, filter: variantIvr, value: "text for IVR"})
    }
    
    @blockVuexNamespace.Action setValidationMinimum:any
    @blockVuexNamespace.Action setValidationMaximum:any
    @blockVuexNamespace.Action setMaxDigits:any

    @flowVuexNamespace.Mutation block_setName:any
    @flowVuexNamespace.Mutation block_setLabel:any
    @flowVuexNamespace.Mutation block_setSemanticLabel:any
    @flowVuexNamespace.Mutation resource_setValue:any
  }
)

export const ExistingDataForIvrOnly = () => (
  @Component<any>({
    ...BaseOptions,
    store: new Vuex.Store<IRootState>(store),
    async mounted() {
      const {block: {uuid: blockId}, flow: {uuid: flowId}} = await baseMounted.bind(this)(BLOCK_TYPE, numericResponseBlockStore)
      const {
        languages: {
          0: {id: languageId}
        },
      }: IFlow = this.activeFlow
      const resourceId = get(this.activeBlock, `config.prompt`, '')

      this.flow_setSupportedMode({flowId, value: SupportedMode.IVR})
      this.setValidationMinimum({blockId, value:0})
      this.setValidationMaximum({blockId, value:99})
      this.setMaxDigits({blockId, value:2})
      this.setDescription(blockId)
      this.setResourceData(languageId, resourceId)
    },
  })
  class CurrentClass3 extends DefaultClass {
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
        contentType: SupportedContentType.TEXT,
      }
      const variantUssd: IResourceDefinitionVariantOverModesFilter = {
        languageId,
        modes: ['ussd'],
        contentType: SupportedContentType.TEXT,
      }
      const variantIvr: IResourceDefinitionVariantOverModesFilter = {
        languageId,
        modes: ['ivr'],
        contentType: SupportedContentType.TEXT,
      }
      // we're assuming this pseudo-variants exist
      this.resource_setValue({resourceId, filter: variantSms, value: "text for SMS"})
      this.resource_setValue({resourceId, filter: variantUssd, value: "text for USSD"})
      this.resource_setValue({resourceId, filter: variantIvr, value: "text for IVR"})
    }

    @blockVuexNamespace.Action setValidationMinimum:any
    @blockVuexNamespace.Action setValidationMaximum:any
    @blockVuexNamespace.Action setMaxDigits:any

    @flowVuexNamespace.Mutation block_setName:any
    @flowVuexNamespace.Mutation block_setLabel:any
    @flowVuexNamespace.Mutation block_setSemanticLabel:any
    @flowVuexNamespace.Mutation resource_setValue:any
    @flowVuexNamespace.Mutation flow_setSupportedMode:any
  }
)

export const ExistingDataForTextOnly = () => (
  @Component<any>({
    ...BaseOptions,
    store: new Vuex.Store<IRootState>(store),
    async mounted() {
      const {block: {uuid: blockId}, flow: {uuid: flowId}} = await baseMounted.bind(this)(BLOCK_TYPE, numericResponseBlockStore)
      const {
        languages: {
          0: {id: languageId}
        },
      }: IFlow = this.activeFlow
      const resourceId = get(this.activeBlock, `config.prompt`, '')

      this.flow_setSupportedMode({flowId, value: [SupportedMode.SMS, SupportedMode.USSD]})
      this.setValidationMinimum({blockId, value:0})
      this.setValidationMaximum({blockId, value:99})
      this.setDescription(blockId)
      this.setResourceData(languageId, resourceId)
    },
  })
  class CurrentClass4 extends DefaultClass {
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
        contentType: SupportedContentType.TEXT,
      }
      const variantUssd: IResourceDefinitionVariantOverModesFilter = {
        languageId,
        modes: ['ussd'],
        contentType: SupportedContentType.TEXT,
      }
      const variantIvr: IResourceDefinitionVariantOverModesFilter = {
        languageId,
        modes: ['ivr'],
        contentType: SupportedContentType.TEXT,
      }
      // we're assuming this pseudo-variants exist
      this.resource_setValue({resourceId, filter: variantSms, value: "text for SMS"})
      this.resource_setValue({resourceId, filter: variantUssd, value: "text for USSD"})
      this.resource_setValue({resourceId, filter: variantIvr, value: "text for IVR"})
    }

    @blockVuexNamespace.Action setValidationMinimum:any
    @blockVuexNamespace.Action setValidationMaximum:any

    @flowVuexNamespace.Mutation block_setName:any
    @flowVuexNamespace.Mutation block_setLabel:any
    @flowVuexNamespace.Mutation block_setSemanticLabel:any
    @flowVuexNamespace.Mutation resource_setValue:any
    @flowVuexNamespace.Mutation flow_setSupportedMode:any
  }
)

export const NonStartingBlock = () => (
  @Component<any>(
    {
      ...BaseOptions,
      store: new Vuex.Store<IRootState>(store),
      async mounted() {
        const {block: {uuid: blockId}, flow: {uuid: flowId}} = await baseMounted.bind(this)(BLOCK_TYPE, numericResponseBlockStore)

        this.block_setName({blockId: blockId, value: "A Name"})
        this.block_setLabel({blockId: blockId, value: "A Label"})
        this.block_setSemanticLabel({blockId: blockId, value: "A Semantic Label"})

        // Fake a 1st block to make sure the current block won't be selected
        this.$store.registerModule(['flow', CASE_BLOCK_TYPE], caseBlockStore)
        const caseBlock = await this.flow_addBlankBlockByType({type: CASE_BLOCK_TYPE})
        const {uuid: caseBlockId} = caseBlock

        this.flow_setFirstBlockId({blockId: caseBlockId, flowId: flowId})
      },
    }
  )
  class CurrentClass5 extends DefaultClass {
    @flowVuexNamespace.Mutation block_setName:any
    @flowVuexNamespace.Mutation block_setLabel:any
    @flowVuexNamespace.Mutation block_setSemanticLabel:any
    @flowVuexNamespace.Mutation flow_setFirstBlockId:any
  }
)
