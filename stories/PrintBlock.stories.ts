import PrintBlock from '@/components/interaction-designer/block-types/ConsoleIO_PrintBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'
import printBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/ConsoleIO_PrintBlockStore'
import {
  BaseMountedVueClass,
  BaseMountedVueClassWithResourceAndMode, IBaseOptions,
} from './story-utils/storeSetup'
import {Component} from 'vue-property-decorator'

export default {
  title: 'ConsoleIo/Print Block',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
}

const PrintBlockTemplate = `
  <flow-builder-sidebar-editor-container :block="activeBlock">
    <print-block
      :block="activeBlock"
      :flow="activeFlow"/>
  </flow-builder-sidebar-editor-container>
`

const BaseOptions: IBaseOptions = {
  components: {PrintBlock, FlowBuilderSidebarEditorContainer},
  template: PrintBlockTemplate,
}

// default log block state
@Component({
  ...BaseOptions,
})
class DefaultClass extends BaseMountedVueClass {
  async created() {
    await this.baseMounted(BLOCK_TYPE, printBlockStore)
  }
}
export const Default = () => {
  return DefaultClass
}

@Component({
  ...BaseOptions,
  }
)
class ExistingDataBlockClass extends BaseMountedVueClassWithResourceAndMode {
  async created() {
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, printBlockStore)

    this.setDescription(blockId)
    this.setResourceData({
      shouldSetChoices: false,
      configPath: 'config.message'
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
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, printBlockStore)

    this.setDescription(blockId)
    await this.fakeCaseBlockAsFirstBlock(flowId)
  }
}
export const NonStartingBlock = () => (NonStartingBlockClass)
