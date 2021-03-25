import Vue from 'vue'
import Vuex from 'vuex'
import PhotoResponseBlock from '@/components/interaction-designer/block-types/SmartDevices_PhotoResponseBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'
import {IRootState, store} from '@/store'
import photoResponseBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/SmartDevices_PhotoResponseBlockStore'
import { BaseMountedVueClass} from './story-utils/storeSetup'
import {Component} from 'vue-property-decorator'

Vue.use(Vuex)

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
  store: new Vuex.Store<IRootState>(store),
}

// default photo-response block state
@Component<any>(
    {
        ...BaseOptions,
        async mounted() {
          // @ts-ignore
            await this.baseMounted(BLOCK_TYPE, photoResponseBlockStore)
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
        const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, photoResponseBlockStore)

        this.setDescription(blockId)
    },
})
class CurrentClass2 extends BaseMountedVueClass {}
export const ExistingDataPreFilled = () => (CurrentClass2)

//NonStartingBlock
@Component<any>(
    {
        ...BaseOptions,
        async mounted() {
          // @ts-ignore
          const {block: {uuid: blockId}, flow: {uuid: flowId}} = await this.baseMounted(BLOCK_TYPE, photoResponseBlockStore)

          this.setDescription(blockId)
          await this.fakeCaseBlockAsFirstBlock(flowId)
        },
    }
)
class CurrentClass3 extends BaseMountedVueClass {}
export const NonStartingBlock = () => (CurrentClass3)
