import RunAnotherFlowBlock from '@/components/interaction-designer/block-types/Core_RunFlowBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'
import {BaseMountedVueClass, IBaseOptions} from './story-utils/storeSetup'
import runAnotherFlowBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_RunFlowBlockStore'
import {Component, Vue} from "vue-property-decorator";
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import Vuex from "vuex";
import {IRootState, store} from "@/store";

Vue.use(Vuex)

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
  store: new Vuex.Store<IRootState>(store),
}

// default log block state
@Component({
  ...BaseOptions,
})
class DefaultClass extends BaseMountedVueClass {
  async mounted() {
    await this.baseMounted(BLOCK_TYPE, runAnotherFlowBlockStore)
    const baseFlowId = this.activeFlow.uuid
    const flowOne = await this.flow_createWith({
      props: {uuid: (new IdGeneratorUuidV4()).generate(), name: 'My other flow'}
    })
    await this.flow_add({flow:flowOne})
    const flowTwo = await this.flow_createWith({
      props: {uuid: (new IdGeneratorUuidV4()).generate(), name: 'My third flow'}
    })
    await this.flow_add({flow:flowTwo})
    this.flow_setActiveFlowId({flowId: baseFlowId})
  }

  @flowVuexNamespace.Mutation flow_setActiveFlowId!: ({ flowId }: { flowId: IFlow['uuid'] }) void
}
export const Default = () => (DefaultClass)
