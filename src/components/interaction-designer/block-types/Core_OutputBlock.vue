<template>
  <div>
    <h3 class="no-room-above">
      {{'flow-builder.edit-block-type' | trans({block_type: trans(`flow-builder.${block.type}`)})}}
    </h3>

    <fieldset :disabled="!isEditable">
      <validation-message :message-key="`block/${block.uuid}/.name`" #input-control="{ isValid: isNameValid }">
        <block-name-editor :block="block" :state="!isNameValid" />
      </validation-message>
      <validation-message :message-key="`block/${block.uuid}/.label`" #input-control="{ isValid: isLabelValid }">
       <block-label-editor :block="block" :state="!isLabelValid" />
      </validation-message>
      <validation-message :message-key="`block/${block.uuid}/.semantic_label`" #input-control="{ isValid: isSemanticLabelValid }">
        <block-semantic-label-editor :block="block" :state="!isSemanticLabelValid" />
      </validation-message>

      <validation-message :message-key="`block/${block.uuid}/.config.value`" #input-control="{ isValid: isValueValid }">
        <expression-editor :label="'flow-builder.output-expression' | trans"
          :placeholder="'flow-builder.edit-expression' | trans"
          :current-expression="value"
          :state="!isValueValid"
          @commitExpressionChange="commitExpressionChange"/>
      </validation-message>

      <first-block-editor-button
          :flow="flow"
          :block-id="block.uuid" />
    </fieldset>
    <block-id :block="block" />
  </div>
</template>

<script lang="ts">
import { namespace } from 'vuex-class'
import { Component, Prop } from 'vue-property-decorator'

import { IOutputBlock } from '@floip/flow-runner/src/model/block/IOutputBlock'
import { IFlow } from '@floip/flow-runner'
import ExpressionEditor from '@/components/common/ExpressionEditor.vue'
import OutputStore, { BLOCK_TYPE } from '@/store/flow/block-types/Core_OutputBlockStore'
import { Lang } from '@/lib/filters/lang'
import { createDefaultBlockTypeInstallerFor } from '@/store/builder'
import BlockNameEditor from '../block-editors/NameEditor.vue'
import BlockLabelEditor from '../block-editors/LabelEditor.vue'
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
import BlockId from '../block-editors/BlockId.vue'
import { mixins } from 'vue-class-component'
import ValidationMessage from '@/components/common/ValidationMessage.vue';

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const builderVuexNamespace = namespace('builder')

@Component({
  components: {
    ExpressionEditor,
    BlockNameEditor,
    BlockLabelEditor,
    BlockSemanticLabelEditor,
    FirstBlockEditorButton,
    BlockId,
    ValidationMessage
  },
})
class Core_OutputBlock extends mixins(Lang) {
    @Prop()readonly block!: IOutputBlock

    @Prop()readonly flow!: IFlow

    get value(): string {
      return this.block.config.value || ''
    }

    @blockVuexNamespace.Action editOutputExpression!: (params: {blockId: string; value: string}) => Promise<string>

    @builderVuexNamespace.Getter isEditable !: boolean

    commitExpressionChange(value: string): Promise<string> {
      return this.editOutputExpression({ blockId: this.block.uuid, value })
    }
  }

export default Core_OutputBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, OutputStore)
</script>
