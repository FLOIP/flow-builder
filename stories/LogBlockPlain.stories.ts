import Vue from 'vue'
import Vuex, {mapActions, mapGetters, mapMutations} from 'vuex'
import {Component} from 'vue-property-decorator'

import LogBlock from '@/components/interaction-designer/block-types/Core_LogBlock.vue'
import PlainFlowBuilderBlockEditorContainer from './story-utils/PlainFlowBuilderBlockEditorContainer.vue'

import {IRootState, store} from '@/store'
import logBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_LogBlockStore'

import { baseMounted, BaseMountedVueClass } from './story-utils/storeSetup'

Vue.use(Vuex)

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

// default log block state
@Component<any>({
  components: {LogBlock, PlainFlowBuilderBlockEditorContainer},
  template: LogBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
  async mounted() {
    // @ts-ignore
    await baseMounted.bind(this)(BLOCK_TYPE, logBlockStore)
  },

})
class DefaultClass extends BaseMountedVueClass {}
export const Default = () => (DefaultClass)

export const ExistingDataBlock = () => ({
  components: {LogBlock, PlainFlowBuilderBlockEditorContainer},
  template: LogBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
  async mounted() {
    // @ts-ignore
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await baseMounted.bind(this)(BLOCK_TYPE, logBlockStore)

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
