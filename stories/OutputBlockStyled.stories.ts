import Vue from 'vue'
import Vuex, {mapActions, mapGetters, mapMutations} from 'vuex'

import OutputBlock from '@/components/interaction-designer/block-types/Core_OutputBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'

import {baseMounted, BaseMountedVueClass} from './story-utils/storeSetup'

import {IRootState, store} from '@/store'
import outputBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_OutputBlockStore'
import {Component} from "vue-property-decorator";

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
// default state
@Component<any>({
  components: {OutputBlock, FlowBuilderSidebarEditorContainer},
  template: OutputBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
  async mounted() {
    // @ts-ignore
    await baseMounted.bind(this)(BLOCK_TYPE, outputBlockStore)
  },

})
class DefaultClass extends BaseMountedVueClass {}
export const Default = () => (DefaultClass)
