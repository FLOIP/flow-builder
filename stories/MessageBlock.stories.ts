import MessageBlock from '@/components/interaction-designer/block-types/MobilePrimitives_MessageBlock.vue'
import messageBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_MessageBlockStore'

import {Component, Vue} from 'vue-property-decorator'
import Vuex from 'vuex'
import {IRootState, store} from '@/store'
import {BaseMountedVueClass, BaseMountedVueClassWithResourceAndMode, IBaseOptions} from './story-utils/storeSetup'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'

Vue.use(Vuex)

export default {
  title: 'MobilePrimitives/Message Block',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
}

const MessageBlockTemplate = `
  <flow-builder-sidebar-editor-container :block="activeBlock">
    <message-block
      :block="activeBlock"
      :flow="activeFlow"/>
  </flow-builder-sidebar-editor-container>
`
const BaseOptions: IBaseOptions = {
  components: {MessageBlock, FlowBuilderSidebarEditorContainer},
  template: MessageBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
}

@Component({
  ...BaseOptions,
})
class DefaultClass extends BaseMountedVueClass {
  async mounted() {
    await this.baseMounted(BLOCK_TYPE, messageBlockStore)
  }
}

// default log block state
export const Default = () => (DefaultClass)

@Component(
  {
    ...BaseOptions,
  },
)
class ExistingDataBlockClass extends BaseMountedVueClassWithResourceAndMode {
  async mounted() {
    const {block: {uuid: blockId}} = await this.baseMounted(BLOCK_TYPE, messageBlockStore)

    this.setDescription(blockId)
    this.setResourceData({
      shouldSetChoices: false,
      configPath: 'config.prompt',
    })
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
    const {flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, messageBlockStore)
    await this.fakeCaseBlockAsFirstBlock(flowId)
  }
}

export const NonStartingBlock = () => (NonStartingBlockClass)
