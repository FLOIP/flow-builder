//TODO - storyshots currently don't seem to be working

import Vue from 'vue'
import Vuex, {mapActions, mapGetters, mapMutations} from 'vuex'

import LogBlock from '@/components/interaction-designer/block-types/Core_LogBlock.vue'
import FlowBuilderSidebarEditorContainer from '@/stories/story-utils/FlowBuilderSidebarEditorContainer.vue'

import {IRootState, store} from '@/store'
import caseBlockStore, {BLOCK_TYPE as CASE_BLOCK_TYPE} from '@/store/flow/block-types/Core_CaseBlockStore'
import logBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_LogBlockStore'

import stubbedFilters from '@/stories/story-utils/stubbedFilters'
import {baseMounted, BaseMountedVueClass} from '@/stories/story-utils/storeSetup'
import {Component} from "vue-property-decorator";

Vue.filter('trans', stubbedFilters.trans)
Vue.use(Vuex)

export default {
  title: 'Core/Log Block Styled',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
}

const LogBlockTemplate = `
  <flow-builder-sidebar-editor-container :block="activeBlock">
    <log-block 
      :block="activeBlock" 
      :flow="activeFlow"/>
  </flow-builder-sidebar-editor-container>
`

// default case block state
@Component<any>({
  components: {LogBlock, FlowBuilderSidebarEditorContainer},
  template: LogBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
  async mounted() {
    await baseMounted.bind(this)(BLOCK_TYPE, logBlockStore)
  },
})
class DefaultClass extends BaseMountedVueClass {}
export const Default = () => (DefaultClass)

export const ExistingDataBlock = () => ({
  components: {LogBlock, FlowBuilderSidebarEditorContainer},
  template: LogBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
  async mounted() {
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await baseMounted.bind(this)(BLOCK_TYPE, logBlockStore)

    //TODO - support sending props to baseMounted?
    // @ts-ignore - TS2339: Property 'block_setName' does not exist on type
    this.block_setName({blockId: blockId, value: "A Name"})
    // @ts-ignore - TS2339: Property 'block_setLabel' does not exist on type
    this.block_setLabel({blockId: blockId, value: "A Label"})
    // @ts-ignore - TS2339: Property 'block_setSemanticLabel' does not exist on type
    this.block_setSemanticLabel({blockId: blockId, value: "A Semantic Label"})
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
      'block_setSemanticLabel'
    ]),
    ...mapMutations('builder', [
      'activateBlock',
    ]),
    ...mapActions('flow', [
      'flow_addBlankFlow',
      'flow_addBlankBlockByType']),
  }
})

export const ExistingDataNonStartingBlock = () => ({
  components: {LogBlock, FlowBuilderSidebarEditorContainer},
  template: LogBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
  async mounted() {
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await baseMounted.bind(this)(BLOCK_TYPE, logBlockStore)

    // @ts-ignore - TS2339: Property 'block_setName' does not exist on type
    this.block_setName({blockId: blockId, value: "A Name"})
    // @ts-ignore - TS2339: Property 'block_setLabel' does not exist on type
    this.block_setLabel({blockId: blockId, value: "A Label"})
    // @ts-ignore - TS2339: Property 'block_setSemanticLabel' does not exist on type
    this.block_setSemanticLabel({blockId: blockId, value: "A Semantic Label"})

    // Fake a 1st block to make sure the current block won't be selected
    // @ts-ignore - TS2551: Property '$store' does not exist on type
    this.$store.registerModule(['flow', CASE_BLOCK_TYPE], caseBlockStore) 
    // @ts-ignore - TS2339: Property 'flow_addBlankBlockByType' does not exist on type
    const caseBlock = await this.flow_addBlankBlockByType({type: CASE_BLOCK_TYPE})
    const {uuid: caseBlockId} = caseBlock 
    
    // @ts-ignore - TS2339: Property 'block_setFirstBlockId' does not exist on type
    this.flow_setFirstBlockId({blockId: caseBlockId, flowId: flowId})
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
      'flow_setFirstBlockId'
    ]),
    ...mapMutations('builder', [
      'activateBlock',
    ]),
    ...mapActions('flow', [
      'flow_addBlankFlow',
      'flow_addBlankBlockByType']),
  }
})
