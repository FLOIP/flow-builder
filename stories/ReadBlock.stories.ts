import ReadBlock from '@/components/interaction-designer/block-types/ConsoleIO_ReadBlock.vue'
import readBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/ConsoleIO_ReadBlockStore'
import {Options} from 'vue-class-component'
import {namespace} from 'vuex-class'
import {BaseMountedVueClass, IBaseOptions} from './story-utils/storeSetup'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)

export default {
  title: 'ConsoleIo/Read Block',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
}

const readBlockTemplate = `
  <flow-builder-sidebar-editor-container :block="activeBlock">
    <read-block
      :block="activeBlock"
      :flow="activeFlow"/>
  </flow-builder-sidebar-editor-container>
`

const BaseOptions: IBaseOptions = {
  components: {ReadBlock, FlowBuilderSidebarEditorContainer},
  template: readBlockTemplate,
}

// default state
@Options(
  {
    ...BaseOptions,
  },
)
class DefaultClass extends BaseMountedVueClass {
  async mounted() {
    await this.baseMounted(BLOCK_TYPE, readBlockStore)
  }
}

export const Default = () => (DefaultClass)

@Options(
  {
    ...BaseOptions,
  },
)
class ExistingDataClass extends BaseMountedVueClass {
  async mounted() {
    const {block: {uuid: blockId}} = await this.baseMounted(BLOCK_TYPE, readBlockStore)

    this.setDescription(blockId)
    this.setFormatString('%s lorem ipsum %d [...]')
    this.setTags(blockId)
  }

  @blockVuexNamespace.Action setFormatString!: (newFormatString: string) => void
}

export const ExistingDataBlock = () => (ExistingDataClass)

@Options(
  {
    ...BaseOptions,
  },
)
class ExistingDataNonStartingClass extends BaseMountedVueClass {
  async mounted() {
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, readBlockStore)

    this.setDescription(blockId)
    this.setFormatString('%s lorem ipsum %d [...]')
    await this.fakeCaseBlockAsFirstBlock(flowId)
  }

  @blockVuexNamespace.Action setFormatString!: (newFormatString: string) => void
}

export const ExistingDataNonStartingBlock = () => (ExistingDataNonStartingClass)
