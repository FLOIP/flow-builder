import LogBlock from '@/components/interaction-designer/block-types/Core_LogBlock.vue'
import logBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_LogBlockStore'
import {BaseMountedVueClass, IBaseOptions} from './story-utils/storeSetup'
import PlainFlowBuilderBlockEditorContainer from './story-utils/PlainFlowBuilderBlockEditorContainer.vue'

import {Options} from 'vue-class-component'

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
@Options({
  ...BaseOptions,
})
class DefaultClass extends BaseMountedVueClass {
  async mounted() {
    await this.baseMounted(BLOCK_TYPE, logBlockStore)
  }
}

export const Default = () => (DefaultClass)

@Options({
  ...BaseOptions,
})
class CurrentClass2 extends BaseMountedVueClass {
  async mounted() {
    const {block: {uuid: blockId}} = await this.baseMounted(BLOCK_TYPE, logBlockStore)

    this.setDescription(blockId)
    this.setTags(blockId)
  }
}

export const ExistingDataBlock = () => (CurrentClass2)
