import OutputBlock from '@/components/interaction-designer/block-types/Core_OutputBlock.vue'
import outputBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_OutputBlockStore'
import {Options} from 'vue-class-component'
import {BaseMountedVueClass, IBaseOptions} from './story-utils/storeSetup'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'

export default {
  title: 'Core/Output Block Styled',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
}

const OutputBlockTemplate = `
  <flow-builder-sidebar-editor-container :block="activeBlock">
    <output-block
      :block="activeBlock"
      :flow="activeFlow"/>
  </flow-builder-sidebar-editor-container>
`

const BaseOptions: IBaseOptions = {
  components: {OutputBlock, FlowBuilderSidebarEditorContainer},
  template: OutputBlockTemplate,
}

// default state
@Options({
  ...BaseOptions,
})
class DefaultClass extends BaseMountedVueClass {
  async mounted() {
    await this.baseMounted(BLOCK_TYPE, outputBlockStore)
  }
}

export const Default = () => (DefaultClass)
