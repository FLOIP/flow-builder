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
} from '@floip/flow-runner'
import BlockNameEditor from '../block-editors/NameEditor.vue'
import BlockLabelEditor from '../block-editors/LabelEditor.vue'
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
import BlockId from '../block-editors/BlockId.vue'
import GroupSelector from '@/components/interaction-designer/block-editors/GroupSelector.vue'
import VueMultiselect from 'vue-multiselect'

import SetGroupMembershipStore, { BLOCK_TYPE } from '@/store/flow/block-types/Core_SetGroupMembershipStore'
import lang from '@/lib/filters/lang'
import { createDefaultBlockTypeInstallerFor } from '@/store/builder'
import { find, get } from 'lodash'

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const flowVuexNamespace = namespace('flow')

const ADD_KEY = 'add'
const REMOVE_KEY = 'remove'

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
      // @ts-ignore: TODO: fix TS issue `Property 'trans' does not exist on type 'Core_SetGroupMembershipBlock'`
      name: this.trans('flow-builder.add'),
    },
    {
      id: REMOVE_KEY,
      // @ts-ignore: TODO: fix TS issue `Property 'trans' does not exist on type 'Core_SetGroupMembershipBlock'`
      name: this.trans('flow-builder.remove'),
    },
  ]

  get propertyValue(): string {
    return get(this.block, 'config.set_contact_property.property_value', '')
  }

  get selectedAction() {
    const isMember = get(this.block, 'config.isMember')
    if (isMember === false) {
      return find(this.actionsList, { id: REMOVE_KEY }) || null
    }

    if (isMember === true) {
      return find(this.actionsList, { id: ADD_KEY }) || null
    }

    return null
  }

  set selectedAction(value: IGroupOption) {
    this.block_updateConfigByPath({
      blockId: this.block.uuid,
      path: 'isMember',
      value: value === null || value === undefined ? null : (value.id === ADD_KEY),
    })
  }

  @flowVuexNamespace.Mutation block_updateConfigByPath
}

export default Core_SetGroupMembershipBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, SetGroupMembershipStore)
</script>
