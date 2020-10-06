import Vue from 'vue'
import Vuex, {mapActions, mapGetters, mapMutations} from 'vuex'
import {Component} from 'vue-property-decorator'

import stubbedFilters from '@/stories/story-utils/stubbedFilters'
import { baseMounted, BaseMountedVueClass } from '@/stories/story-utils/storeSetup'

Vue.filter('trans', stubbedFilters.trans)
Vue.use(Vuex)

import selectManyResponseBlock from '@/components/interaction-designer/block-types/MobilePrimitives_SelectManyResponseBlock.vue'
import FlowBuilderSidebarEditorContainer from '@/stories/story-utils/FlowBuilderSidebarEditorContainer.vue'
import {IRootState, store} from '@/store'
import selectManyStore, {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_SelectManyResponseBlockStore'
import {namespace} from 'vuex-class'
import {get} from 'lodash'

const flowVuexNamespace = namespace('flow')

import {
  SupportedMode,
  SupportedContentType,
  IFlow,
} from '@floip/flow-runner'
import {IResourceDefinitionVariantOverModesFilter} from '@/store/flow/resource'

export default {
  component: selectManyResponseBlock,
  title: 'MobilePrimitives/selectManyResponseBlock',
  store: new Vuex.Store({}),
}

@Component<any>({
  template: `
    <flow-builder-sidebar-editor-container :block="activeBlock">
      <select-many-responses-block
          :block="activeBlock"
          :flow="activeFlow"/>
    </flow-builder-sidebar-editor-container>
  `,
  
  components: {
    FlowBuilderSidebarEditorContainer,
    selectManyResponseBlock,
  },

  store: new Vuex.Store<IRootState>(store),

  async mounted() {
    await baseMounted.bind(this)(BLOCK_TYPE, selectManyStore)
  },
})
class InFlowBuilderClass extends BaseMountedVueClass {}

export const InFlowBuilder = () => {
  return InFlowBuilderClass
}

@Component<any>({
  template: `
    <flow-builder-sidebar-editor-container :block="activeBlock">
      <select-many-responses-block
          :block="activeBlock"
          :flow="activeFlow"/>
    </flow-builder-sidebar-editor-container>
  `,
  
  components: {
    FlowBuilderSidebarEditorContainer,
    selectManyResponseBlock,
  },

  store: new Vuex.Store<IRootState>(store),

  async mounted() {
    const {block, flow} = await baseMounted.bind(this)(BLOCK_TYPE, selectManyStore)
    flow.supportedModes = [SupportedMode.IVR]
  },

})
class IvrOnlyClass extends BaseMountedVueClass {}

export const IvrOnly = () => {
  return IvrOnlyClass
}
@Component<any>({
  template: `
    <flow-builder-sidebar-editor-container :block="activeBlock">
      <select-many-responses-block
          :block="activeBlock"
          :flow="activeFlow"/>
    </flow-builder-sidebar-editor-container>
  `,
  
  components: {
    FlowBuilderSidebarEditorContainer,
    selectManyResponseBlock,
  },

  store: new Vuex.Store<IRootState>(store),

  async mounted() {
    const {block, flow} = await baseMounted.bind(this)(BLOCK_TYPE, selectManyStore)
    flow.languages = [{id: '1', name: 'English'}, {id: '2', name: 'French'}] // mutation
  },

})
class MoreLanguagesClass extends BaseMountedVueClass {}

export const MoreLanguages = () => {
  return MoreLanguagesClass
}
@Component<any>({
  template: `
    <flow-builder-sidebar-editor-container :block="activeBlock">
      <select-many-responses-block
          :block="activeBlock"
          :flow="activeFlow"/>
    </flow-builder-sidebar-editor-container>
  `,
  
  components: {
    FlowBuilderSidebarEditorContainer,
    selectManyResponseBlock,
  },

  store: new Vuex.Store<IRootState>(store),

  async mounted() {
    const {block: {uuid: blockId}, flow} = await baseMounted.bind(this)(BLOCK_TYPE, selectManyStore)
    this.block_setName({blockId: blockId, value: "A Name"})
    this.block_setLabel({blockId: blockId, value: "A Label"})
    this.block_setSemanticLabel({blockId: blockId, value: "A Semantic Label"})
    // Set values on resource editor // TODO: find better way to do this once the resource editor is fully implemented
    const {
      languages: {
        0: {id: languageId}
      },
    }: IFlow = this.activeFlow
    const resourceId = get(this.activeBlock, `config.prompt`, '')
    const choiceResourceId = get(this.activeBlock, `config.choices.1`, '')

    const variantSms: IResourceDefinitionVariantOverModesFilter = {
      languageId,
      modes: [SupportedMode.SMS],
      contentType: SupportedContentType.TEXT,
    }
    const variantUssd: IResourceDefinitionVariantOverModesFilter = {
      languageId,
      modes: [SupportedMode.USSD],
      contentType: SupportedContentType.TEXT,
    }
    const variantIvr: IResourceDefinitionVariantOverModesFilter = {
      languageId,
      modes: [SupportedMode.IVR],
      contentType: SupportedContentType.TEXT,
    }
    // we're assuming this pseudo-variants exist
    this.resource_setValue({resourceId, filter: variantSms, value: "text for SMS"})
    this.resource_setValue({resourceId, filter: variantUssd, value: "text for USSD"})
    this.resource_setValue({resourceId, filter: variantIvr, value: "text for IVR"})

    this.resource_setValue({resourceId: choiceResourceId, filter: variantSms, value: "text for SMS"})
    this.resource_setValue({resourceId: choiceResourceId, filter: variantUssd, value: "text for USSD"})
    this.resource_setValue({resourceId: choiceResourceId, filter: variantIvr, value: "text for IVR"})
  },

})
class ExistingDataClass extends BaseMountedVueClass {
  @flowVuexNamespace.Mutation block_setName!: void
  @flowVuexNamespace.Mutation block_setLabel!: void
  @flowVuexNamespace.Mutation block_setSemanticLabel!: void
  @flowVuexNamespace.Mutation resource_setValue!: void
}

export const ExistingData = () => {
  return ExistingDataClass 
}
