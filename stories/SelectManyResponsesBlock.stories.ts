import {Component, Vue} from 'vue-property-decorator'
import {
  BaseMountedVueClass,
  BaseMountedVueClassWithResourceAndMode,
  IBaseOptions
} from './story-utils/storeSetup'
import selectManyResponseBlock from '@/components/interaction-designer/block-types/MobilePrimitives_SelectManyResponseBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'
import selectManyStore, { BLOCK_CLASS_CONFIG } from '@/store/flow/block-types/MobilePrimitives_SelectManyResponseBlockStore'

import {
  SupportedMode,
} from '@floip/flow-runner'
import Vuex from "vuex";
import {IRootState, store} from "@/store";

Vue.use(Vuex)

export default {
  component: selectManyResponseBlock,
  title: 'MobilePrimitives/selectManyResponseBlock',
}

const SelectManyTemplate = `
    <flow-builder-sidebar-editor-container :block="activeBlock">
      <select-many-response-block
          :block="activeBlock"
          :flow="activeFlow"/>
    </flow-builder-sidebar-editor-container>
  `

const BaseOptions: IBaseOptions = {
  components: {
    FlowBuilderSidebarEditorContainer,
    selectManyResponseBlock,
  },
  template: SelectManyTemplate,
  store: new Vuex.Store<IRootState>(store),
}

@Component({
  ...BaseOptions,
})
class InFlowBuilderClass extends BaseMountedVueClass {
  async mounted() {
    await this.baseMounted(BLOCK_CLASS_CONFIG.type, selectManyStore)
  }
}
export const InFlowBuilder = () => InFlowBuilderClass

@Component({
  ...BaseOptions,

})
class IvrOnlyClass extends BaseMountedVueClass {
  async mounted() {
    const {block, flow} = await this.baseMounted(BLOCK_CLASS_CONFIG.type, selectManyStore)
    flow.supported_modes = [SupportedMode.IVR]
  }
}
export const IvrOnly = () => IvrOnlyClass

@Component({
  ...BaseOptions,
})
class MoreLanguagesClass extends BaseMountedVueClass {
  async mounted() {
    const {block, flow} = await this.baseMounted(BLOCK_CLASS_CONFIG.type, selectManyStore)
    flow.languages = [{id: '1', label: 'English'}, {id: '2', label: 'French'}] // mutation
  }
}
export const MoreLanguages = () => MoreLanguagesClass

@Component({
  ...BaseOptions,

})
class ExistingDataClass extends BaseMountedVueClassWithResourceAndMode {
  async mounted() {
    const {block: {uuid: blockId}, flow} = await this.baseMounted(BLOCK_CLASS_CONFIG.type, selectManyStore)
    this.setDescription(blockId)
    this.setResourceData({
      shouldSetChoices: true,
      configPath: 'config.prompt'
    })
  }
}
export const ExistingData = () => ExistingDataClass
