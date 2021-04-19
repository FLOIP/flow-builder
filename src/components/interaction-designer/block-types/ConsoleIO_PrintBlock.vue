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

      <resource-editor v-if="promptResource"
                       :resource="promptResource"
                       :block="block"
                       :flow="flow" />

      <first-block-editor-button
          :flow="flow"
          :block-id="block.uuid" />
    </fieldset>

    <block-id :block="block" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { namespace } from 'vuex-class'
import { Component, Prop } from 'vue-property-decorator'

import { IFlow } from '@floip/flow-runner'
import { IPrintBlock } from '@floip/flow-runner/src/model/block/IPrintBlock'
import { IResourceDefinition } from '@floip/flow-runner/src/domain/IResourceResolver'

import PrintStore, { BLOCK_TYPE } from '@/store/flow/block-types/ConsoleIO_PrintBlockStore'
import { Lang } from '@/lib/filters/lang'
import { createDefaultBlockTypeInstallerFor } from '@/store/builder'
import ResourceEditor from '../resource-editors/ResourceEditor.vue'
import BlockNameEditor from '../block-editors/NameEditor.vue'
import BlockLabelEditor from '../block-editors/LabelEditor.vue'
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
import BlockId from '../block-editors/BlockId.vue'
import { mixins } from 'vue-class-component'
import ValidationMessage from '@/components/common/ValidationMessage.vue';

const flowVuexNamespace = namespace('flow')
const builderVuexNamespace = namespace('builder')

@Component({
  components: {
    ResourceEditor,
    BlockNameEditor,
    BlockLabelEditor,
    BlockSemanticLabelEditor,
    FirstBlockEditorButton,
    BlockId,
    ValidationMessage
  },
})
class ConsoleIO_PrintBlock extends mixins(Lang) {
    @Prop()readonly block!: IPrintBlock

    @Prop()readonly flow!: IFlow

    get promptResource(): IResourceDefinition {
      return this.resourcesByUuid[this.block.config.message]
    }

    @flowVuexNamespace.Getter resourcesByUuid!: {[key: string]: IResourceDefinition}

    @builderVuexNamespace.Getter isEditable !: boolean
  }

export default ConsoleIO_PrintBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, PrintStore)
</script>
