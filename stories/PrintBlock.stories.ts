import Vue from 'vue'
import Vuex from 'vuex'
import PrintBlock from '@/components/interaction-designer/block-types/ConsoleIO_PrintBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'
import {IRootState, store} from '@/store'
import printBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/ConsoleIO_PrintBlockStore'
import {
  BaseMountedVueClass,
  BaseMountedVueClassWithResourceAndMode,
} from './story-utils/storeSetup'
import {Component} from 'vue-property-decorator'

Vue.use(Vuex)

export default {
  title: 'ConsoleIo/Print Block',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
}

const PrintBlockTemplate = `
  <flow-builder-sidebar-editor-container :block="activeBlock">
    <print-block 
      :block="activeBlock" 
      :flow="activeFlow"/>
  </flow-builder-sidebar-editor-container>
`

const BaseOptions = {
  components: {PrintBlock, FlowBuilderSidebarEditorContainer},
  template: PrintBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
}

// default log block state
@Component<any>({
  ...BaseOptions,
  async mounted() {
    await this.baseMounted(BLOCK_TYPE, printBlockStore)
  },
})
class DefaultClass extends BaseMountedVueClass {}
export const Default = () => { 
  return DefaultClass
}

@Component<any>({
  ...BaseOptions,
    async mounted() {
      const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, printBlockStore)

      this.setDescription(blockId)
      this.setResourceData({
        shouldSetChoices: false,
        configPath: 'config.message'
      })
    },
  }
)
class ExistingDataBlockClass extends BaseMountedVueClassWithResourceAndMode {}
export const ExistingDataBlock = () => (ExistingDataBlockClass)

@Component<any>(
  {
    ...BaseOptions,
    async mounted() {
      const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, printBlockStore)

      this.setDescription(blockId)
      await this.fakeCaseBlockAsFirstBlock(flowId)
    },
  }
)
class NonStartingBlockClass extends BaseMountedVueClass {}
export const NonStartingBlock = () => (NonStartingBlockClass)
