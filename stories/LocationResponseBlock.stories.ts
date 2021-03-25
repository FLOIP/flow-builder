import Vue from 'vue'
import Vuex from 'vuex'
import LocationResponseBlock from '@/components/interaction-designer/block-types/SmartDevices_LocationResponseBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'
import {IRootState, store} from '@/store'
import caseBlockStore, {BLOCK_TYPE as CASE_BLOCK_TYPE} from '@/store/flow/block-types/Core_CaseBlockStore'
import locationResponseBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/SmartDevices_LocationResponseBlockStore'
import { BaseMountedVueClass} from './story-utils/storeSetup'
import {Component} from 'vue-property-decorator'
import {namespace} from 'vuex-class'

Vue.use(Vuex)

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)

export default {
  title: 'SmartDevices/Location Response Block',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
}

const LocationResponseBlockTemplate = `
  <flow-builder-sidebar-editor-container :block="activeBlock">
    <location-response-block 
      :block="activeBlock" 
      :flow="activeFlow"/>
  </flow-builder-sidebar-editor-container>
`

const BaseOptions = {
  components: {LocationResponseBlock, FlowBuilderSidebarEditorContainer},
  template: LocationResponseBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
}

// default location-response block state
@Component<any>(
    {
        ...BaseOptions,
        async mounted() {
          // @ts-ignore
            await this.baseMounted(BLOCK_TYPE, locationResponseBlockStore)
        },
    }
)
class CurrentClass1 extends BaseMountedVueClass {}
export const Default = () => (CurrentClass1)

//ExistingDataPreFilled
@Component<any>({
    ...BaseOptions,
    async mounted() {
      // @ts-ignore
        const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, locationResponseBlockStore)

        this.setDescription(blockId)
        this.setAccuracyThreshold({blockId, value:10.3})
        this.setAccuracyTimeout({blockId, value:145})
    },
})
class CurrentClass2 extends BaseMountedVueClass {
    @blockVuexNamespace.Action setAccuracyThreshold:any
    @blockVuexNamespace.Action setAccuracyTimeout:any
}
export const ExistingDataPreFilled = () => (CurrentClass2)

//NonStartingBlock
@Component<any>(
    {
        ...BaseOptions,
        async mounted() {
          // @ts-ignore
            const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, locationResponseBlockStore)

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
class CurrentClass3 extends BaseMountedVueClass {}
export const NonStartingBlock = () => (CurrentClass3)
