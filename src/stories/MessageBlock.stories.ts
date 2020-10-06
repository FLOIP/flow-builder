//TODO - storyshots currently don't seem to be working

import Vue from 'vue'
import Vuex from 'vuex'

import MessageBlock from '../block-types/MessageBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'

import {IRootState, store} from '../../stores'
import caseBlockStore, {BLOCK_TYPE as CASE_BLOCK_TYPE} from '../../stores/flow/block-types/Core_CaseBlockStore'
import messageBlockStore, {BLOCK_TYPE} from '../../stores/flow/block-types/MobilePrimitives_MessageBlockStore'

import stubbedFilters from './story-utils/stubbedFilters'
import { baseMounted, BaseMountedVueClass } from './story-utils/storeSetup'

import {Component} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import {IFlow, SupportedContentType, SupportedMode} from '@floip/flow-runner'
import {get} from 'lodash'
import {IResourceDefinitionVariantOverModesFilter} from '@/stores/flow/resource'

Vue.filter('trans', stubbedFilters.trans)
Vue.use(Vuex)

const flowVuexNamespace = namespace('flow')

export default {
  title: 'MobilePrimitives/Message Block',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
}

const MessageBlockTemplate = `
  <flow-builder-sidebar-editor-container :block="activeBlock">
    <message-block 
      :block="activeBlock" 
      :flow="activeFlow"/>
  </flow-builder-sidebar-editor-container>
`

@Component<any>(
  {
    components: {MessageBlock, FlowBuilderSidebarEditorContainer},
    template: MessageBlockTemplate,
    store: new Vuex.Store<IRootState>(store),
    async mounted() {
      await baseMounted.bind(this)(BLOCK_TYPE, messageBlockStore)
    },
  }
)
class DefaultClass extends BaseMountedVueClass {}
// default log block state
export const Default = () => (DefaultClass)

@Component<any>(
  {
    components: {MessageBlock, FlowBuilderSidebarEditorContainer},
    template: MessageBlockTemplate,
    store: new Vuex.Store<IRootState>(store),
    async mounted() {
      const {block: {uuid: blockId}, flow: {uuid: flowId}} = await baseMounted.bind(this)(BLOCK_TYPE, messageBlockStore)

      //TODO - support sending props to baseMounted?
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
        contentType: SupportedContentType.TEXT,
      }
      // we're assuming this pseudo-variants exist
      this.resource_setValue({resourceId, filter: variantSms, value: "text for SMS"})
      this.resource_setValue({resourceId, filter: variantUssd, value: "text for USSD"})
      this.resource_setValue({resourceId, filter: variantIvr, value: "text for IVR"})
    },
  }
)
class ExistingDataBlockClass extends BaseMountedVueClass {
  @flowVuexNamespace.Mutation block_setName!: void
  @flowVuexNamespace.Mutation block_setLabel!: void
  @flowVuexNamespace.Mutation block_setSemanticLabel!: void
  @flowVuexNamespace.Mutation resource_setValue!: void
}
export const ExistingDataBlock = () => (ExistingDataBlockClass)

@Component<any>(
  {
    components: {MessageBlock, FlowBuilderSidebarEditorContainer},
    template: MessageBlockTemplate,
    store: new Vuex.Store<IRootState>(store),
    async mounted() {
      const {block: {uuid: blockId}, flow: {uuid: flowId}} = await baseMounted.bind(this)(BLOCK_TYPE, messageBlockStore)

      // Fake a 1st block to make sure the current block won't be selected
      this.$store.registerModule(['flow', CASE_BLOCK_TYPE], caseBlockStore)
      const caseBlock = await this.flow_addBlankBlockByType({type: CASE_BLOCK_TYPE})
      const {uuid: caseBlockId} = caseBlock

      this.flow_setFirstBlockId({blockId: caseBlockId, flowId: flowId})
    },
  }
)
class NonStartingBlockClass extends BaseMountedVueClass {
  @flowVuexNamespace.Mutation flow_setFirstBlockId!: void
}
export const NonStartingBlock = () => (NonStartingBlockClass)
