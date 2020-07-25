import Vue from 'vue'
import Vuex, {mapActions, mapGetters, mapMutations} from 'vuex'
import RunFlowBlock from '@/components/interaction-designer/block-types/Core_RunFlowBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'

import stubbedFilters from './story-utils/stubbedFilters'
import { baseMounted } from './story-utils/storeSetup'

import {IRootState, store} from '@/store'
import RunFlowBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_RunFlowBlockStore'

Vue.filter('trans', stubbedFilters.trans)
Vue.use(Vuex)

import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'

export default {
  title: 'Core/Run Another Flow Block Styled',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
}

const RunFlowBlockTemplate = `
  <flow-builder-sidebar-editor-container :block="activeBlock">
    <run-another-flow-block 
      :block="activeBlock" 
      :flow="activeFlow"/>
  </flow-builder-sidebar-editor-container>
`

// default run another flow block state
export const Default = () => ({
  components: {RunFlowBlock, FlowBuilderSidebarEditorContainer},
  template: RunFlowBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
  async mounted() {
    await baseMounted.bind(this)(BLOCK_TYPE, RunFlowBlockStore)
    // @ts-ignore - TS2339: Property 'flow_createWith' does not exist on type
    const flowOne = await this.flow_createWith({
      props: {uuid: (new IdGeneratorUuidV4).generate(), name: 'My other flow'}})
    // @ts-ignore - TS2339: Property 'flow_addFlow' does not exist on type
    await this.flow_addFlow(flowOne)
    // @ts-ignore - TS2339: Property 'flow_createWith' does not exist on type
    const flowTwo = await this.flow_createWith({
      props: {uuid: (new IdGeneratorUuidV4).generate(), name: 'My third flow'}})
    // @ts-ignore - TS2339: Property 'flow_addFlow' does not exist on type
    await this.flow_addFlow(flowTwo)
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
      'flow_addFlow',
      'flow_createWith',
      'flow_addBlankBlockByType']),
  }
})
