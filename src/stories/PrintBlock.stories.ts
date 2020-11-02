//TODO - storyshots currently don't seem to be working

import Vue from 'vue'
import Vuex from 'vuex'

import PrintBlock from '@/components/interaction-designer/block-types/ConsoleIO_PrintBlock.vue'
import FlowBuilderSidebarEditorContainer from '@/stories/story-utils/FlowBuilderSidebarEditorContainer.vue'

import {IRootState, store} from '@/store'
import caseBlockStore, {BLOCK_TYPE as CASE_BLOCK_TYPE} from '@/store/flow/block-types/Core_CaseBlockStore'
import printBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/ConsoleIO_PrintBlockStore'

import { baseMounted, BaseMountedVueClass } from '@/stories/story-utils/storeSetup'
import {IFlow, SupportedContentType, SupportedMode} from '@floip/flow-runner'
import {IResourceDefinitionVariantOverModesFilter} from '@/store/flow/resource'
import {get} from 'lodash'
import {namespace} from 'vuex-class'
import {Component} from 'vue-property-decorator'

Vue.use(Vuex)

const flowVuexNamespace = namespace('flow')

export default {
  title: 'ConsoleIo/Print Block',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
}

const PrintBlockTemplate = `
  <flow-builder-sidebar-editor-container :block="activeBlock">
    <print-block 
      :block="activeBlock" 
      :flow="activeFlow"/>
  </flow-builder-sidebar-editor-container>
`

// default log block state
@Component<any>({
  components: {PrintBlock, FlowBuilderSidebarEditorContainer},
  template: PrintBlockTemplate,
  store: new Vuex.Store<IRootState>(store),

  async mounted() {
    await baseMounted.bind(this)(BLOCK_TYPE, printBlockStore)
  },
})
class DefaultClass extends BaseMountedVueClass {}
export const Default = () => { 
  return DefaultClass
}

@Component<any>({
    components: {PrintBlock, FlowBuilderSidebarEditorContainer},
    template: PrintBlockTemplate,
    store: new Vuex.Store<IRootState>(store),
    async mounted() {
      const {block: {uuid: blockId}, flow: {uuid: flowId}} = await baseMounted.bind(this)(BLOCK_TYPE, printBlockStore)

      //TODO - support sending props to baseMounted?
      this.block_setName({blockId: blockId, value: "A Name"})
      this.block_setLabel({blockId: blockId, value: "A Label"})
      this.block_setSemanticLabel({blockId: blockId, value: "A Semantic Label"})

      // Set values on resource editor // TODO: find better way to do this once the resource editor is fully implemented
      const {
        languages: {
          0: {id: languageId}
        },
      }: IFlow = this.activeFlow
      const resourceId = get(this.activeBlock, `config.message`, '')

      const variantSms: IResourceDefinitionVariantOverModesFilter = {
        languageId,
        modes: [SupportedMode.SMS],
        // @ts-ignore: TODO: remove this ts-ignore once we find a way to match `contentType` type from /@floip/flow-runner/dist/domain/IResourceResolver.d.ts:IResourceDefinitionContentTypeSpecific interface
        contentType: [SupportedContentType.TEXT],
      }
      const variantUssd: IResourceDefinitionVariantOverModesFilter = {
        languageId,
        modes: [SupportedMode.USSD],
        // @ts-ignore: TODO: remove this ts-ignore once we find a way to match `contentType` type from /@floip/flow-runner/dist/domain/IResourceResolver.d.ts:IResourceDefinitionContentTypeSpecific interface
        contentType: [SupportedContentType.TEXT],
      }
      const variantIvr: IResourceDefinitionVariantOverModesFilter = {
        languageId,
        modes: [SupportedMode.IVR],
        // @ts-ignore: TODO: remove this ts-ignore once we find a way to match `contentType` type from /@floip/flow-runner/dist/domain/IResourceResolver.d.ts:IResourceDefinitionContentTypeSpecific interface
        contentType: [SupportedContentType.AUDIO],
      }
      // we're assuming this pseudo-variants exist
      this.resource_setValue({resourceId, filter: variantSms, value: "text for SMS"})
      this.resource_setValue({resourceId, filter: variantUssd, value: "text for USSD"})
      this.resource_setValue({resourceId, filter: variantIvr, value: "path/to/IVR audio.mp3"})
    },
  }
)
class ExistingDataBlockClass extends BaseMountedVueClass {
  @flowVuexNamespace.Mutation block_setName!: void
  @flowVuexNamespace.Mutation block_setLabel!: void
  @flowVuexNamespace.Mutation block_setSemanticLabel!: void
  @flowVuexNamespace.Mutation resource_setValue!: void
}
export const ExistingDataBlock = () => (ExistingDataBlockClass)

@Component<any>(
  {
    components: {PrintBlock, FlowBuilderSidebarEditorContainer},
    template: PrintBlockTemplate,
    store: new Vuex.Store<IRootState>(store),
    async mounted() {
      const {block: {uuid: blockId}, flow: {uuid: flowId}} = await baseMounted.bind(this)(BLOCK_TYPE, printBlockStore)

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
class NonStartingBlockClass extends BaseMountedVueClass {
  @flowVuexNamespace.Mutation block_setName!: void
  @flowVuexNamespace.Mutation block_setLabel!: void
  @flowVuexNamespace.Mutation block_setSemanticLabel!: void
  @flowVuexNamespace.Mutation flow_setFirstBlockId!: void
}
export const NonStartingBlock = () => (NonStartingBlockClass)
