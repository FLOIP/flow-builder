<template>
  <div class="core-set-group-membership-block">
    <h3 class="no-room-above">
      {{ 'flow-builder.edit-block-type' | trans({ block_type: trans(`flow-builder.${block.type}`) }) }}
    </h3>

    <fieldset :disabled="!isEditable">
      <block-name-editor :block="block" />
      <block-label-editor :block="block" />
      <block-semantic-label-editor :block="block" />

      <validation-message :message-key="`block/${block.uuid}/config/is_member`" #input-control="{ isValid: isValid }">
        <div class="form-group">
          <label>{{'flow-builder.action-label' | trans}}</label>
          <vue-multiselect v-model="selectedAction"
                           track-by="id"
                           label="name"
                           :class="{invalid: isValid === false}"
                           :placeholder="'flow-builder.action-placeholder' | trans"
                           :options="actionsList"
                           :allow-empty="true"
                           :show-labels="false"
                           :searchable="false">
          </vue-multiselect>
        </div>
      </validation-message>

      <group-selector :block="block" />

      <slot name="extras"></slot>
      <first-block-editor-button
        :flow="flow"
        :block-id="block.uuid"/>

    </fieldset>

    <block-id :block="block"/>
  </div>
</template>

<script lang="ts">
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
import Lang from '@/lib/filters/lang'
import { createDefaultBlockTypeInstallerFor } from '@/store/builder'
import { find } from 'lodash'
import { mixins } from "vue-class-component";
import ValidationMessage from '@/components/common/ValidationMessage.vue';

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const flowVuexNamespace = namespace('flow')
const builderVuexNamespace = namespace('builder')

interface IGroupActionOption {
  id: string;
  name: string;
}

@Component({
  components: {
    BlockNameEditor,
    BlockLabelEditor,
    BlockSemanticLabelEditor,
    FirstBlockEditorButton,
    BlockId,
    GroupSelector,
    VueMultiselect,
    ValidationMessage
  },
})
class Core_SetGroupMembershipBlock extends mixins(Lang) {
  @Prop() readonly block!: IBlock
  @Prop() readonly flow!: IFlow

  actionsList: IGroupActionOption[] = [
    {
      id: ADD_KEY,
      name: this.trans('flow-builder.add'),
    },
    {
      id: REMOVE_KEY,
      name: this.trans('flow-builder.remove'),
    },
  ]

  get selectedAction() {
    const { is_member } = this.block.config as ISetGroupMembershipBlockConfig
    if (!is_member) {
      return find(this.actionsList, { id: REMOVE_KEY }) || {} as IGroupActionOption
    }

    if (is_member) {
      return find(this.actionsList, { id: ADD_KEY }) || {} as IGroupActionOption
    }

    return {} as IGroupActionOption
  }

  set selectedAction(action: IGroupActionOption) {
    this.setIsMember(action)
  }

  @blockVuexNamespace.Action setIsMember!: (action: IGroupActionOption) => Promise<any>

  @builderVuexNamespace.Getter isEditable!: boolean

  @flowVuexNamespace.Mutation block_updateConfigByPath!: ({ blockId, path, value }: { blockId: string, path: string, value: object | string }) => void
}

export default Core_SetGroupMembershipBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, SetGroupMembershipStore)
</script>

<style lang="css" scoped>
.invalid >>> .multiselect__tags {
  border-color: #dc3545;
}
</style>
