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
@Component({
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

@Component({
  components: {LogBlock, PlainFlowBuilderBlockEditorContainer},
  template: LogBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
  async mounted() {
    // @ts-ignore
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await baseMounted.bind(this)(BLOCK_TYPE, logBlockStore)

    this.setDescription(blockId)
  },
})
class CurrentClass2 extends BaseMountedVueClass {}
export const ExistingDataBlock = () => (CurrentClass2)