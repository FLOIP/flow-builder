import LogBlock from '@/components/interaction-designer/block-types/Core_LogBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'
import logBlockStore, { BLOCK_CLASS_CONFIG } from '@/store/flow/block-types/Core_LogBlockStore'
import {BaseMountedVueClass, IBaseOptions} from './story-utils/storeSetup'
import {Component, Vue} from "vue-property-decorator";
import Vuex from "vuex";
import {IRootState, store} from "@/store";

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
const BaseOptions: IBaseOptions = {
  components: {LogBlock, FlowBuilderSidebarEditorContainer},
  template: LogBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
}

// default case block state
@Component({
  ...BaseOptions,
})
class DefaultClass extends BaseMountedVueClass {
  async mounted() {
    await this.baseMounted(BLOCK_CLASS_CONFIG.type, logBlockStore)
  }
}
export const Default = () => (DefaultClass)

@Component({
  ...BaseOptions,
})
class CurrentClass2 extends BaseMountedVueClass {
  async mounted() {
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_CLASS_CONFIG.type, logBlockStore)

    this.setDescription(blockId)
  }
}
export const ExistingDataBlock = () => (CurrentClass2)

@Component({
  ...BaseOptions,
})
class CurrentClass3 extends BaseMountedVueClass {
  async mounted() {
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_CLASS_CONFIG.type, logBlockStore)

    this.setDescription(blockId)
    await this.fakeCaseBlockAsFirstBlock(flowId)
  }
}
export const ExistingDataNonStartingBlock = () => (CurrentClass3)
