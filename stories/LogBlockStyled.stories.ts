import Vue from 'vue'
import Vuex from 'vuex'

import LogBlock from '@/components/interaction-designer/block-types/Core_LogBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'

import {IRootState, store} from '@/store'
import caseBlockStore, {BLOCK_TYPE as CASE_BLOCK_TYPE} from '@/store/flow/block-types/Core_CaseBlockStore'
import logBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_LogBlockStore'

import {baseMounted, BaseMountedVueClass, safeRegisterBlockModule} from './story-utils/storeSetup'
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

// default case block state
@Component({
  components: {LogBlock, FlowBuilderSidebarEditorContainer},
  template: LogBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
  async mounted() {
    // @ts-ignore
    await baseMounted.bind(this)(BLOCK_TYPE, logBlockStore)
  },
})
class DefaultClass extends BaseMountedVueClass {}
export const Default = () => (DefaultClass)

@Component({
  components: {LogBlock, FlowBuilderSidebarEditorContainer},
  template: LogBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
  async mounted() {
    // @ts-ignore
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await baseMounted.bind(this)(BLOCK_TYPE, logBlockStore)

    this.block_setName({blockId: blockId, value: "A Name"})
    this.block_setLabel({blockId: blockId, value: "A Label"})
    this.block_setSemanticLabel({blockId: blockId, value: "A Semantic Label"})
  },
})
class CurrentClass2 extends BaseMountedVueClass {}
export const ExistingDataBlock = () => (CurrentClass2)

@Component({
  components: {LogBlock, FlowBuilderSidebarEditorContainer},
  template: LogBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
  async mounted() {
    // @ts-ignore
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await baseMounted.bind(this)(BLOCK_TYPE, logBlockStore)

    this.setDescription(blockId)

    // Fake a 1st block to make sure the current block won't be selected
    // @ts-ignore
    await safeRegisterBlockModule.bind(this)(CASE_BLOCK_TYPE, caseBlockStore)

    const caseBlock = await this.flow_addBlankBlockByType({type: CASE_BLOCK_TYPE})
    const {uuid: caseBlockId} = caseBlock

    this.flow_setFirstBlockId({blockId: caseBlockId, flowId: flowId})
  },
})
class CurrentClass3 extends BaseMountedVueClass {}
export const ExistingDataNonStartingBlock = () => (CurrentClass3)
