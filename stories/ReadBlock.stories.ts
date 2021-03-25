import Vue from 'vue'
import Vuex from 'vuex'
import ReadBlock from '@/components/interaction-designer/block-types/ConsoleIO_ReadBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'
import {IRootState, store} from '@/store'
import readBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/ConsoleIO_ReadBlockStore'
import { BaseMountedVueClass} from './story-utils/storeSetup'
import {Component} from 'vue-property-decorator'
import {namespace} from 'vuex-class'

Vue.use(Vuex)

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)

export default {
  title: 'ConsoleIo/Read Block',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
}

const readBlockTemplate = `
  <flow-builder-sidebar-editor-container :block="activeBlock">
    <read-block 
      :block="activeBlock" 
      :flow="activeFlow"/>
  </flow-builder-sidebar-editor-container>
`

const BaseOptions = {
  components: {ReadBlock, FlowBuilderSidebarEditorContainer},
  template: readBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
}

// default log block state
@Component<any>(
  {
    ...BaseOptions,
    async mounted() {
      await this.baseMounted(BLOCK_TYPE, readBlockStore)
    },
  }
)
class DefaultClass extends BaseMountedVueClass {}
export const Default = () => (DefaultClass)

@Component<any>(
  {
    ...BaseOptions,
    async mounted() {
      const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, readBlockStore)

      this.setDescription(blockId)
      this.setFormatString("%s lorem ipsum %d [...]")
    },
  }
)
class ExistingDataClass extends BaseMountedVueClass {
  @blockVuexNamespace.Action setFormatString!: void
}
export const ExistingDataBlock = () => (ExistingDataClass)

@Component<any>(
  {
    ...BaseOptions,
    async mounted() {
      const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, readBlockStore)

      this.setDescription(blockId)
      this.setFormatString("%s lorem ipsum %d [...]")
      await this.fakeCaseBlockAsFirstBlock(flowId)
    },
  }
)
class ExistingDataNonStartingClass extends BaseMountedVueClass {
  @blockVuexNamespace.Action setFormatString!: void
}
export const ExistingDataNonStartingBlock = () => (ExistingDataNonStartingClass)
