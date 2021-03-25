import Vue from 'vue'
import Vuex from 'vuex'
import OpenResponseBlock from '@/components/interaction-designer/block-types/MobilePrimitives_OpenResponseBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'
import {IRootState, store} from '@/store'
import caseBlockStore, {BLOCK_TYPE as CASE_BLOCK_TYPE} from '@/store/flow/block-types/Core_CaseBlockStore'
import openResponseBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_OpenResponseBlockStore'
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

const BaseOptions = {
  components: {OpenResponseBlock, FlowBuilderSidebarEditorContainer},
  template: OpenResponseBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
}

// default open-response block state
@Component<any>(
    {
      ...BaseOptions,
      async mounted() {
        // @ts-ignore
        await this.baseMounted(BLOCK_TYPE, openResponseBlockStore)
      },
    }
)
class CurrentClass1 extends BaseMountedVueClass {}
export const Default = () => (CurrentClass1)

//ExistingDataForAllModes
@Component<any>({
  ...BaseOptions,
  async mounted() {
    // @ts-ignore
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, openResponseBlockStore)

    this.setDescription(blockId)
    this.setResourceData({
      shouldSetChoices: false,
      configPath: 'config.prompt'
    })
    this.setMaxDurationSeconds(3*60)
    this.setMaxResponseCharacters(160)
  },
})
class CurrentClass2 extends BaseMountedVueClassWithResourceAndMode {
  @blockVuexNamespace.Action setMaxDurationSeconds:any
  @blockVuexNamespace.Action setMaxResponseCharacters:any
}
export const ExistingDataForAllModes = () => (CurrentClass2)

//ExistingDataForIvrOnly
@Component<any>({
  ...BaseOptions,
  async mounted() {
    // @ts-ignore
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, openResponseBlockStore)

    this.flow_setSupportedMode({flowId, value: SupportedMode.IVR})
    this.setMaxDurationSeconds(3*60)
    this.setDescription(blockId)
    this.setResourceData({
      shouldSetChoices: false,
      configPath: 'config.prompt'
    })
  },
})
class CurrentClass3 extends BaseMountedVueClassWithResourceAndMode {
  @blockVuexNamespace.Action setMaxDurationSeconds:any
}
export const ExistingDataForIvrOnly = () => (CurrentClass3)

//ExistingDataForTextOnly
@Component<any>({
  ...BaseOptions,
  async mounted() {
    // @ts-ignore
    const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, openResponseBlockStore)

    this.flow_setSupportedMode({flowId, value: [SupportedMode.SMS, SupportedMode.USSD]})
    this.setMaxResponseCharacters(160)
    this.setDescription(blockId)
    this.setResourceData({
      shouldSetChoices: false,
      configPath: 'config.prompt'
    })
  },
})
class CurrentClass4 extends BaseMountedVueClassWithResourceAndMode {
  @blockVuexNamespace.Action setMaxResponseCharacters:any
}
export const ExistingDataForTextOnly = () => (CurrentClass4)

//NonStartingBlock
@Component<any>(
    {
      ...BaseOptions,
      async mounted() {
        // @ts-ignore
        const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, openResponseBlockStore)

        this.setDescription(blockId)

        // Fake a 1st block to make sure the current block won't be selected
        // @ts-ignore
        await this.safeRegisterBlockModule(CASE_BLOCK_TYPE, caseBlockStore)
        const caseBlock = await this.flow_addBlankBlockByType({type: CASE_BLOCK_TYPE})
        const {uuid: caseBlockId} = caseBlock

        this.flow_setFirstBlockId({blockId: caseBlockId, flowId: flowId})
      },
    }
)
class CurrentClass5 extends BaseMountedVueClass {}
export const NonStartingBlock = () => (CurrentClass5)
