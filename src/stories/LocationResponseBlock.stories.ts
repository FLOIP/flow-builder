import Vue from 'vue'
import Vuex from 'vuex'

import LocationResponseBlock from '@/components/interaction-designer/block-types/SmartDevices_LocationResponseBlock.vue'
import FlowBuilderSidebarEditorContainer from '@/stories/story-utils/FlowBuilderSidebarEditorContainer.vue'

import {IRootState, store} from '@/store'
import caseBlockStore, {BLOCK_TYPE as CASE_BLOCK_TYPE} from '@/store/flow/block-types/Core_CaseBlockStore'
import locationResponseBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/SmartDevices_LocationResponseBlockStore'

import stubbedFilters from '@/stories/story-utils/stubbedFilters'
import { baseMounted } from '@/stories/story-utils/storeSetup'
import {Component} from 'vue-property-decorator'
import {namespace} from 'vuex-class'

Vue.filter('trans', stubbedFilters.trans)
Vue.use(Vuex)

const flowVuexNamespace = namespace('flow')
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
}

/**
 * Vue class used to gather required Getter, Mutation, Action for the BaseMounted binding
 */
class BaseClass extends Vue {
  @flowVuexNamespace.Getter activeBlock
  @flowVuexNamespace.Getter activeFlow

  @flowVuexNamespace.Mutation flow_activateBlock

  @flowVuexNamespace.Action flow_addBlankFlow
  @flowVuexNamespace.Action flow_addBlankBlockByType
}

// default location-response block state
export const Default = () => (
  @Component<any>(
    {
      ...BaseOptions,
      store: new Vuex.Store<IRootState>(store),
      async mounted() {
        await baseMounted.bind(this)(BLOCK_TYPE, locationResponseBlockStore)
      },
    }
  )
  class CurrentClass extends BaseClass {}
)

export const ExistingDataPreFilled = () => (
  @Component<any>({
    ...BaseOptions,
    store: new Vuex.Store<IRootState>(store),
    async mounted() {
      const {block: {uuid: blockId}, flow: {uuid: flowId}} = await baseMounted.bind(this)(BLOCK_TYPE, locationResponseBlockStore)

      this.setDescription(blockId)
      this.setAccuracyThreshold({blockId, value:10.3})
      this.setAccuracyTimeout({blockId, value:145})
    },
  })
  class CurrentClass extends BaseClass {

    setDescription(blockId) { // TODO: Find a wait to define this in BaseClass or other ParentClass without '_this.setDescription is not a function' error
      this.block_setName({blockId: blockId, value: "A Name"})
      this.block_setLabel({blockId: blockId, value: "A Label"})
      this.block_setSemanticLabel({blockId: blockId, value: "A Semantic Label"})
    }
    
    @blockVuexNamespace.Action setAccuracyThreshold
    @blockVuexNamespace.Action setAccuracyTimeout

    @flowVuexNamespace.Mutation block_setName
    @flowVuexNamespace.Mutation block_setLabel
    @flowVuexNamespace.Mutation block_setSemanticLabel
  }
)

export const NonStartingBlock = () => (
  @Component<any>(
    {
      ...BaseOptions,
      store: new Vuex.Store<IRootState>(store),
      async mounted() {
        const {block: {uuid: blockId}, flow: {uuid: flowId}} = await baseMounted.bind(this)(BLOCK_TYPE, locationResponseBlockStore)

        this.block_setName({blockId: blockId, value: "A Name"})
        this.block_setLabel({blockId: blockId, value: "A Label"})
        this.block_setSemanticLabel({blockId: blockId, value: "A Semantic Label"})

        // Fake a 1st block to make sure the current block won't be selected
        this.$store.registerModule(['flow', CASE_BLOCK_TYPE], caseBlockStore)
        const caseBlock = await this.flow_addBlankBlockByType({type: CASE_BLOCK_TYPE})
        const {uuid: caseBlockId} = caseBlock

        this.flow_setFirstBlockId({blockId: caseBlockId, flowId: flowId})
      },
    }
  )
  class CurrentClass extends BaseClass {
    @flowVuexNamespace.Mutation block_setName
    @flowVuexNamespace.Mutation block_setLabel
    @flowVuexNamespace.Mutation block_setSemanticLabel
    @flowVuexNamespace.Mutation flow_setFirstBlockId
  }
)
