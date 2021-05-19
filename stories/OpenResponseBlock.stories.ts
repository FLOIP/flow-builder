import OpenResponseBlock from '@/components/interaction-designer/block-types/MobilePrimitives_OpenResponseBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'
import openResponseBlockStore, { BLOCK_CLASS_CONFIG } from '@/store/flow/block-types/MobilePrimitives_OpenResponseBlockStore'
import {SupportedMode} from '@floip/flow-runner'

import {
  BaseMountedVueClass,
  BaseMountedVueClassWithResourceAndMode, IBaseOptions,
} from './story-utils/storeSetup'
import {Component, Vue} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import Vuex from "vuex";
import {IRootState, store} from "@/store";

Vue.use(Vuex)

const blockVuexNamespace = namespace(`flow/${BLOCK_CLASS_CONFIG.type}`)

export default {
  title: 'MobilePrimitives/Open Response Block',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
}

const OpenResponseBlockTemplate = `
  <flow-builder-sidebar-editor-container :block="activeBlock">
    <open-response-block
      :block="activeBlock"
      :flow="activeFlow"/>
  </flow-builder-sidebar-editor-container>
`

const BaseOptions: IBaseOptions = {
  components: {OpenResponseBlock, FlowBuilderSidebarEditorContainer},
  template: OpenResponseBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
}

// default open-response block state
@Component(
    {
      ...BaseOptions,
    }
)
class CurrentClass1 extends BaseMountedVueClass {
  async mounted() {
    await this.baseMounted(BLOCK_CLASS_CONFIG.type, openResponseBlockStore)
  }
}
export const Default = () => (CurrentClass1)

//ExistingDataForAllModes
@Component({
  ...BaseOptions,
})
class CurrentClass2 extends BaseMountedVueClassWithResourceAndMode {
  async mounted() {
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_CLASS_CONFIG.type, openResponseBlockStore)

    this.setDescription(blockId)
    this.setResourceData({
      shouldSetChoices: false,
      configPath: 'config.prompt'
    })
    this.setMaxDurationSeconds(3*60)
    this.setMaxResponseCharacters(160)
  }

  @blockVuexNamespace.Action setMaxDurationSeconds:any
  @blockVuexNamespace.Action setMaxResponseCharacters:any
}
export const ExistingDataForAllModes = () => (CurrentClass2)

//ExistingDataForIvrOnly
@Component({
  ...BaseOptions,
})
class CurrentClass3 extends BaseMountedVueClassWithResourceAndMode {
  async mounted() {
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_CLASS_CONFIG.type, openResponseBlockStore)

    this.flow_setSupportedMode({flowId, value: SupportedMode.IVR})
    this.setMaxDurationSeconds(3*60)
    this.setDescription(blockId)
    this.setResourceData({
      shouldSetChoices: false,
      configPath: 'config.prompt'
    })
  }

  @blockVuexNamespace.Action setMaxDurationSeconds:any
}
export const ExistingDataForIvrOnly = () => (CurrentClass3)

//ExistingDataForTextOnly
@Component({
  ...BaseOptions,
})
class CurrentClass4 extends BaseMountedVueClassWithResourceAndMode {
  async mounted() {
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_CLASS_CONFIG.type, openResponseBlockStore)

    this.flow_setSupportedMode({flowId, value: [SupportedMode.SMS, SupportedMode.USSD]})
    this.setMaxResponseCharacters(160)
    this.setDescription(blockId)
    this.setResourceData({
      shouldSetChoices: false,
      configPath: 'config.prompt'
    })
  }

  @blockVuexNamespace.Action setMaxResponseCharacters:any
}
export const ExistingDataForTextOnly = () => (CurrentClass4)

//NonStartingBlock
@Component(
    {
      ...BaseOptions,
    }
)
class CurrentClass5 extends BaseMountedVueClass {
  async mounted() {
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_CLASS_CONFIG.type, openResponseBlockStore)

    this.setDescription(blockId)
    await this.fakeCaseBlockAsFirstBlock(flowId)
  }
}
export const NonStartingBlock = () => (CurrentClass5)
