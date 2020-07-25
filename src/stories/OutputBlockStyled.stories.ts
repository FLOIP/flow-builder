import Vue from 'vue'
import Vuex, {mapActions, mapGetters, mapMutations} from 'vuex'

import OutputBlock from '@/components/interaction-designer/block-types/Core_OutputBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'

import stubbedFilters from './story-utils/stubbedFilters'
import { baseMounted } from './story-utils/storeSetup'

import {IRootState, store} from '@/store'
import outputBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_OutputBlockStore'

Vue.filter('trans', stubbedFilters.trans)
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

// default output block state
export const Default = () => ({
  components: {OutputBlock, FlowBuilderSidebarEditorContainer},
  template: OutputBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
  async mounted() {
    await baseMounted.bind(this)(BLOCK_TYPE, outputBlockStore)
  },
  computed: {
    ...mapGetters('flow', [
      'activeFlow',
      'activeBlock',
    ]),
  },
  methods: {
    ...mapMutations('flow', ['flow_activateBlock']),
    ...mapActions('flow', [
      'flow_addBlankFlow',
      'flow_addBlankBlockByType']),
  }
})
