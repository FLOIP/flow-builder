//TODO - storyshots currently don't seem to be working

import Vue from 'vue'
import Vuex from 'vuex'

import ReadBlock from '../block-types/ReadBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'

import {IRootState, store} from '../../stores'
import caseBlockStore, {BLOCK_TYPE as CASE_BLOCK_TYPE} from '../../stores/flow/block-types/Core_CaseBlockStore'
import readBlockStore, {BLOCK_TYPE} from '../../stores/flow/block-types/ConsoleIo_ReadBlockStore'

import stubbedFilters from './story-utils/stubbedFilters'
import { baseMounted, BaseMountedVueClass } from './story-utils/storeSetup'
import {Component} from 'vue-property-decorator'
import {namespace} from 'vuex-class'

Vue.filter('trans', stubbedFilters.trans)
Vue.use(Vuex)

const flowVuexNamespace = namespace('flow')
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
      const {block: {uuid: blockId}, flow: {uuid: flowId}} = await baseMounted.bind(this)(BLOCK_TYPE, readBlockStore)

      //TODO - support sending props to baseMounted?
      this.block_setName({blockId: blockId, value: "A Name"})
      this.block_setLabel({blockId: blockId, value: "A Label"})
      this.block_setSemanticLabel({blockId: blockId, value: "A Semantic Label"})
      this.setFormatString("%s lorem ipsum %d [...]")
    },
  }
)
class ExistingDataClass extends BaseMountedVueClass {
  @blockVuexNamespace.Action setFormatString!: void

  @flowVuexNamespace.Mutation block_setName!: void
  @flowVuexNamespace.Mutation block_setLabel!: void
  @flowVuexNamespace.Mutation block_setSemanticLabel!: void
}
export const ExistingDataBlock = () => (ExistingDataClass)

@Component<any>(
  {
    components: {ReadBlock, FlowBuilderSidebarEditorContainer},
    template: readBlockTemplate,
    store: new Vuex.Store<IRootState>(store),
    async mounted() {
      const {block: {uuid: blockId}, flow: {uuid: flowId}} = await baseMounted.bind(this)(BLOCK_TYPE, readBlockStore)

      this.block_setName({blockId: blockId, value: "A Name"})
      this.block_setLabel({blockId: blockId, value: "A Label"})
      this.block_setSemanticLabel({blockId: blockId, value: "A Semantic Label"})
      
      this.setFormatString("%s lorem ipsum %d [...]")

      // Fake a 1st block to make sure the current block won't be selected
      this.$store.registerModule(['flow', CASE_BLOCK_TYPE], caseBlockStore)
      const caseBlock = await this.flow_addBlankBlockByType({type: CASE_BLOCK_TYPE})
      const {uuid: caseBlockId} = caseBlock

      this.flow_setFirstBlockId({blockId: caseBlockId, flowId: flowId})
    },
  }
)
class ExistingDataNonStartingClass extends BaseMountedVueClass {
  @blockVuexNamespace.Action setFormatString!: void
  
  @flowVuexNamespace.Mutation block_setName!: void
  @flowVuexNamespace.Mutation block_setLabel!: void
  @flowVuexNamespace.Mutation block_setSemanticLabel!: void
  @flowVuexNamespace.Mutation flow_setFirstBlockId!: void
}
export const ExistingDataNonStartingBlock = () => (ExistingDataNonStartingClass)
