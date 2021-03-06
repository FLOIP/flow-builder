<template>
  <div class="console-io-print-block">
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

      <resource-editor
        v-if="promptResource"
        :resource="promptResource"
        :block="block"
        :flow="flow" />

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

import {IFlow, IResource} from '@floip/flow-runner'
import {IPrintBlock} from '@floip/flow-runner/src/model/block/IPrintBlock'

import PrintStore, {BLOCK_TYPE} from '@/store/flow/block-types/ConsoleIO_PrintBlockStore'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import {mixins} from 'vue-class-component'
import Lang from '@/lib/filters/lang'
import ResourceEditor from '../resource-editors/ResourceEditor.vue'
import BlockNameEditor from '../block-editors/NameEditor.vue'
import BlockLabelEditor from '../block-editors/LabelEditor.vue'
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
import BlockId from '../block-editors/BlockId.vue'

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
  },
})
class ConsoleIO_PrintBlock extends mixins(Lang) {
  @Prop() readonly block!: IPrintBlock

  @Prop() readonly flow!: IFlow

  showSemanticLabel = false

  get promptResource(): IResource {
    return this.resourcesByUuid[this.block.config.message]
  }

  @flowVuexNamespace.Getter resourcesByUuid!: { [key: string]: IResource }

  @builderVuexNamespace.Getter isEditable !: boolean
}

export default ConsoleIO_PrintBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, PrintStore)
</script>
