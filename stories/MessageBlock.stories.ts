import Vue from 'vue'
import Vuex from 'vuex'
import MessageBlock from '@/components/interaction-designer/block-types/MobilePrimitives_MessageBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'
import {IRootState, store} from '@/store'
import messageBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_MessageBlockStore'
import {
  BaseMountedVueClass,
  BaseMountedVueClassWithResourceAndMode,
} from './story-utils/storeSetup'

import {Component} from 'vue-property-decorator'

Vue.use(Vuex)

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
const BaseOptions = {
  components: {MessageBlock, FlowBuilderSidebarEditorContainer},
  template: MessageBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
}

@Component<any>({
  ...BaseOptions,
  async mounted() {
    await this.baseMounted(BLOCK_TYPE, messageBlockStore)
  },
})
class DefaultClass extends BaseMountedVueClass {}
// default log block state
export const Default = () => (DefaultClass)

@Component<any>(
  {
    ...BaseOptions,
    async mounted() {
      const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, messageBlockStore)

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

@Component<any>(
  {
    ...BaseOptions,
    async mounted() {
      const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, messageBlockStore)
      await this.fakeCaseBlockAsFirstBlock(flowId)
    },
  }
)
class NonStartingBlockClass extends BaseMountedVueClass {}
export const NonStartingBlock = () => (NonStartingBlockClass)
