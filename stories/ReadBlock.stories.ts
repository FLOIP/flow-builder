import Vue from 'vue'
import Vuex from 'vuex'

import ReadBlock from '@/components/interaction-designer/block-types/ConsoleIO_ReadBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'

import {IRootState, store} from '@/store'
import caseBlockStore, {BLOCK_TYPE as CASE_BLOCK_TYPE} from '@/store/flow/block-types/Core_CaseBlockStore'
import readBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/ConsoleIO_ReadBlockStore'

import {baseMounted, BaseMountedVueClass, safeRegisterBlockModule} from './story-utils/storeSetup'
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

// default log block state
@Component<any>(
  {
    components: {ReadBlock, FlowBuilderSidebarEditorContainer},
    template: readBlockTemplate,
    store: new Vuex.Store<IRootState>(store),
    async mounted() {
      // @ts-ignore
      await baseMounted.bind(this)(BLOCK_TYPE, readBlockStore)
    },
  }
)
class DefaultClass extends BaseMountedVueClass {}
export const Default = () => (DefaultClass)

@Component<any>(
  {
    components: {ReadBlock, FlowBuilderSidebarEditorContainer},
    template: readBlockTemplate,
    store: new Vuex.Store<IRootState>(store),
    async mounted() {
      // @ts-ignore
      const {block: {uuid: blockId}, flow: {uuid: flowId}} = await baseMounted.bind(this)(BLOCK_TYPE, readBlockStore)

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
    components: {ReadBlock, FlowBuilderSidebarEditorContainer},
    template: readBlockTemplate,
    store: new Vuex.Store<IRootState>(store),
    async mounted() {
      // @ts-ignore
      const {block: {uuid: blockId}, flow: {uuid: flowId}} = await baseMounted.bind(this)(BLOCK_TYPE, readBlockStore)

      this.setDescription(blockId)
      this.setFormatString("%s lorem ipsum %d [...]")

      // Fake a 1st block to make sure the current block won't be selected
      // @ts-ignore
      await safeRegisterBlockModule.bind(this)(CASE_BLOCK_TYPE, caseBlockStore)
      const caseBlock = await this.flow_addBlankBlockByType({type: CASE_BLOCK_TYPE})
      const {uuid: caseBlockId} = caseBlock

      this.flow_setFirstBlockId({blockId: caseBlockId, flowId: flowId})
    },
  }
)
class ExistingDataNonStartingClass extends BaseMountedVueClass {
  @blockVuexNamespace.Action setFormatString!: void
}
export const ExistingDataNonStartingBlock = () => (ExistingDataNonStartingClass)
