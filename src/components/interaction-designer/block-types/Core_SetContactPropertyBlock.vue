<template>
  <div class="core-set-contact-property-block">
    <h3 class="no-room-above">
      {{ 'flow-builder.edit-block-type' | trans({ block_type: trans(`flow-builder.${block.type}`) }) }}
    </h3>

    <fieldset :disabled="!isEditable">
      <block-name-editor :block="block"/>
      <block-label-editor :block="block"/>
      <block-semantic-label-editor :block="block"/>

      <contact-property-selector :block="block"/>

      <expression-editor :label="'flow-builder.contact-property-expression' | trans"
                         :placeholder="'flow-builder.edit-expression' | trans"
                         :current-expression="propertyValue"
                         @commitExpressionChange="commitExpressionChange"/>

      <first-block-editor-button
        :flow="flow"
        :block-id="block.uuid"/>
    </fieldset>

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
import ExpressionEditor from '@/components/common/ExpressionEditor.vue'
import BlockNameEditor from '../block-editors/NameEditor.vue'
import BlockLabelEditor from '../block-editors/LabelEditor.vue'
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
import BlockId from '../block-editors/BlockId.vue'
import ContactPropertySelector from "@/components/interaction-designer/block-editors/ContactPropertySelector.vue"

import SetContactPropertyStore, { BLOCK_TYPE } from '@/store/flow/block-types/Core_SetContactPropertyStore'
import lang from '@/lib/filters/lang'
import { createDefaultBlockTypeInstallerFor } from "@/store/builder";
import { get } from 'lodash'

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const builderVuexNamespace = namespace('builder')

//providing this generic is required by tsserver checking but not in the build run by yarn storybook
//TODO - understand what is going on here and if there is something more correct we should have instead
@Component<any>({
  components: {
    ExpressionEditor,
    BlockNameEditor,
    BlockLabelEditor,
    BlockSemanticLabelEditor,
    FirstBlockEditorButton,
    BlockId,
    ContactPropertySelector,
  },
  mixins: [lang],
})
class Core_SetContactPropertyBlock extends Vue {
  @Prop() readonly block!: IBlock
  @Prop() readonly flow!: IFlow

  get propertyValue(): string {
    return get(this.block, 'config.set_contact_property.property_value', '')
  }

  @blockVuexNamespace.Action editSetContactPropertyExpression!: (params: { blockId: string, value: string }) => Promise<string>
  @builderVuexNamespace.Getter isEditable !: boolean
  commitExpressionChange(value: string): Promise<string> {
    return this.editSetContactPropertyExpression({ blockId: this.block.uuid, value })
  }
}

export default Core_SetContactPropertyBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, SetContactPropertyStore)
</script>
