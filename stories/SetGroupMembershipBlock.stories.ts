import Vue from 'vue'
import Vuex, { mapActions, mapGetters, mapMutations } from 'vuex'

import SetGroupMembershipBlock from '@/components/interaction-designer/block-types/Core_SetGroupMembershipBlock.vue'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'

import { baseMounted, BaseMountedVueClass } from './story-utils/storeSetup'

import { IRootState, store } from '@/store'
import SetGroupMembershipStore, { BLOCK_TYPE } from '@/store/flow/block-types/Core_SetGroupMembershipStore'
import { Component } from "vue-property-decorator";

Vue.use(Vuex)

export default {
  title: 'Core/Set Group Membership',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
}

const SetGroupMembershipBlockTemplate = `
  <flow-builder-sidebar-editor-container :block="activeBlock">
    <set-group-membership-block 
      :block="activeBlock" 
      :flow="activeFlow"/>
  </flow-builder-sidebar-editor-container>
`
// default state
@Component<any>({
  components: {SetGroupMembershipBlock, FlowBuilderSidebarEditorContainer},
  template: SetGroupMembershipBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
  async mounted() {
    // @ts-ignore
    await baseMounted.bind(this)(BLOCK_TYPE, SetGroupMembershipStore)
  },

})
class DefaultClass extends BaseMountedVueClass {}
export const Default = () => (DefaultClass)
