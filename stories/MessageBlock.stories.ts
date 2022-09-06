import MessageBlock from '@/components/interaction-designer/block-types/MobilePrimitives_MessageBlock.vue'
import messageBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_MessageBlockStore'

import {BaseMountedVueClass, BaseMountedVueClassWithResourceAndMode, IBaseOptions} from './story-utils/storeSetup'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'
import {Options} from 'vue-class-component'

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
const BaseOptions: IBaseOptions = {
  components: {MessageBlock, FlowBuilderSidebarEditorContainer},
  template: MessageBlockTemplate,
}

@Options({
  ...BaseOptions,
})
class DefaultClass extends BaseMountedVueClass {
  async mounted() {
    await this.baseMounted(BLOCK_TYPE, messageBlockStore)
  }
}

// default log block state
export const Default = () => (DefaultClass)

@Options(
  {
    ...BaseOptions,
  },
)
class ExistingDataBlockClass extends BaseMountedVueClassWithResourceAndMode {
  async mounted() {
    const {block: {uuid: blockId}} = await this.baseMounted(BLOCK_TYPE, messageBlockStore)

    this.setDescription(blockId)
    this.setResourceData({
      shouldSetChoices: false,
      configPath: 'config.prompt',
    })
    this.setTags(blockId)
  }
}

export const ExistingDataBlock = () => (ExistingDataBlockClass)

@Options(
  {
    ...BaseOptions,
  },
)
class NonStartingBlockClass extends BaseMountedVueClass {
  async mounted() {
    const {flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, messageBlockStore)
    await this.fakeCaseBlockAsFirstBlock(flowId)
  }
}

export const NonStartingBlock = () => (NonStartingBlockClass)
