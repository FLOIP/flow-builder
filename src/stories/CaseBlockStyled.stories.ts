import Vue from 'vue'
import Vuex, {mapActions, mapGetters, mapMutations} from 'vuex'
import {Component} from 'vue-property-decorator'

import CaseBlock from '@/components/interaction-designer/block-types/Core_CaseBlock.vue'
import FlowBuilderSidebarEditorContainer from '@/stories/story-utils/FlowBuilderSidebarEditorContainer.vue'

import {IRootState, store} from '@/store'
import caseBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_CaseBlockStore'

import stubbedFilters from '@/stories/story-utils/stubbedFilters'
import { baseMounted, BaseMountedVueClass } from '@/stories/story-utils/storeSetup'

Vue.filter('trans', stubbedFilters.trans)
Vue.use(Vuex)

export default {
  title: 'Core/Case Block Styled',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
}

const CaseBlockTemplate = `
  <flow-builder-sidebar-editor-container :block="activeBlock">
    <case-block 
      :block="activeBlock" 
      :flow="activeFlow"/>
  </flow-builder-sidebar-editor-container>
`

// default case block state
@Component<any>({
  components: {CaseBlock, FlowBuilderSidebarEditorContainer},
  template: CaseBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
  async mounted() {
    await baseMounted.bind(this)(BLOCK_TYPE, caseBlockStore)
  },
})
class DefaultClass extends BaseMountedVueClass {}
export const Default = () => (DefaultClass)

export const ExistingDataBlock = () => ({
  components: {CaseBlock, FlowBuilderSidebarEditorContainer},
  template: CaseBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
  async mounted() {
    const { block } = await baseMounted.bind(this)(BLOCK_TYPE, caseBlockStore)
    const blockId = block.uuid

    // @ts-ignore - TS2339: Property 'block_setName' does not exist on type
    this.block_setName({blockId: blockId, value: "A Name"})
    // @ts-ignore - TS2339: Property 'block_setLabel' does not exist on type
    this.block_setLabel({blockId: blockId, value: "A Label"})
    // @ts-ignore - TS2339: Property 'block_setSemanticLabel' does not exist on type
    this.block_setSemanticLabel({blockId: blockId, value: "A Semantic Label"})
    // @ts-ignore - TS2339: Property 'editCaseBlockExit' does not exist on type
    this.editCaseBlockExit({identifier: block.exits[0].uuid, value: "A expression"})
  },

  computed: {
    ...mapGetters('flow', [
      'activeFlow',
    ]),
    ...mapGetters('builder', [
      'activeBlock',
    ]),
  },

  methods: {
    ...mapMutations('flow', [
      'block_setName',
      'block_setLabel',
      'block_setSemanticLabel',
    ]),
    ...mapMutations('builder', [
      'activateBlock',
    ]),
    ...mapActions('flow', [
      'flow_addBlankFlow',
      'flow_addBlankBlockByType']),
    ...mapActions(`flow/${BLOCK_TYPE}`, [
      'editCaseBlockExit'
    ]),
  }
})
