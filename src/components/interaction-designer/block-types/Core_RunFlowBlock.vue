<template>
  <div class="core-run-flow-block">
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

      <validation-message
        #input-control="{ isValid }"
        :message-key="`block/${block.uuid}/config/flow_id`">
        <div class="form-group">
        <!--
          <label class="text-primary">{{ 'flow-builder.destination-flow' | trans }}</label>
          <select
            v-model="destinationFlowId"
            class="form-control"
            :class="{ 'is-invalid': isValid === false }">
            <option value="">
              {{ 'flow-builder.none-selected' | trans }}
            </option>
            <option
              v-for="(flow, i) in otherFlows"
              :value="flow.uuid">
              {{ flow.name }}
            </option>
          </select>
          //TODO - add back in or move across to embedding app via slot when ready - pull flows from a backend
        -->
          <text-editor
            v-model="destinationFlowId"
            :label="'flow-builder.destination-flow' | trans"
            :placeholder="'flow-builder.enter-destination-flow-id' | trans"
            :valid-state="isValid" />
        </div>
      </validation-message>

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

import {IRunFlowBlock} from '@floip/flow-runner/src/model/block/IRunFlowBlock'
import {IBlock, IFlow} from '@floip/flow-runner'
import RunAnotherFlowStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_RunFlowBlockStore'
import Lang from '@/lib/filters/lang'
import Categorization from '@/components/interaction-designer/block-editors/Categorization.vue'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import {mixins} from 'vue-class-component'
import BlockOutputBranchingConfig from '@/components/interaction-designer/block-editors/BlockOutputBranchingConfig.vue'
import {TextEditor, ValidationMessage} from '@/components/common/'
import BlockNameEditor from '../block-editors/NameEditor.vue'
import BlockLabelEditor from '../block-editors/LabelEditor.vue'
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
import BlockId from '../block-editors/BlockId.vue'
import GenericContactPropertyEditor from '../block-editors/GenericContactPropertyEditor.vue'

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const builderVuexNamespace = namespace('builder')

@Component({
  components: {
    GenericContactPropertyEditor,
    BlockNameEditor,
    BlockLabelEditor,
    BlockSemanticLabelEditor,
    FirstBlockEditorButton,
    BlockId,
    Categorization,
    BlockOutputBranchingConfig,
    ValidationMessage,
    TextEditor,
  },
})
class Core_RunAnotherFlowBlock extends mixins(Lang) {
  @Prop() readonly block!: IRunFlowBlock

  @Prop() readonly flow!: IFlow

  showSemanticLabel = false

  get destinationFlowId(): string {
    return this.block.config.flow_id
  }

  set destinationFlowId(newDestinationFlowId: string) {
    this.setDestinationFlowId({blockId: this.block.uuid, newDestinationFlowId})
  }

  @blockVuexNamespace.Action declare setDestinationFlowId: (
    {blockId, newDestinationFlowId}: { blockId: string, newDestinationFlowId: string },
  ) => Promise<string>
  @blockVuexNamespace.Action handleBranchingTypeChangedToUnified!: ({block}: {block: IBlock}) => void
  //TODO - add back in or move across to embedding app via slot when ready - pull flows from a backend
  //@blockVuexNamespace.Getter declare otherFlows: IFlow[]

  @builderVuexNamespace.Getter declare isEditable: boolean
}

export default Core_RunAnotherFlowBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, RunAnotherFlowStore)
</script>
