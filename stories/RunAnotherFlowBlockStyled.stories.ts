import Vue from 'vue'
import Vuex from 'vuex'
import RunAnotherFlowBlock from '@/components/interaction-designer/block-types/Core_RunFlowBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'
import { BaseMountedVueClass} from './story-utils/storeSetup'

import {IRootState, store} from '@/store'
import runAnotherFlowBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_RunFlowBlockStore'
import {Component} from "vue-property-decorator";

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
const BaseOptions = {
  components: {RunAnotherFlowBlock, FlowBuilderSidebarEditorContainer},
  template: RunAnotherFlowBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
}

// default log block state
@Component<any>({
  ...BaseOptions,
  async mounted() {
    await this.baseMounted(BLOCK_TYPE, runAnotherFlowBlockStore)
    const flowOne = await this.flow_createWith({
      props: {uuid: (new IdGeneratorUuidV4).generate(), name: 'My other flow'}
    })
    await this.flow_add({flow:flowOne})
    const flowTwo = await this.flow_createWith({
      props: {uuid: (new IdGeneratorUuidV4).generate(), name: 'My third flow'}
    })
    await this.flow_add({flow:flowTwo})
  },
})
class DefaultClass extends BaseMountedVueClass {}
export const Default = () => (DefaultClass)
