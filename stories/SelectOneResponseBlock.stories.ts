import {Component} from 'vue-property-decorator'
import {
  BaseMountedVueClass,
  BaseMountedVueClassWithResourceAndMode,
  IBaseOptions
} from './story-utils/storeSetup'
import SelectOneResponseBlock from '@/components/interaction-designer/block-types/MobilePrimitives_SelectOneResponseBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'
import selectOneStore, {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_SelectOneResponseBlockStore'

import {
  SupportedMode,
} from '@floip/flow-runner'

export default {
  component: SelectOneResponseBlock,
  title: 'MobilePrimitives/SelectOneResponseBlock',
}

const SelectOneResponseBlockTemplate = `
    <flow-builder-sidebar-editor-container :block="activeBlock">
      <select-one-response-block
          :block="activeBlock"
          :flow="activeFlow"/>
    </flow-builder-sidebar-editor-container>
  `

const BaseOptions: IBaseOptions = {
  template: SelectOneResponseBlockTemplate,
  components: {
    FlowBuilderSidebarEditorContainer,
    SelectOneResponseBlock,
  },
}

@Component({
  ...BaseOptions,
})
class InFlowBuilderClass extends BaseMountedVueClass {
  async created() {
    await this.baseMounted(BLOCK_TYPE, selectOneStore)
  }
}
export const InFlowBuilder = () => InFlowBuilderClass

@Component({
  ...BaseOptions,
})
class IvrOnlyClass extends BaseMountedVueClass {
  async created() {
    const {block, flow} = await this.baseMounted(BLOCK_TYPE, selectOneStore)
    flow.supportedModes = [SupportedMode.IVR]
  }
}
export const IvrOnly = () => IvrOnlyClass

@Component({
  ...BaseOptions,
})
class MoreLanguagesClass extends BaseMountedVueClass {
  async created() {
    const {block, flow} = await this.baseMounted(BLOCK_TYPE, selectOneStore)
    flow.languages = [{id: '1', name: 'English'}, {id: '2', name: 'French'}] // mutation
  }
}
export const MoreLanguages = () => MoreLanguagesClass

@Component({
  ...BaseOptions,
})
class ExistingDataClass extends BaseMountedVueClassWithResourceAndMode {
  async created() {
    const {block: {uuid: blockId}, flow} = await this.baseMounted(BLOCK_TYPE, selectOneStore)
    this.setDescription(blockId)
    this.setResourceData({
      shouldSetChoices: true,
      configPath: 'config.prompt'
    })
  }
}
export const ExistingData = () => ExistingDataClass
