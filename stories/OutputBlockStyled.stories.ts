import OutputBlock from '@/components/interaction-designer/block-types/Core_OutputBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'
import {BaseMountedVueClass, IBaseOptions} from './story-utils/storeSetup'
import outputBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_OutputBlockStore'
import {Component, Vue} from "vue-property-decorator";
import Vuex from "vuex";
import {IRootState, store} from "@/store";

Vue.use(Vuex)

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
  store: new Vuex.Store<IRootState>(store),
}

// default state
@Component({
  ...BaseOptions,
})
class DefaultClass extends BaseMountedVueClass {
  async mounted() {
    await this.baseMounted(BLOCK_TYPE, outputBlockStore)
  }
}
export const Default = () => (DefaultClass)
