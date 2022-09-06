import PrintBlock from '@/components/interaction-designer/block-types/ConsoleIO_PrintBlock.vue'
import printBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/ConsoleIO_PrintBlockStore'
import {Options} from 'vue-class-component'
import {BaseMountedVueClass, BaseMountedVueClassWithResourceAndMode, IBaseOptions} from './story-utils/storeSetup'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'
import {namespace} from 'vuex-class'

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)

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

// default state
@Options({
  ...BaseOptions,
})
class DefaultClass extends BaseMountedVueClass {
  async mounted() {
    await this.baseMounted(BLOCK_TYPE, printBlockStore)
  }
}

export const Default = () => DefaultClass

@Options({
  ...BaseOptions,
})
class ExistingDataBlockClass extends BaseMountedVueClassWithResourceAndMode {
  async mounted() {
    const {block: {uuid: blockId}} = await this.baseMounted(BLOCK_TYPE, printBlockStore)

    this.setDescription(blockId)
    this.editMessage({blockId, message: 'my message'})
    this.setTags(blockId)
  }

  @blockVuexNamespace.Action editMessage!: ({blockId, message}: { blockId: string, message: string }) => void
}

export const ExistingDataBlock = () => (ExistingDataBlockClass)

@Options(
  {
    ...BaseOptions,
  },
)
class NonStartingBlockClass extends BaseMountedVueClass {
  async mounted() {
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, printBlockStore)

    this.setDescription(blockId)
    await this.fakeCaseBlockAsFirstBlock(flowId)
  }
}

export const NonStartingBlock = () => (NonStartingBlockClass)
