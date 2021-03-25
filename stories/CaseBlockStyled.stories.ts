import Vue from 'vue'
import Vuex from 'vuex'
// import {Component, Vue} from 'vue-property-decorator'
import Component from 'vue-class-component'

import CaseBlock from '@/components/interaction-designer/block-types/Core_CaseBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'

import {IRootState, store} from '@/store'
import caseBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_CaseBlockStore'

import { BaseMountedVueClass } from './story-utils/storeSetup'
import {namespace} from "vuex-class";
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
  store: new Vuex.Store<IRootState>(store),
}

// default case block state
@Component<any>({
  ...BaseOptions,
})
class DefaultClass extends BaseMountedVueClass {
  async mounted() {
    await this.baseMounted(BLOCK_TYPE, caseBlockStore)
  }
}
export const Default = () => (DefaultClass)

//ExistingDataBlock
@Component<any>({
  ...BaseOptions,
  async mounted() {
    const { block } = await this.baseMounted(BLOCK_TYPE, caseBlockStore)
    const blockId = block.uuid

    this.setDescription(blockId)
    this.editCaseBlockExit({identifier: block.exits[0].uuid, value: "A expression"})
  }
})
class CurrentClass2 extends BaseMountedVueClass {
  @blockVuexNamespace.Action editCaseBlockExit:any
}
export const ExistingDataBlock = () => (CurrentClass2)
