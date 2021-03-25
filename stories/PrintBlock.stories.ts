import Vue from 'vue'
import Vuex from 'vuex'

import PrintBlock from '@/components/interaction-designer/block-types/ConsoleIO_PrintBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'

import {IRootState, store} from '@/store'
import caseBlockStore, {BLOCK_TYPE as CASE_BLOCK_TYPE} from '@/store/flow/block-types/Core_CaseBlockStore'
import printBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/ConsoleIO_PrintBlockStore'

import {
  baseMounted,
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

// default log block state
@Component({
  components: {PrintBlock, FlowBuilderSidebarEditorContainer},
  template: PrintBlockTemplate,
  store: new Vuex.Store<IRootState>(store),

  async mounted() {
    // @ts-ignore
    await baseMounted.bind(this)(BLOCK_TYPE, printBlockStore)
  },
})
class DefaultClass extends BaseMountedVueClass {}
export const Default = () => { 
  return DefaultClass
}

@Component({
    components: {PrintBlock, FlowBuilderSidebarEditorContainer},
    template: PrintBlockTemplate,
    store: new Vuex.Store<IRootState>(store),
    async mounted() {
      // @ts-ignore
      const {block: {uuid: blockId}, flow: {uuid: flowId}} = await baseMounted.bind(this)(BLOCK_TYPE, printBlockStore)

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

@Component(
  {
    components: {PrintBlock, FlowBuilderSidebarEditorContainer},
    template: PrintBlockTemplate,
    store: new Vuex.Store<IRootState>(store),
    async mounted() {
      // @ts-ignore
      const {block: {uuid: blockId}, flow: {uuid: flowId}} = await baseMounted.bind(this)(BLOCK_TYPE, printBlockStore)

      this.setDescription(blockId)

      // Fake a 1st block to make sure the current block won't be selected
      // @ts-ignore
      await this.safeRegisterBlockModule.bind(this)(CASE_BLOCK_TYPE, caseBlockStore)
      const caseBlock = await this.flow_addBlankBlockByType({type: CASE_BLOCK_TYPE})
      const {uuid: caseBlockId} = caseBlock

      this.flow_setFirstBlockId({blockId: caseBlockId, flowId: flowId})
    },
  }
)
class NonStartingBlockClass extends BaseMountedVueClass {}
export const NonStartingBlock = () => (NonStartingBlockClass)
