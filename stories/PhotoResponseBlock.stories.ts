import PhotoResponseBlock from '@/components/interaction-designer/block-types/SmartDevices_PhotoResponseBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'
import photoResponseBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/SmartDevices_PhotoResponseBlockStore'
import {BaseMountedVueClass, IBaseOptions} from './story-utils/storeSetup'
import {Component} from 'vue-property-decorator'

export default {
  title: 'SmartDevices/Photo Response Block',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
}

const PhotoResponseBlockTemplate = `
  <flow-builder-sidebar-editor-container :block="activeBlock">
    <photo-response-block
      :block="activeBlock"
      :flow="activeFlow"/>
  </flow-builder-sidebar-editor-container>
`

const BaseOptions: IBaseOptions = {
  components: {PhotoResponseBlock, FlowBuilderSidebarEditorContainer},
  template: PhotoResponseBlockTemplate,
}

// default photo-response block state
@Component(
    {
        ...BaseOptions,
    }
)
class CurrentClass1 extends BaseMountedVueClass {
  async created() {
    await this.baseMounted(BLOCK_TYPE, photoResponseBlockStore)
  }
}
export const Default = () => (CurrentClass1)

//ExistingDataPreFilled
@Component({
    ...BaseOptions,
})
class CurrentClass2 extends BaseMountedVueClass {
  async created() {
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, photoResponseBlockStore)

    this.setDescription(blockId)
  }
}
export const ExistingDataPreFilled = () => (CurrentClass2)

//NonStartingBlock
@Component(
    {
        ...BaseOptions,
    }
)
class CurrentClass3 extends BaseMountedVueClass {
  async created() {
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, photoResponseBlockStore)

    this.setDescription(blockId)
    await this.fakeCaseBlockAsFirstBlock(flowId)
  }
}
export const NonStartingBlock = () => (CurrentClass3)
