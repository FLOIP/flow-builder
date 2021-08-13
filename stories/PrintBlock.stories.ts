import PrintBlock from '@/components/interaction-designer/block-types/ConsoleIO_PrintBlock.vue'
import printBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/ConsoleIO_PrintBlockStore'
import {Component, Vue} from 'vue-property-decorator'
import Vuex from 'vuex'
import {IRootState, store} from '@/store'
import {BaseMountedVueClass, BaseMountedVueClassWithResourceAndMode, IBaseOptions} from './story-utils/storeSetup'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'

export default {
  title: 'ConsoleIo/Print Block',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
}

Vue.use(Vuex)

const PrintBlockTemplate = `
  <flow-builder-sidebar-editor-container :block="activeBlock">
    <print-block
      :block="activeBlock"
      :flow="activeFlow"/>
  </flow-builder-sidebar-editor-container>
`

const BaseOptions: IBaseOptions = {
  components: {PrintBlock, FlowBuilderSidebarEditorContainer},
  template: PrintBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
}

// default state
@Component({
  ...BaseOptions,
})
class DefaultClass extends BaseMountedVueClass {
  async mounted() {
    await this.baseMounted(BLOCK_TYPE, printBlockStore)
  }
}

export const Default = () => DefaultClass

@Component({
  ...BaseOptions,
})
class ExistingDataBlockClass extends BaseMountedVueClassWithResourceAndMode {
  async mounted() {
    const {block: {uuid: blockId}} = await this.baseMounted(BLOCK_TYPE, printBlockStore)

    this.setDescription(blockId)
    this.setResourceData({
      shouldSetChoices: false,
      configPath: 'config.message',
    })
    this.setTags(blockId)
  }
}

export const ExistingDataBlock = () => (ExistingDataBlockClass)

@Component(
  {
    ...BaseOptions,
  },
)
class NonStartingBlockClass extends BaseMountedVueClass {
  async mounted() {
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, printBlockStore)

    this.setDescription(blockId)
    await this.fakeCaseBlockAsFirstBlock(flowId)
  }
}

export const NonStartingBlock = () => (NonStartingBlockClass)
