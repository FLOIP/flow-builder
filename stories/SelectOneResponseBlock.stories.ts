import Vue from 'vue'
import Vuex from 'vuex'
import {Component} from 'vue-property-decorator'

import { baseMounted, BaseMountedVueClass, BaseMountedVueClassWithResourceAndMode } from './story-utils/storeSetup'

Vue.use(Vuex)

import SelectOneResponseBlock from '@/components/interaction-designer/block-types/MobilePrimitives_SelectOneResponseBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'
import {IRootState, store} from '@/store'
import selectOneStore, {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_SelectOneResponseBlockStore'


import {
  SupportedMode,
} from '@floip/flow-runner'

export default {
  component: SelectOneResponseBlock,
  title: 'MobilePrimitives/SelectOneResponseBlock',
  store: new Vuex.Store({}),
}

const SelectOneResponseBlockTemplate = `
    <flow-builder-sidebar-editor-container :block="activeBlock">
      <select-one-response-block
          :block="activeBlock"
          :flow="activeFlow"/>
    </flow-builder-sidebar-editor-container>
  `

@Component({
  template: SelectOneResponseBlockTemplate,
  components: {
    FlowBuilderSidebarEditorContainer,
    SelectOneResponseBlock,
  },

  store: new Vuex.Store<IRootState>(store),

  async mounted() {
    // @ts-ignore
    await this.baseMounted(BLOCK_TYPE, selectOneStore)
  },
})
class InFlowBuilderClass extends BaseMountedVueClass {}

export const InFlowBuilder = () => {
  return InFlowBuilderClass
}

@Component({
  template: SelectOneResponseBlockTemplate,
  
  components: {
    FlowBuilderSidebarEditorContainer,
    SelectOneResponseBlock,
  },

  store: new Vuex.Store<IRootState>(store),

  async mounted() {
    // @ts-ignore
    const {block, flow} = await this.baseMounted(BLOCK_TYPE, selectOneStore)
    flow.supportedModes = [SupportedMode.IVR]
  },

})
class IvrOnlyClass extends BaseMountedVueClass {}

export const IvrOnly = () => {
  return IvrOnlyClass
}
@Component({
  template: SelectOneResponseBlockTemplate,
  
  components: {
    FlowBuilderSidebarEditorContainer,
    SelectOneResponseBlock,
  },

  store: new Vuex.Store<IRootState>(store),

  async mounted() {
    // @ts-ignore
    const {block, flow} = await this.baseMounted(BLOCK_TYPE, selectOneStore)
    flow.languages = [{id: '1', name: 'English'}, {id: '2', name: 'French'}] // mutation
  },

})
class MoreLanguagesClass extends BaseMountedVueClass {}

export const MoreLanguages = () => {
  return MoreLanguagesClass
}
@Component({
  template: SelectOneResponseBlockTemplate,
  
  components: {
    FlowBuilderSidebarEditorContainer,
    SelectOneResponseBlock,
  },

  store: new Vuex.Store<IRootState>(store),

  async mounted() {
    // @ts-ignore
    const {block: {uuid: blockId}, flow} = await this.baseMounted(BLOCK_TYPE, selectOneStore)
    this.setDescription(blockId)
    this.setResourceData({
      shouldSetChoices: true,
      configPath: 'config.prompt'
    })
  },

})
class ExistingDataClass extends BaseMountedVueClassWithResourceAndMode {}

export const ExistingData = () => {
  return ExistingDataClass 
}
