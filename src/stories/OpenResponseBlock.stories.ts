import Vue from 'vue'
import Vuex from 'vuex'

import OpenResponseBlock from '@/components/interaction-designer/block-types/MobilePrimitives_OpenResponseBlock.vue'
import FlowBuilderSidebarEditorContainer from '@/stories/story-utils/FlowBuilderSidebarEditorContainer.vue'

import {IRootState, store} from '@/store'
import caseBlockStore, {BLOCK_TYPE as CASE_BLOCK_TYPE} from '@/store/flow/block-types/Core_CaseBlockStore'
import openResponseBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_OpenResponseBlockStore'
import {SupportedMode, IFlow, SupportedContentType} from '@floip/flow-runner'
import {IResourceDefinitionVariantOverModesFilter} from '@/store/flow/resource'

import stubbedFilters from '@/stories/story-utils/stubbedFilters'
import { baseMounted } from '@/stories/story-utils/storeSetup'
import {Component} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import {get} from 'lodash'

Vue.filter('trans', stubbedFilters.trans)
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

/**
 * Vue class used to gather required Getter, Mutation, Action for the BaseMounted binding
 */
class BaseClass extends Vue {
  @flowVuexNamespace.Getter activeBlock
  @flowVuexNamespace.Getter activeFlow

  @flowVuexNamespace.Mutation flow_activateBlock

  @flowVuexNamespace.Action flow_addBlankFlow
  @flowVuexNamespace.Action flow_addBlankBlockByType
}

// default open-response block state
export const Default = () => (
  @Component<any>(
    {
      ...BaseOptions,
      store: new Vuex.Store<IRootState>(store),
      async mounted() {
        await baseMounted.bind(this)(BLOCK_TYPE, openResponseBlockStore)
      },
    }
  )
  class CurrentClass extends BaseClass {}
)

export const ExistingDataForAllModes = () => (
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
  class CurrentClass extends BaseClass {

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
    
    @blockVuexNamespace.Action setMaxDurationSeconds
    @blockVuexNamespace.Action setMaxResponseCharacters

    @flowVuexNamespace.Mutation block_setName
    @flowVuexNamespace.Mutation block_setLabel
    @flowVuexNamespace.Mutation block_setSemanticLabel
    @flowVuexNamespace.Mutation resource_setValue
  }
)

export const ExistingDataForIvrOnly = () => (
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
  class CurrentClass extends BaseClass {
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

    @blockVuexNamespace.Action setMaxDurationSeconds

    @flowVuexNamespace.Mutation block_setName
    @flowVuexNamespace.Mutation block_setLabel
    @flowVuexNamespace.Mutation block_setSemanticLabel
    @flowVuexNamespace.Mutation resource_setValue
    @flowVuexNamespace.Mutation flow_setSupportedMode
  }
)

export const ExistingDataForTextOnly = () => (
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
  class CurrentClass extends BaseClass {
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

    @blockVuexNamespace.Action setMaxResponseCharacters

    @flowVuexNamespace.Mutation block_setName
    @flowVuexNamespace.Mutation block_setLabel
    @flowVuexNamespace.Mutation block_setSemanticLabel
    @flowVuexNamespace.Mutation resource_setValue
    @flowVuexNamespace.Mutation flow_setSupportedMode
  }
)

export const NonStartingBlock = () => (
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
        this.$store.registerModule(['flow', CASE_BLOCK_TYPE], caseBlockStore)
        const caseBlock = await this.flow_addBlankBlockByType({type: CASE_BLOCK_TYPE})
        const {uuid: caseBlockId} = caseBlock

        this.flow_setFirstBlockId({blockId: caseBlockId, flowId: flowId})
      },
    }
  )
  class CurrentClass extends BaseClass {
    @flowVuexNamespace.Mutation block_setName
    @flowVuexNamespace.Mutation block_setLabel
    @flowVuexNamespace.Mutation block_setSemanticLabel
    @flowVuexNamespace.Mutation flow_setFirstBlockId
  }
)
