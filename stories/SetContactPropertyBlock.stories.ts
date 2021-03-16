import Vue from 'vue'
import Vuex, {mapActions, mapGetters, mapMutations} from 'vuex'

import SetContactPropertyBlock from '@/components/interaction-designer/block-types/Core_SetContactPropertyBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'

import {baseMounted, BaseMountedVueClass} from './story-utils/storeSetup'

import {IRootState, store} from '@/store'
import SetContactPropertyStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_SetContactPropertyStore'
import {Component} from "vue-property-decorator";

Vue.use(Vuex)

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
// default state
@Component<any>({
  components: {SetContactPropertyBlock, FlowBuilderSidebarEditorContainer},
  template: SetContactPropertyBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
  async mounted() {
    // @ts-ignore
    await baseMounted.bind(this)(BLOCK_TYPE, SetContactPropertyStore)
  },

})
class DefaultClass extends BaseMountedVueClass {}
export const Default = () => (DefaultClass)
