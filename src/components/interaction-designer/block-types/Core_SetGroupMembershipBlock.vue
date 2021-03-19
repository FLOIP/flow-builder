<template>
  <div class="core-set-group-membership-block">
    <h3 class="no-room-above">
      {{ 'flow-builder.edit-block-type' | trans({ block_type: trans(`flow-builder.${block.type}`) }) }}
    </h3>

    <block-name-editor :block="block"/>
    <block-label-editor :block="block"/>
    <block-semantic-label-editor :block="block"/>

    <div class="form-group">
      <label>{{'flow-builder.action-label' | trans}}</label>
      <vue-multiselect v-model="selectedAction"
                       track-by="id"
                       label="name"
                       :placeholder="'flow-builder.action-placeholder' | trans"
                       :options="actionsList"
                       :allow-empty="true"
                       :show-labels="false"
                       :searchable="false">
      </vue-multiselect>
    </div>

    <group-selector :block="block"/>

    <first-block-editor-button
        :flow="flow"
        :block-id="block.uuid"/>

    <block-id :block="block"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { namespace } from 'vuex-class'
import { Component, Prop } from 'vue-property-decorator'

import {
  IFlow,
  IBlock,
  ISetGroupMembershipBlockConfig,
} from '@floip/flow-runner'
import BlockNameEditor from '../block-editors/NameEditor.vue'
import BlockLabelEditor from '../block-editors/LabelEditor.vue'
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
import BlockId from '../block-editors/BlockId.vue'
import GroupSelector from '@/components/interaction-designer/block-editors/GroupSelector.vue'
import VueMultiselect from 'vue-multiselect'

import SetGroupMembershipStore, { BLOCK_TYPE, ADD_KEY, REMOVE_KEY } from '@/store/flow/block-types/Core_SetGroupMembershipStore'
import lang, { trans } from '@/lib/filters/lang'
import { createDefaultBlockTypeInstallerFor } from '@/store/builder'
import { find } from 'lodash'

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const flowVuexNamespace = namespace('flow')

interface IGroupOption {
  id: string;
  name: string;
}

//providing this generic is required by tsserver checking but not in the build run by yarn storybook
//TODO - understand what is going on here and if there is something more correct we should have instead
@Component<any>({
  components: {
    BlockNameEditor,
    BlockLabelEditor,
    BlockSemanticLabelEditor,
    FirstBlockEditorButton,
    BlockId,
    GroupSelector,
    VueMultiselect,
  },
  mixins: [lang],
})
class Core_SetGroupMembershipBlock extends Vue {
  @Prop() readonly block!: IBlock
  @Prop() readonly flow!: IFlow

  actionsList: IGroupOption[] = [
    {
      id: ADD_KEY,
      name: trans('flow-builder.add'),
    },
    {
      id: REMOVE_KEY,
      name: trans('flow-builder.remove'),
    },
  ]

  get selectedAction() {
    const { isMember } = this.block.config as ISetGroupMembershipBlockConfig
    //TODO: we can remove the safe cast JSON.parse(isMember) once ISetGroupMembershipBlockConfig isMember type is changed to boolean
    if (JSON.parse(isMember) === false) {
      return find(this.actionsList, { id: REMOVE_KEY }) || null
    }

    if (JSON.parse(isMember) === true) {
      return find(this.actionsList, { id: ADD_KEY }) || null
    }

    return null
  }

  set selectedAction(group: IGroupOption) {
    this.setIsMemberFromGroup(group)
  }

  @blockVuexNamespace.Action setIsMemberFromGroup: (group: IGroupOption) => Promise<any>

  @flowVuexNamespace.Mutation block_updateConfigByPath
}

export default Core_SetGroupMembershipBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, SetGroupMembershipStore)
</script>
