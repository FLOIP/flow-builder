import {Component} from 'vue-property-decorator'
import LogBlock from '@/components/interaction-designer/block-types/Core_LogBlock.vue'
import PlainFlowBuilderBlockEditorContainer from './story-utils/PlainFlowBuilderBlockEditorContainer.vue'
import logBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_LogBlockStore'
import {BaseMountedVueClass, IBaseOptions} from './story-utils/storeSetup'

export default {
  title: 'Core/Log Block Plain',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
}

const LogBlockTemplate = `
  <plain-flow-builder-block-editor-container :block="activeBlock">
    <log-block
      :block="activeBlock"
      :flow="activeFlow"/>
  </plain-flow-builder-block-editor-container>
`

const BaseOptions: IBaseOptions = {
  components: {LogBlock, PlainFlowBuilderBlockEditorContainer},
  template: LogBlockTemplate,
}

// default log block state
@Component({
  ...BaseOptions,
})
class DefaultClass extends BaseMountedVueClass {
  async created() {
    await this.baseMounted(BLOCK_TYPE, logBlockStore)
  }
}
export const Default = () => (DefaultClass)

@Component({
  ...BaseOptions,
})
class CurrentClass2 extends BaseMountedVueClass {
  async created() {
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, logBlockStore)

    this.setDescription(blockId)
  }
}
export const ExistingDataBlock = () => (CurrentClass2)
