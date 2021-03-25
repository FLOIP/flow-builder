import Vue from 'vue'
import Vuex from 'vuex'
import {Component} from 'vue-property-decorator'

import { baseMounted, BaseMountedVueClass, BaseMountedVueClassWithResourceAndMode } from './story-utils/storeSetup'

Vue.use(Vuex)

import selectManyResponseBlock from '@/components/interaction-designer/block-types/MobilePrimitives_SelectManyResponseBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'
import {IRootState, store} from '@/store'
import selectManyStore, {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_SelectManyResponseBlockStore'

import {
  SupportedMode,
} from '@floip/flow-runner'

export default {
  component: selectManyResponseBlock,
  title: 'MobilePrimitives/selectManyResponseBlock',
  store: new Vuex.Store({}),
}

const SelectManyTemplate = `
    <flow-builder-sidebar-editor-container :block="activeBlock">
      <select-many-response-block
          :block="activeBlock"
          :flow="activeFlow"/>
    </flow-builder-sidebar-editor-container>
  `

@Component({
  template: SelectManyTemplate,
  
  components: {
    FlowBuilderSidebarEditorContainer,
    selectManyResponseBlock,
  },

  store: new Vuex.Store<IRootState>(store),

  async mounted() {
    // @ts-ignore
    await baseMounted.bind(this)(BLOCK_TYPE, selectManyStore)
  },
})
class InFlowBuilderClass extends BaseMountedVueClass {}

export const InFlowBuilder = () => {
  return InFlowBuilderClass
}

@Component({
  template: SelectManyTemplate,
  components: {
    FlowBuilderSidebarEditorContainer,
    selectManyResponseBlock,
  },

  store: new Vuex.Store<IRootState>(store),

  async mounted() {
    // @ts-ignore
    const {block, flow} = await baseMounted.bind(this)(BLOCK_TYPE, selectManyStore)
    flow.supportedModes = [SupportedMode.IVR]
  },

})
class IvrOnlyClass extends BaseMountedVueClass {}

export const IvrOnly = () => {
  return IvrOnlyClass
}
@Component({
  template: SelectManyTemplate,
  
  components: {
    FlowBuilderSidebarEditorContainer,
    selectManyResponseBlock,
  },

  store: new Vuex.Store<IRootState>(store),

  async mounted() {
    // @ts-ignore
    const {block, flow} = await baseMounted.bind(this)(BLOCK_TYPE, selectManyStore)
    flow.languages = [{id: '1', name: 'English'}, {id: '2', name: 'French'}] // mutation
  },

})
class MoreLanguagesClass extends BaseMountedVueClass {}

export const MoreLanguages = () => {
  return MoreLanguagesClass
}
@Component({
  template: SelectManyTemplate,
  
  components: {
    FlowBuilderSidebarEditorContainer,
    selectManyResponseBlock,
  },

  store: new Vuex.Store<IRootState>(store),

  async mounted() {
    // @ts-ignore
    const {block: {uuid: blockId}, flow} = await baseMounted.bind(this)(BLOCK_TYPE, selectManyStore)
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
