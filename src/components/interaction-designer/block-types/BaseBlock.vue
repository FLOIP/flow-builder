<template>
  <div>
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

      <slot
        v-if="usesDefaultBranchingEditor"
        name="branching">
        <block-output-branching-config
          :block="block"
          :has-exit-per-choice="false"
          @branchingTypeChangedToUnified="handleBranchingTypeChangedToUnified" />
      </slot>

      <categorization :block="block" />

      <slot
        v-if="usesDefaultContactPropsEditor"
        name="contact-props">
        <generic-contact-property-editor :block="block" />
      </slot>

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
import Lang from '@/lib/filters/lang'
import Categorization from '@/components/interaction-designer/block-editors/Categorization.vue'
import {mixins} from 'vue-class-component'
import BlockOutputBranchingConfig from '@/components/interaction-designer/block-editors/BlockOutputBranchingConfig.vue'
import BlockId from '../block-editors/BlockId.vue'
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
import BlockLabelEditor from '../block-editors/LabelEditor.vue'
import BlockNameEditor from '../block-editors/NameEditor.vue'
import GenericContactPropertyEditor from '../block-editors/GenericContactPropertyEditor.vue'

const builderVuexNamespace = namespace('builder')

@Component({
  components: {
    BlockNameEditor,
    BlockLabelEditor,
    BlockSemanticLabelEditor,
    FirstBlockEditorButton,
    BlockId,
    Categorization,
    BlockOutputBranchingConfig,
    GenericContactPropertyEditor,
  },
})
class BaseBlock extends mixins(Lang) {
  @Prop() readonly block!: IBlock
  @Prop() readonly flow!: IFlow
  @Prop({default: true}) readonly usesDefaultBranchingEditor!: boolean
  @Prop({default: true}) readonly usesDefaultContactPropsEditor!: boolean
  @Prop({default: false}) readonly showSemanticLabel!: boolean

  handleBranchingTypeChangedToUnified() {
    this.$emit('handleBranchingTypeChangedToUnified')
  }

  @builderVuexNamespace.Getter isEditable !: boolean
}

export default BaseBlock
</script>
