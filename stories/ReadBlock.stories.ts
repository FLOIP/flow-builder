import ReadBlock from '@/components/interaction-designer/block-types/ConsoleIO_ReadBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'
import readBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/ConsoleIO_ReadBlockStore'
import {BaseMountedVueClass, IBaseOptions} from './story-utils/storeSetup'
import {Component} from 'vue-property-decorator'
import {namespace} from 'vuex-class'

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

// default log block state
@Component(
  {
    ...BaseOptions,
  }
)
class DefaultClass extends BaseMountedVueClass {
  async created() {
    await this.baseMounted(BLOCK_TYPE, readBlockStore)
  }
}
export const Default = () => (DefaultClass)

@Component(
  {
    ...BaseOptions,
  }
)
class ExistingDataClass extends BaseMountedVueClass {
  async created() {
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, readBlockStore)

    this.setDescription(blockId)
    this.setFormatString("%s lorem ipsum %d [...]")
  }

  @blockVuexNamespace.Action setFormatString!: (newFormatString: string) => void
}
export const ExistingDataBlock = () => (ExistingDataClass)

@Component(
  {
    ...BaseOptions,
  }
)
class ExistingDataNonStartingClass extends BaseMountedVueClass {
  async created() {
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, readBlockStore)

    this.setDescription(blockId)
    this.setFormatString("%s lorem ipsum %d [...]")
    await this.fakeCaseBlockAsFirstBlock(flowId)
  }

  @blockVuexNamespace.Action setFormatString!: (newFormatString: string) => void
}
export const ExistingDataNonStartingBlock = () => (ExistingDataNonStartingClass)
