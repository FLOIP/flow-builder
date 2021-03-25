import Vue from 'vue'
import Vuex from 'vuex'

import MessageBlock from '@/components/interaction-designer/block-types/MobilePrimitives_MessageBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'

import {IRootState, store} from '@/store'
import caseBlockStore, {BLOCK_TYPE as CASE_BLOCK_TYPE} from '@/store/flow/block-types/Core_CaseBlockStore'
import messageBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_MessageBlockStore'

import {
  baseMounted,
  BaseMountedVueClass,
  BaseMountedVueClassWithResourceAndMode,
} from './story-utils/storeSetup'

import {Component} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import {IFlow, SupportedContentType, SupportedMode} from '@floip/flow-runner'
import {get} from 'lodash'
import {IResourceDefinitionVariantOverModesFilter} from '@/store/flow/resource'

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

@Component(
  {
    components: {MessageBlock, FlowBuilderSidebarEditorContainer},
    template: MessageBlockTemplate,
    store: new Vuex.Store<IRootState>(store),
    async mounted() {
      // @ts-ignore
      await baseMounted.bind(this)(BLOCK_TYPE, messageBlockStore)
    },
  }
)
class DefaultClass extends BaseMountedVueClass {}
// default log block state
export const Default = () => (DefaultClass)

@Component(
  {
    components: {MessageBlock, FlowBuilderSidebarEditorContainer},
    template: MessageBlockTemplate,
    store: new Vuex.Store<IRootState>(store),
    async mounted() {
      // @ts-ignore
      const {block: {uuid: blockId}, flow: {uuid: flowId}} = await baseMounted.bind(this)(BLOCK_TYPE, messageBlockStore)

      this.setDescription(blockId)
      this.setResourceData({
        shouldSetChoices: false,
        configPath: 'config.prompt'
      })
    },
  }
)
class ExistingDataBlockClass extends BaseMountedVueClassWithResourceAndMode {}
export const ExistingDataBlock = () => (ExistingDataBlockClass)

@Component(
  {
    components: {MessageBlock, FlowBuilderSidebarEditorContainer},
    template: MessageBlockTemplate,
    store: new Vuex.Store<IRootState>(store),
    async mounted() {
      // @ts-ignore
      const {block: {uuid: blockId}, flow: {uuid: flowId}} = await baseMounted.bind(this)(BLOCK_TYPE, messageBlockStore)

      // Fake a 1st block to make sure the current block won't be selected
      // @ts-ignore
      await this.safeRegisterBlockModule.bind(this)(CASE_BLOCK_TYPE, caseBlockStore)
      const caseBlock = await this.flow_addBlankBlockByType({type: CASE_BLOCK_TYPE})
      const {uuid: caseBlockId} = caseBlock

      this.flow_setFirstBlockId({blockId: caseBlockId, flowId: flowId})
    },
  }
)
class NonStartingBlockClass extends BaseMountedVueClass {}
export const NonStartingBlock = () => (NonStartingBlockClass)
