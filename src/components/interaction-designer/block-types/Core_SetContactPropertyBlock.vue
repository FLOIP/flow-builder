<template>
  <div class="core-set-contact-property-block">
    <h3 class="no-room-above">
      {{ 'flow-builder.edit-block-type' | trans({block_type: trans(`flow-builder.${block.type}`)}) }}
    </h3>

    <fieldset :disabled="!isEditable">
      <block-name-editor :block="block" />
      <block-label-editor :block="block" />
      <block-semantic-label-editor :block="block" />

      <contact-property-editor :block="block" />

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
import ExpressionEditor from '@/components/common/ExpressionEditor.vue'
import ContactPropertyEditor from '@/components/interaction-designer/block-editors/ContactPropertyEditor.vue'

import SetContactPropertyStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_SetContactPropertyStore'
import Lang from '@/lib/filters/lang'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import {get} from 'lodash'
import {mixins} from 'vue-class-component'
import BlockId from '../block-editors/BlockId.vue'
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
import BlockLabelEditor from '../block-editors/LabelEditor.vue'
import BlockNameEditor from '../block-editors/NameEditor.vue'

const builderVuexNamespace = namespace('builder')

@Component({
  components: {
    BlockNameEditor,
    BlockLabelEditor,
    BlockSemanticLabelEditor,
    FirstBlockEditorButton,
    BlockId,
    ContactPropertyEditor,
  },
})
class Core_SetContactPropertyBlock extends mixins(Lang) {
  @Prop() readonly block!: IBlock
  @Prop() readonly flow!: IFlow

  @builderVuexNamespace.Getter isEditable !: boolean
}

export default Core_SetContactPropertyBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, SetContactPropertyStore)
</script>
