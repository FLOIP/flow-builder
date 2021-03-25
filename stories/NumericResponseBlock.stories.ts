import Vue from 'vue'
import Vuex from 'vuex'

import NumericResponseBlock from '@/components/interaction-designer/block-types/MobilePrimitives_NumericResponseBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'

import {IRootState, store} from '@/store'
import caseBlockStore, {BLOCK_TYPE as CASE_BLOCK_TYPE} from '@/store/flow/block-types/Core_CaseBlockStore'
import numericResponseBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_NumericResponseBlockStore'
import {SupportedMode, IFlow, SupportedContentType} from '@floip/flow-runner'
import {IResourceDefinitionVariantOverModesFilter} from '@/store/flow/resource'

import {
  baseMounted,
  BaseMountedVueClass,
  BaseMountedVueClassWithResourceAndMode,
  safeRegisterBlockModule
} from './story-utils/storeSetup'
import {Component} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import {get} from 'lodash'

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
}

// default numeric-response block state
@Component<any>(
    {
      ...BaseOptions,
      store: new Vuex.Store<IRootState>(store),
      async mounted() {
        // @ts-ignore
        await baseMounted.bind(this)(BLOCK_TYPE, numericResponseBlockStore)
      },
    }
)
class CurrentClass1 extends BaseMountedVueClass {}
export const Default = () => (CurrentClass1)

// ExistingDataForAllModes
@Component<any>({
  ...BaseOptions,
  store: new Vuex.Store<IRootState>(store),
  async mounted() {
    // @ts-ignore
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await baseMounted.bind(this)(BLOCK_TYPE, numericResponseBlockStore)

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
  store: new Vuex.Store<IRootState>(store),
  async mounted() {
    // @ts-ignore
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await baseMounted.bind(this)(BLOCK_TYPE, numericResponseBlockStore)

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
  store: new Vuex.Store<IRootState>(store),
  async mounted() {
    // @ts-ignore
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await baseMounted.bind(this)(BLOCK_TYPE, numericResponseBlockStore)

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
      store: new Vuex.Store<IRootState>(store),
      async mounted() {
        // @ts-ignore
        const {block: {uuid: blockId}, flow: {uuid: flowId}} = await baseMounted.bind(this)(BLOCK_TYPE, numericResponseBlockStore)

        this.setDescription(blockId)

        // Fake a 1st block to make sure the current block won't be selected
        // @ts-ignore
        await safeRegisterBlockModule.bind(this)(CASE_BLOCK_TYPE, caseBlockStore)
        const caseBlock = await this.flow_addBlankBlockByType({type: CASE_BLOCK_TYPE})
        const {uuid: caseBlockId} = caseBlock

        this.flow_setFirstBlockId({blockId: caseBlockId, flowId: flowId})
      },
    }
)
class CurrentClass5 extends BaseMountedVueClass {}
export const NonStartingBlock = () => (CurrentClass5)
