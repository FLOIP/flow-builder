<template>
  <div class="core-set-contact-property-block">
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

      <contact-property-editor :block="block" />

      <hr>
      <block-output-branching-config
        :block="block"
        :has-exit-per-choice="false"
        @branchingTypeChangedToUnified="handleBranchingTypeChangedToUnified({block})" />

      <categorization :block="block" />

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
import {IBlock, IFlow} from '@floip/flow-runner'
import ContactPropertyEditor from '@/components/interaction-designer/block-editors/ContactPropertyEditor.vue'
import SetContactPropertyStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_SetContactPropertyStore'
import Lang from '@/lib/filters/lang'
import Categorization from '@/components/interaction-designer/block-editors/Categorization.vue'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import {mixins} from 'vue-class-component'
import BlockOutputBranchingConfig from '@/components/interaction-designer/block-editors/BlockOutputBranchingConfig.vue'
import BlockId from '../block-editors/BlockId.vue'
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
import BlockLabelEditor from '../block-editors/LabelEditor.vue'
import BlockNameEditor from '../block-editors/NameEditor.vue'

const builderVuexNamespace = namespace('builder')
const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)

@Component({
  components: {
    BlockNameEditor,
    BlockLabelEditor,
    BlockSemanticLabelEditor,
    FirstBlockEditorButton,
    BlockId,
    ContactPropertyEditor,
    Categorization,
    BlockOutputBranchingConfig,
  },
})
class Core_SetContactPropertyBlock extends mixins(Lang) {
  @Prop() readonly block!: IBlock
  @Prop() readonly flow!: IFlow

  showSemanticLabel = false

  @builderVuexNamespace.Getter isEditable !: boolean
  @blockVuexNamespace.Action handleBranchingTypeChangedToUnified!: ({block}: {block: IBlock}) => void
}

export default Core_SetContactPropertyBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, SetContactPropertyStore)
</script>
