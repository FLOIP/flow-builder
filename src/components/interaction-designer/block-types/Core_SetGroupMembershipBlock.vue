<template>
  <div class="core-set-group-membership-block">
    <h3 class="block-editor-header">
      {{ `flow-builder.${block.type}` | trans }}
    </h3>

    <fieldset :disabled="!isEditable">
      <block-label-editor
        :block="block"
        @gearClicked="showSemanticLabel = !showSemanticLabel" />
      <block-semantic-label-editor
        v-if="showSemanticLabel"
        :block="block" />
      <block-name-editor :block="block" />

      <slot name="extras" />

      <group-membership-editor :block="block" />

      <hr>

      <block-output-branching-config
        :block="block"
        :has-exit-per-choice="false"
        @branchingTypeChangedToUnified="handleBranchingTypeChangedToUnified({block})" />

      <categorization :block="block" />

      <generic-contact-property-editor :block="block" />

      <hr>

      <first-block-editor-button
        :flow="flow"
        :block-id="block.uuid" />
    </fieldset>

    <block-id :block="block" />
  </div>
</template>

<script lang="ts">
import {namespace} from 'vuex-class'
import {Component, Prop} from 'vue-property-decorator'

import {IBlock, IFlow, ISetGroupMembershipBlockConfig} from '@floip/flow-runner'
import GroupSelector from '@/components/interaction-designer/block-editors/GroupSelector.vue'
import VueMultiselect from 'vue-multiselect'
import GroupMembershipEditor from '@/components/interaction-designer/block-editors/GroupMembershipEditor.vue'
import SetGroupMembershipStore, {ADD_KEY, BLOCK_TYPE, REMOVE_KEY} from '@/store/flow/block-types/Core_SetGroupMembershipStore'
import Lang from '@/lib/filters/lang'
import Categorization from '@/components/interaction-designer/block-editors/Categorization.vue'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import {find} from 'lodash'
import {mixins} from 'vue-class-component'
import ValidationMessage from '@/components/common/ValidationMessage.vue'
import BlockOutputBranchingConfig from '@/components/interaction-designer/block-editors/BlockOutputBranchingConfig.vue'
import BlockId from '../block-editors/BlockId.vue'
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
import BlockLabelEditor from '../block-editors/LabelEditor.vue'
import BlockNameEditor from '../block-editors/NameEditor.vue'
import GenericContactPropertyEditor from '../block-editors/GenericContactPropertyEditor.vue'

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const flowVuexNamespace = namespace('flow')
const builderVuexNamespace = namespace('builder')

interface IGroupActionOption {
  id: string,
  name: string,
}

@Component({
  components: {
    GenericContactPropertyEditor,
    BlockNameEditor,
    BlockLabelEditor,
    BlockSemanticLabelEditor,
    FirstBlockEditorButton,
    BlockId,
    GroupSelector,
    VueMultiselect,
    ValidationMessage,
    Categorization,
    GroupMembershipEditor,
    BlockOutputBranchingConfig,
  },
})
class Core_SetGroupMembershipBlock extends mixins(Lang) {
  @Prop() readonly block!: IBlock
  @Prop() readonly flow!: IFlow

  showSemanticLabel = false

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
    const {is_member} = this.block.config as ISetGroupMembershipBlockConfig
    if (!is_member) {
      return find(this.actionsList, {id: REMOVE_KEY}) || {} as IGroupActionOption
    }

    if (is_member) {
      return find(this.actionsList, {id: ADD_KEY}) || {} as IGroupActionOption
    }

    return {} as IGroupActionOption
  }

  set selectedAction(action: IGroupActionOption) {
    this.setIsMember(action)
  }

  @blockVuexNamespace.Action setIsMember!: (action: IGroupActionOption) => Promise<any>
  @blockVuexNamespace.Action handleBranchingTypeChangedToUnified!: ({block}: {block: IBlock}) => void
  @builderVuexNamespace.Getter isEditable!: boolean

  @flowVuexNamespace.Mutation block_updateConfigByPath!: ({
    blockId,
    path,
    value,
  }: { blockId: string, path: string, value: object | string }) => void
}

export default Core_SetGroupMembershipBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, SetGroupMembershipStore)
</script>

<style lang="css" scoped>
.invalid >>> .multiselect__tags {
  border-color: #dc3545;
}
</style>
