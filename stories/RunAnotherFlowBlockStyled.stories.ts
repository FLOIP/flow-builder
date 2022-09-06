import RunAnotherFlowBlock from '@/components/interaction-designer/block-types/Core_RunFlowBlock.vue'
import runAnotherFlowBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_RunFlowBlockStore'
import {Options} from 'vue-class-component'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {BaseMountedVueClass, IBaseOptions} from './story-utils/storeSetup'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'

export default {
  title: 'Core/Run Another Flow Block Styled',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
}

const RunAnotherFlowBlockTemplate = `
  <flow-builder-sidebar-editor-container :block="activeBlock">
    <run-another-flow-block
      :block="activeBlock"
      :flow="activeFlow"/>
  </flow-builder-sidebar-editor-container>
`
const BaseOptions: IBaseOptions = {
  components: {RunAnotherFlowBlock, FlowBuilderSidebarEditorContainer},
  template: RunAnotherFlowBlockTemplate,
}

// default state
@Options({
  ...BaseOptions,
})
class DefaultClass extends BaseMountedVueClass {
  async mounted() {
    await this.baseMounted(BLOCK_TYPE, runAnotherFlowBlockStore)
    const baseFlowId = this.activeFlow.uuid
    const flowOne = await this.flow_createWith({
      props: {uuid: await (new IdGeneratorUuidV4()).generate(), name: 'My other flow'},
    })
    await this.flow_add({flow: flowOne})
    const flowTwo = await this.flow_createWith({
      props: {uuid: await (new IdGeneratorUuidV4()).generate(), name: 'My third flow'},
    })
    await this.flow_add({flow: flowTwo})
    this.flow_setActiveFlowId({flowId: baseFlowId})
  }
}

export const Default = () => (DefaultClass)
