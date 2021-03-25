import Vue from 'vue'
import Vuex from 'vuex'
import NumericResponseBlock from '@/components/interaction-designer/block-types/MobilePrimitives_NumericResponseBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'
import {IRootState, store} from '@/store'
import numericResponseBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_NumericResponseBlockStore'
import {SupportedMode} from '@floip/flow-runner'
import {
  BaseMountedVueClass,
  BaseMountedVueClassWithResourceAndMode,
} from './story-utils/storeSetup'
import {Component} from 'vue-property-decorator'
import {namespace} from 'vuex-class'

Vue.use(Vuex)

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)

export default {
  title: 'MobilePrimitives/Numeric Response Block',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
}

const NumericResponseBlockTemplate = `
  <flow-builder-sidebar-editor-container :block="activeBlock">
    <numeric-response-block 
      :block="activeBlock" 
      :flow="activeFlow"/>
  </flow-builder-sidebar-editor-container>
`

const BaseOptions = {
  components: {NumericResponseBlock, FlowBuilderSidebarEditorContainer},
  template: NumericResponseBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
}

// default numeric-response block state
@Component<any>(
    {
      ...BaseOptions,
      async mounted() {
        await this.baseMounted(BLOCK_TYPE, numericResponseBlockStore)
      },
    }
)
class CurrentClass1 extends BaseMountedVueClass {}
export const Default = () => (CurrentClass1)

// ExistingDataForAllModes
@Component<any>({
  ...BaseOptions,
  async mounted() {
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, numericResponseBlockStore)

    this.setDescription(blockId)
    this.setResourceData({
      shouldSetChoices: false,
      configPath: 'config.prompt'
    })
    this.setValidationMinimum({blockId, value:0})
    this.setValidationMaximum({blockId, value:99})
    this.setMaxDigits({blockId, value:2})
  },
})
class CurrentClass2 extends BaseMountedVueClassWithResourceAndMode {
  @blockVuexNamespace.Action setValidationMinimum:any
  @blockVuexNamespace.Action setValidationMaximum:any
  @blockVuexNamespace.Action setMaxDigits:any
}
export const ExistingDataForAllModes = () => (CurrentClass2)

// ExistingDataForIvrOnly
@Component<any>({
  ...BaseOptions,
  async mounted() {
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, numericResponseBlockStore)

    this.flow_setSupportedMode({flowId, value: SupportedMode.IVR})
    this.setValidationMinimum({blockId, value:0})
    this.setValidationMaximum({blockId, value:99})
    this.setMaxDigits({blockId, value:2})
    this.setDescription(blockId)
    this.setResourceData({
      shouldSetChoices: false,
      configPath: 'config.prompt'
    })
  },
})
class CurrentClass3 extends BaseMountedVueClassWithResourceAndMode {
  @blockVuexNamespace.Action setValidationMinimum:any
  @blockVuexNamespace.Action setValidationMaximum:any
  @blockVuexNamespace.Action setMaxDigits:any
}
export const ExistingDataForIvrOnly = () => (CurrentClass3)

//ExistingDataForTextOnly
@Component<any>({
  ...BaseOptions,
  async mounted() {
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, numericResponseBlockStore)

    this.flow_setSupportedMode({flowId, value: [SupportedMode.SMS, SupportedMode.USSD]})
    this.setValidationMinimum({blockId, value:0})
    this.setValidationMaximum({blockId, value:99})
    this.setDescription(blockId)
    this.setResourceData({
      shouldSetChoices: false,
      configPath: 'config.prompt'
    })
  },
})
class CurrentClass4 extends BaseMountedVueClassWithResourceAndMode {
  @blockVuexNamespace.Action setValidationMinimum:any
  @blockVuexNamespace.Action setValidationMaximum:any
}
export const ExistingDataForTextOnly = () => (CurrentClass4)

//NonStartingBlock
@Component<any>(
    {
      ...BaseOptions,
      async mounted() {
        const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, numericResponseBlockStore)

        this.setDescription(blockId)
        await this.fakeCaseBlockAsFirstBlock(flowId)
      },
    }
)
class CurrentClass5 extends BaseMountedVueClass {}
export const NonStartingBlock = () => (CurrentClass5)
