import MessageBlock from '@/components/interaction-designer/block-types/MobilePrimitives_MessageBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'
import messageBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_MessageBlockStore'
import {
  BaseMountedVueClass,
  BaseMountedVueClassWithResourceAndMode, IBaseOptions,
} from './story-utils/storeSetup'

import {Component} from 'vue-property-decorator'

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

@Component({
  ...BaseOptions,
})
class DefaultClass extends BaseMountedVueClass {
  async created() {
    await this.baseMounted(BLOCK_TYPE, messageBlockStore)
  }
}
// default log block state
export const Default = () => (DefaultClass)

@Component(
  {
    ...BaseOptions,
  }
)
class ExistingDataBlockClass extends BaseMountedVueClassWithResourceAndMode {
  async created() {
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, messageBlockStore)

    this.setDescription(blockId)
    this.setResourceData({
      shouldSetChoices: false,
      configPath: 'config.prompt'
    })
  }
}
export const ExistingDataBlock = () => (ExistingDataBlockClass)

@Component(
  {
    ...BaseOptions,
  }
)
class NonStartingBlockClass extends BaseMountedVueClass {
  async created() {
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, messageBlockStore)
    await this.fakeCaseBlockAsFirstBlock(flowId)
  }
}
export const NonStartingBlock = () => (NonStartingBlockClass)
