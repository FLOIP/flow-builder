import Component from 'vue-class-component'
import CaseBlock from '@/components/interaction-designer/block-types/Core_CaseBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'
import caseBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_CaseBlockStore'
import {BaseMountedVueClass, IBaseOptions} from './story-utils/storeSetup'
import {namespace} from "vuex-class";
const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)

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

const BaseOptions: IBaseOptions = {
  components: {CaseBlock, FlowBuilderSidebarEditorContainer},
  template: CaseBlockTemplate,
}

// default case block state
@Component({
  ...BaseOptions,
})
class DefaultClass extends BaseMountedVueClass {
  async created() {
    await this.baseMounted(BLOCK_TYPE, caseBlockStore)
  }
}
export const Default = () => (DefaultClass)

//ExistingDataBlock
@Component({
  ...BaseOptions,
})
class CurrentClass2 extends BaseMountedVueClass {
  async created() {
    const { block } = await this.baseMounted(BLOCK_TYPE, caseBlockStore)
    const blockId = block.uuid

    this.setDescription(blockId)
    this.editCaseBlockExit({identifier: block.exits[0].uuid, value: "A expression"})
  }

  @blockVuexNamespace.Action editCaseBlockExit:any
}
export const ExistingDataBlock = () => (CurrentClass2)
