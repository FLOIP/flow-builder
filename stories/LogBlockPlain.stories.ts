import Vue from 'vue'
import Vuex from 'vuex'
import {Component} from 'vue-property-decorator'
import LogBlock from '@/components/interaction-designer/block-types/Core_LogBlock.vue'
import PlainFlowBuilderBlockEditorContainer from './story-utils/PlainFlowBuilderBlockEditorContainer.vue'
import {IRootState, store} from '@/store'
import logBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_LogBlockStore'
import { BaseMountedVueClass } from './story-utils/storeSetup'

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

const BaseOptions = {
  components: {LogBlock, PlainFlowBuilderBlockEditorContainer},
  template: LogBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
}

// default log block state
@Component<any>({
  ...BaseOptions,
  async mounted() {
    await this.baseMounted(BLOCK_TYPE, logBlockStore)
  },

})
class DefaultClass extends BaseMountedVueClass {}
export const Default = () => (DefaultClass)

@Component<any>({
  ...BaseOptions,
  async mounted() {
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, logBlockStore)

    this.setDescription(blockId)
  },
})
class CurrentClass2 extends BaseMountedVueClass {}
export const ExistingDataBlock = () => (CurrentClass2)