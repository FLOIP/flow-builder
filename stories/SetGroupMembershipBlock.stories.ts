import Vue from 'vue'
import Vuex from 'vuex'

import SetGroupMembershipBlock from '@/components/interaction-designer/block-types/Core_SetGroupMembershipBlock.vue'

import {IRootState, store} from '@/store'
import SetGroupMembershipStore, {BLOCK_TYPE, IGroupOption} from '@/store/flow/block-types/Core_SetGroupMembershipStore'
import {Component} from 'vue-property-decorator'
import {Mutation, namespace} from 'vuex-class'
import {BaseMountedVueClass} from './story-utils/storeSetup'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'
import {ConfigFieldType} from '@/store/flow/utils/vuexBlockAndFlowHelpers'

Vue.use(Vuex)

const flowVuexNamespace = namespace('flow')

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
const baseOptions = {
  components: {SetGroupMembershipBlock, FlowBuilderSidebarEditorContainer},
  template: SetGroupMembershipBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
}

// default state
@Component<any>({
  ...baseOptions,
  async mounted() {
    await this.baseMounted(BLOCK_TYPE, SetGroupMembershipStore)
  },

})
class DefaultClass extends BaseMountedVueClass {
}

export const Default = () => (DefaultClass)

@Component<any>({
  ...baseOptions,
})
class ExistingDataBlockClass extends BaseMountedVueClass {
  @Mutation addContactGroup!: ({group}: { group: any }) => void

  async mounted() {
    const {block: {uuid: blockId}} = await this.baseMounted(BLOCK_TYPE, SetGroupMembershipStore)

    this.setDescription(blockId)

    // Add group options from ui config
    const group1: IGroupOption = {
      id: '987',
      name: 'Group 1',
    }

    const group2: IGroupOption = {
      id: '988',
      name: 'Group 2',
    }

    this.addContactGroup({
      group: group1,
    })
    this.addContactGroup({
      group: group2,
    })

    // select "group 1" as the default group
    this.block_updateConfigByPath({
      blockId,
      path: 'groups[0].group_key',
      value: group1.id
    })
    this.block_updateConfigByPath({
      blockId,
      path: 'groups[0].group_name',
      value: group1.name
    })

    this.setTags(blockId)
  }

  @flowVuexNamespace.Mutation block_updateConfigByPath!: (
    {blockId, path, value}: {blockId: string, path: string, value: ConfigFieldType},
  ) => void
}

export const ExistingDataBlock = () => (ExistingDataBlockClass)
