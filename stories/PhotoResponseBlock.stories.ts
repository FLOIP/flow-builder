import Vue from 'vue'
import Vuex from 'vuex'

import PhotoResponseBlock from '@/components/interaction-designer/block-types/SmartDevices_PhotoResponseBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'

import {IRootState, store} from '@/store'
import caseBlockStore, {BLOCK_TYPE as CASE_BLOCK_TYPE} from '@/store/flow/block-types/Core_CaseBlockStore'
import photoResponseBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/SmartDevices_PhotoResponseBlockStore'

import {baseMounted, BaseMountedVueClass, safeRegisterBlockModule} from './story-utils/storeSetup'
import {Component} from 'vue-property-decorator'
import {namespace} from 'vuex-class'

Vue.use(Vuex)

const flowVuexNamespace = namespace('flow')

export default {
  title: 'SmartDevices/Photo Response Block',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
}

const PhotoResponseBlockTemplate = `
  <flow-builder-sidebar-editor-container :block="activeBlock">
    <photo-response-block 
      :block="activeBlock" 
      :flow="activeFlow"/>
  </flow-builder-sidebar-editor-container>
`

const BaseOptions = {
  components: {PhotoResponseBlock, FlowBuilderSidebarEditorContainer},
  template: PhotoResponseBlockTemplate,
}

// default photo-response block state
@Component<any>(
    {
        ...BaseOptions,
        store: new Vuex.Store<IRootState>(store),
        async mounted() {
          // @ts-ignore
            await baseMounted.bind(this)(BLOCK_TYPE, photoResponseBlockStore)
        },
    }
)
class CurrentClass1 extends BaseMountedVueClass {}
export const Default = () => (CurrentClass1)

//ExistingDataPreFilled
@Component<any>({
    ...BaseOptions,
    store: new Vuex.Store<IRootState>(store),
    async mounted() {
      // @ts-ignore
        const {block: {uuid: blockId}, flow: {uuid: flowId}} = await baseMounted.bind(this)(BLOCK_TYPE, photoResponseBlockStore)

        this.setDescription(blockId)
    },
})
class CurrentClass2 extends BaseMountedVueClass {
    setDescription(blockId: string) { // TODO: Find a wait to define this in BaseClass or other ParentClass without '_this.setDescription is not a function' error
        this.block_setName({blockId: blockId, value: "A Name"})
        this.block_setLabel({blockId: blockId, value: "A Label"})
        this.block_setSemanticLabel({blockId: blockId, value: "A Semantic Label"})
    }

    @flowVuexNamespace.Mutation block_setName:any
    @flowVuexNamespace.Mutation block_setLabel:any
    @flowVuexNamespace.Mutation block_setSemanticLabel:any
}
export const ExistingDataPreFilled = () => (CurrentClass2)

//NonStartingBlock
@Component<any>(
    {
        ...BaseOptions,
        store: new Vuex.Store<IRootState>(store),
        async mounted() {
          // @ts-ignore
            const {block: {uuid: blockId}, flow: {uuid: flowId}} = await baseMounted.bind(this)(BLOCK_TYPE, photoResponseBlockStore)

            this.block_setName({blockId: blockId, value: "A Name"})
            this.block_setLabel({blockId: blockId, value: "A Label"})
            this.block_setSemanticLabel({blockId: blockId, value: "A Semantic Label"})

            // Fake a 1st block to make sure the current block won't be selected
            // @ts-ignore
            await safeRegisterBlockModule.bind(this)(CASE_BLOCK_TYPE, caseBlockStore)
            const caseBlock = await this.flow_addBlankBlockByType({type: CASE_BLOCK_TYPE})
            const {uuid: caseBlockId} = caseBlock

            this.flow_setFirstBlockId({blockId: caseBlockId, flowId: flowId})
        },
    }
)
class CurrentClass3 extends BaseMountedVueClass {
    @flowVuexNamespace.Mutation block_setName:any
    @flowVuexNamespace.Mutation block_setLabel:any
    @flowVuexNamespace.Mutation block_setSemanticLabel:any
    @flowVuexNamespace.Mutation flow_setFirstBlockId:any
}
export const NonStartingBlock = () => (CurrentClass3)
