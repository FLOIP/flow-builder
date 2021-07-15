<template>
  <div class="core-set-contact-property-block">
    <h3 class="no-room-above">
      {{ 'flow-builder.edit-block-type' | trans({block_type: trans(`flow-builder.${block.type}`)}) }}
    </h3>

    <fieldset :disabled="!isEditable">
      <block-label-editor
        :block="block"
        @gearClicked="showSemanticLabel = !showSemanticLabel" />
      <block-semantic-label-editor
        v-if="showSemanticLabel"
        :block="block" />
      <block-name-editor :block="block" />

      <contact-property-selector :block="block" />
      <validation-message
        #input-control="{ isValid }"
        :message-key="`block/${block.uuid}/config/set_contact_property/property_value`">
        <expression-input
          :label="'flow-builder.contact-property-expression' | trans"
          :placeholder="'flow-builder.edit-expression' | trans"
          :current-expression="propertyValue"
          :valid-state="isValid"
          @commitExpressionChange="commitExpressionChange" />
      </validation-message>

      <slot name="extras" />
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
import ContactPropertySelector from '@/components/interaction-designer/block-editors/ContactPropertySelector.vue'
import SetContactPropertyStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_SetContactPropertyStore'
import Lang from '@/lib/filters/lang'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import {get} from 'lodash'
import {mixins} from 'vue-class-component'
import ExpressionInput from '@/components/common/ExpressionInput.vue'
import ValidationMessage from '@/components/common/ValidationMessage.vue'
import BlockId from '../block-editors/BlockId.vue'
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
import BlockLabelEditor from '../block-editors/LabelEditor.vue'
import BlockNameEditor from '../block-editors/NameEditor.vue'

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const builderVuexNamespace = namespace('builder')

@Component({
  components: {
    ExpressionInput,
    BlockNameEditor,
    BlockLabelEditor,
    BlockSemanticLabelEditor,
    FirstBlockEditorButton,
    BlockId,
    ContactPropertySelector,
    ValidationMessage,
  },
})
class Core_SetContactPropertyBlock extends mixins(Lang) {
  @Prop() readonly block!: IBlock
  @Prop() readonly flow!: IFlow

  showSemanticLabel = false

  get propertyValue(): string {
    return get(this.block, 'config.set_contact_property.property_value', '')
  }

  @blockVuexNamespace.Action editSetContactPropertyExpression!: (params: { blockId: string, value: string }) => Promise<string>
  @builderVuexNamespace.Getter isEditable !: boolean

  commitExpressionChange(value: string): Promise<string> {
    return this.editSetContactPropertyExpression({blockId: this.block.uuid, value})
  }
}

export default Core_SetContactPropertyBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, SetContactPropertyStore)
</script>
