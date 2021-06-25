import NumericResponseBlock from '@/components/interaction-designer/block-types/MobilePrimitives_NumericResponseBlock.vue'
import numericResponseBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_NumericResponseBlockStore'
import {SupportedMode} from '@floip/flow-runner'
import {Component, Vue} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import Vuex from 'vuex'
import {IRootState, store} from '@/store'
import {BaseMountedVueClass, BaseMountedVueClassWithResourceAndMode, IBaseOptions} from './story-utils/storeSetup'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'

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

const BaseOptions: IBaseOptions = {
  components: {NumericResponseBlock, FlowBuilderSidebarEditorContainer},
  template: NumericResponseBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
}

// default numeric-response block state
@Component(
  {
    ...BaseOptions,
  },
)
class CurrentClass1 extends BaseMountedVueClass {
  async mounted() {
    await this.baseMounted(BLOCK_TYPE, numericResponseBlockStore)
  }
}

export const Default = () => (CurrentClass1)

// ExistingDataForAllModes
@Component({
  ...BaseOptions,
})
class CurrentClass2 extends BaseMountedVueClassWithResourceAndMode {
  async mounted() {
    const {block: {uuid: blockId}} = await this.baseMounted(BLOCK_TYPE, numericResponseBlockStore)

    this.setDescription(blockId)
    this.setResourceData({
      shouldSetChoices: false,
      configPath: 'config.prompt',
    })
    this.setValidationMinimum({blockId, value: 0})
    this.setValidationMaximum({blockId, value: 99})
    this.setMaxDigits({blockId, value: 2})
  }

  @blockVuexNamespace.Action declare setValidationMinimum: any
  @blockVuexNamespace.Action declare setValidationMaximum: any
  @blockVuexNamespace.Action declare setMaxDigits: any
}

export const ExistingDataForAllModes = () => (CurrentClass2)

// ExistingDataForIvrOnly
@Component({
  ...BaseOptions,
})
class CurrentClass3 extends BaseMountedVueClassWithResourceAndMode {
  async mounted() {
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, numericResponseBlockStore)

    this.flow_setSupportedMode({flowId, value: SupportedMode.IVR})
    this.setValidationMinimum({blockId, value: 0})
    this.setValidationMaximum({blockId, value: 99})
    this.setMaxDigits({blockId, value: 2})
    this.setDescription(blockId)
    this.setResourceData({
      shouldSetChoices: false,
      configPath: 'config.prompt',
    })
  }

  @blockVuexNamespace.Action declare setValidationMinimum: any
  @blockVuexNamespace.Action declare setValidationMaximum: any
  @blockVuexNamespace.Action declare setMaxDigits: any
}

export const ExistingDataForIvrOnly = () => (CurrentClass3)

//ExistingDataForTextOnly
@Component({
  ...BaseOptions,
})
class CurrentClass4 extends BaseMountedVueClassWithResourceAndMode {
  async mounted() {
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, numericResponseBlockStore)

    this.flow_setSupportedMode({flowId, value: [SupportedMode.SMS, SupportedMode.USSD]})
    this.setValidationMinimum({blockId, value: 0})
    this.setValidationMaximum({blockId, value: 99})
    this.setDescription(blockId)
    this.setResourceData({
      shouldSetChoices: false,
      configPath: 'config.prompt',
    })
  }

  @blockVuexNamespace.Action declare setValidationMinimum: any
  @blockVuexNamespace.Action declare setValidationMaximum: any
}

export const ExistingDataForTextOnly = () => (CurrentClass4)

//NonStartingBlock
@Component(
  {
    ...BaseOptions,
  },
)
class CurrentClass5 extends BaseMountedVueClass {
  async mounted() {
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, numericResponseBlockStore)

    this.setDescription(blockId)
    await this.fakeCaseBlockAsFirstBlock(flowId)
  }
}

export const NonStartingBlock = () => (CurrentClass5)
