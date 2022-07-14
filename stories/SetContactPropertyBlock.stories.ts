import Vue from 'vue'
import Vuex from 'vuex'

import SetContactPropertyBlock from '@/components/interaction-designer/block-types/Core_SetContactPropertyBlock.vue'

import {IRootState, store} from '@/store'
import SetContactPropertyStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_SetContactPropertyStore'
import {Component} from 'vue-property-decorator'
import {Mutation, namespace} from 'vuex-class'
import {BaseMountedVueClass} from './story-utils/storeSetup'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'

Vue.use(Vuex)

const flowVuexNamespace = namespace('flow')

export default {
  title: 'Core/Set Contact Property',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
}

const SetContactPropertyBlockTemplate = `
  <flow-builder-sidebar-editor-container :block="activeBlock">
    <set-contact-property-block
      :block="activeBlock"
      :flow="activeFlow"/>
  </flow-builder-sidebar-editor-container>
`

const baseOptions = {
  components: {SetContactPropertyBlock, FlowBuilderSidebarEditorContainer},
  template: SetContactPropertyBlockTemplate,
}

// default state
@Component<any>({
  ...baseOptions,
  store: new Vuex.Store<IRootState>(store),
})
class DefaultClass extends BaseMountedVueClass {
  async mounted() {
    await this.baseMounted(BLOCK_TYPE, SetContactPropertyStore)
  }
}

export const Default = () => (DefaultClass)

@Component<any>({
  ...baseOptions,
  store: new Vuex.Store<IRootState>(store),
})
class ExistingDataBlockClass extends BaseMountedVueClass {
  async mounted() {
    const {block} = await this.baseMounted(BLOCK_TYPE, SetContactPropertyStore)
    const blockId = block.uuid

    this.setDescription(blockId)
    this.block_setContactPropertyKeyOnIndex({blockId, index: 0, propertyKey: 'gender'})
    this.block_setContactPropertyValueOnIndex({blockId, index: 0, propertyValue: 'M'})
    this.setTags(blockId)
  }
  @flowVuexNamespace.Action block_setContactPropertyKeyOnIndex!: (
    {index, blockId, propertyKey}: { index: number, blockId: string, propertyKey: string },
  ) => void
  @flowVuexNamespace.Action block_setContactPropertyValueOnIndex!: (
    {index, blockId, propertyValue}: { index: number, blockId: string, propertyValue: string },
  ) => void
}

export const ExistingDataBlock = () => (ExistingDataBlockClass)

@Component<any>({
  ...baseOptions,
  store: new Vuex.Store<IRootState>(store),
})
class ClearActionClass extends BaseMountedVueClass {
  async mounted() {
    const {block} = await this.baseMounted(BLOCK_TYPE, SetContactPropertyStore)
    const blockId = block.uuid

    this.setDescription(blockId)
    this.block_setContactPropertyKeyOnIndex({blockId, index: 0, propertyKey: 'gender'})
    this.block_setContactPropertyValueOnIndex({blockId, index: 0, propertyValue: '@(null)'})
  }

  @flowVuexNamespace.Action block_setContactPropertyKeyOnIndex!: (
    {index, blockId, propertyKey}: { index: number, blockId: string, propertyKey: string },
  ) => void
  @flowVuexNamespace.Action block_setContactPropertyValueOnIndex!: (
    {index, blockId, propertyValue}: { index: number, blockId: string, propertyValue: string },
  ) => void
}

export const ClearAction = () => (ClearActionClass)
