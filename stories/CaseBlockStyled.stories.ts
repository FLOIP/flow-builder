import Vue from 'vue'
import Vuex from 'vuex'
import {Component} from 'vue-property-decorator'

import CaseBlock from '@/components/interaction-designer/block-types/Core_CaseBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'

import {IRootState, store} from '@/store'
import caseBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_CaseBlockStore'

import { baseMounted, BaseMountedVueClass } from './story-utils/storeSetup'
import {namespace} from "vuex-class";
const flowVuexNamespace = namespace('flow')
const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)

Vue.use(Vuex)

export default {
  title: 'Core/Case Block Styled',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
}

const CaseBlockTemplate = `
  <flow-builder-sidebar-editor-container :block="activeBlock">
    <case-block 
      :block="activeBlock" 
      :flow="activeFlow"/>
  </flow-builder-sidebar-editor-container>
`

const BaseOptions = {
  components: {CaseBlock, FlowBuilderSidebarEditorContainer},
  template: CaseBlockTemplate,
}

// default case block state
@Component<any>({
  ...BaseOptions,
  store: new Vuex.Store<IRootState>(store),
  async mounted() {
    // @ts-ignore
    await baseMounted.bind(this)(BLOCK_TYPE, caseBlockStore)
  },
})
class DefaultClass extends BaseMountedVueClass {}
export const Default = () => (DefaultClass)

//ExistingDataBlock
@Component<any>({
  ...BaseOptions,
  store: new Vuex.Store<IRootState>(store),
  async mounted() {
    // @ts-ignore
    const { block } = await baseMounted.bind(this)(BLOCK_TYPE, caseBlockStore)
    const blockId = block.uuid

    this.block_setName({blockId: blockId, value: "A Name"})
    this.block_setLabel({blockId: blockId, value: "A Label"})
    this.block_setSemanticLabel({blockId: blockId, value: "A Semantic Label"})
    this.editCaseBlockExit({identifier: block.exits[0].uuid, value: "A expression"})
  }
})
class CurrentClass2 extends BaseMountedVueClass {
  @blockVuexNamespace.Action editCaseBlockExit:any
}
export const ExistingDataBlock = () => (CurrentClass2)
