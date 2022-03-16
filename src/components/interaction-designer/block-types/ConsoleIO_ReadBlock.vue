<template>
  <div class="console-io-read-block">
    <h3 class="block-editor-header">
      {{ `flow-builder.${block.type}` | trans }}
    </h3>

    <fieldset :disabled="!isEditable">
      <label-editor
        :block="block"
        @gearClicked="showSemanticLabel = !showSemanticLabel" />
      <semantic-label-editor
        v-if="showSemanticLabel"
        :block="block" />
      <name-editor :block="block" />

      <slot name="extras" />

      <hr>

      <!--Specific config-->
      <format-string-editor
        :block="block"
        @commitFormatStringChange="setFormatString" />

      <div>
        <h6>{{ 'flow-builder.destination-variable' | trans }}</h6>
        <div
          v-for="(variableStringFormat,i) in destinationVariablesFields"
          :key="i"
          class="form-group">
          <validation-message
            #input-control="{ isValid }"
            :message-key="`block/${block.uuid}/config/destination_variables/${i}`">
            <text-editor
              :label="''"
              :placeholder="'flow-builder.destination-variable-placeholder' | trans"
              :valid-state="isValid"
              value=""
              @keydown="filterVariableName"
              @input="updatedestinationVariables($event, i)" />
          </validation-message>
        </div>
      </div>

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

import {IBlock, IFlow} from '@floip/flow-runner'
import {IReadBlock} from '@floip/flow-runner/src/model/block/IReadBlock'
import ReadStore, {BLOCK_TYPE} from '@/store/flow/block-types/ConsoleIO_ReadBlockStore'
import Lang from '@/lib/filters/lang'
import Categorization from '@/components/interaction-designer/block-editors/Categorization.vue'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import {mixins} from 'vue-class-component'
import BlockOutputBranchingConfig from '@/components/interaction-designer/block-editors/BlockOutputBranchingConfig.vue'
import ResourceEditor from '../resource-editors/ResourceEditor.vue'
import BlockNameEditor from '../block-editors/NameEditor.vue'
import BlockLabelEditor from '../block-editors/LabelEditor.vue'
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
import BlockFormatStringEditor from '../block-editors/FormatStringEditor.vue'
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
import BlockId from '../block-editors/BlockId.vue'
import GenericContactPropertyEditor from '../block-editors/GenericContactPropertyEditor.vue'

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const builderVuexNamespace = namespace('builder')

@Component({})
class ConsoleIO_ReadBlock extends mixins(Lang) {
  @Prop() readonly declare block: IReadBlock

  @Prop() readonly declare flow: IFlow

  showSemanticLabel = false

  filterVariableName(e: any) {
    if (e.key.match(/\W+|Enter/g)) {
      e.preventDefault()
    }
  }

  updatedestinationVariables(value: string, i: number) {
    this.editDestinationVariable({variableName: value, keyIndex: i})
  }

  @blockVuexNamespace.Action declare setFormatString: (newFormatString: string) => Promise<string>

  @blockVuexNamespace.Action declare editDestinationVariable: ({
    variableName,
    keyIndex,
  }: { variableName: string, keyIndex: number }) => Promise<string[]>

  @blockVuexNamespace.Getter declare destinationVariablesFields: () => Promise<string[]>
  @blockVuexNamespace.Action handleBranchingTypeChangedToUnified!: ({block}: {block: IBlock}) => void
  @builderVuexNamespace.Getter declare isEditable: boolean
}

export default ConsoleIO_ReadBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, ReadStore)
</script>
