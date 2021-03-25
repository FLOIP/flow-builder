import Vue from 'vue'
import Vuex from 'vuex'
import LogBlock from '@/components/interaction-designer/block-types/Core_LogBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'
import {IRootState, store} from '@/store'
import logBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_LogBlockStore'
import { BaseMountedVueClass} from './story-utils/storeSetup'
import {Component} from "vue-property-decorator";

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
const BaseOptions = {
  components: {LogBlock, FlowBuilderSidebarEditorContainer},
  template: LogBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
}

// default case block state
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

@Component<any>({
  ...BaseOptions,
  async mounted() {
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, logBlockStore)

    this.setDescription(blockId)
    await this.fakeCaseBlockAsFirstBlock(flowId)
  },
})
class CurrentClass3 extends BaseMountedVueClass {}
export const ExistingDataNonStartingBlock = () => (CurrentClass3)
