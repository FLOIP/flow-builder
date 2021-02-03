import Vue from 'vue'
import Vuex from 'vuex'
import RunAnotherFlowBlock from '@/components/interaction-designer/block-types/Core_RunFlowBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'
import {baseMounted, BaseMountedVueClass} from './story-utils/storeSetup'

import {IRootState, store} from '@/store'
import runAnotherFlowBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_RunFlowBlockStore'
import {Component} from "vue-property-decorator";
import {IFlow} from "@floip/flow-runner";
import {namespace} from 'vuex-class'
const flowVuexNamespace = namespace('flow')

Vue.use(Vuex)

import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'

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

// default log block state
@Component<any>({
  components: {RunAnotherFlowBlock, FlowBuilderSidebarEditorContainer},
  template: RunAnotherFlowBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
  async created() {
    // @ts-ignore
    await baseMounted.bind(this)(BLOCK_TYPE, runAnotherFlowBlockStore)
    // @ts-ignore - TS2339: Property 'flow_createWith' does not exist on type
    const flowOne = await this.flow_createWith({
      props: {uuid: (new IdGeneratorUuidV4).generate(), name: 'My other flow'}
    })
    // @ts-ignore - TS2339: Property 'flow_add' does not exist on type
    await this.flow_add({flow:flowOne})
    // @ts-ignore - TS2339: Property 'flow_createWith' does not exist on type
    const flowTwo = await this.flow_createWith({
      props: {uuid: (new IdGeneratorUuidV4).generate(), name: 'My third flow'}
    })
    // // @ts-ignore - TS2339: Property 'flow_add' does not exist on type
    await this.flow_add({flow:flowTwo})
  },
})
class DefaultClass extends BaseMountedVueClass {
  @flowVuexNamespace.Action flow_add!: Promise<IFlow>
  @flowVuexNamespace.Action flow_createWith!: Promise<IFlow>
}
export const Default = () => (DefaultClass)
