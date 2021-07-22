<template>
  <div class="mobile-primitive-numeric-response-block">
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

      <block-minimum-numeric-editor
        :block="block"
        @commitValidationMinimumChange="updateValidationMin" />
      <block-maximum-numeric-editor
        :block="block"
        @commitValidationMaximumChange="updateValidationMax" />
      <block-max-digit-editor
        :block="block"
        :has-ivr="hasVoiceMode"
        @commitMaxDigitsChange="updateMaxDigits" />

      <block-output-branching-config
        :block="block"
        :has-exit-per-choice="false"
        @branchingTypeChangedToUnified="handleBranchingTypeChangedToUnified" />

      <resource-editor
        v-if="promptResource"
        :resource="promptResource"
        :block="block"
        :flow="flow" />

      <slot name="extras" />

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

import {IBlock, IBlockExit, IFlow, IResource} from '@floip/flow-runner'
import {INumericResponseBlock} from '@floip/flow-runner/src/model/block/INumericResponseBlock'

import NumericStore, {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_NumericResponseBlockStore'
import Lang from '@/lib/filters/lang'
import Categorization from '@/components/interaction-designer/block-editors/Categorization.vue'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import {mixins} from 'vue-class-component'
import ResourceEditor from '../resource-editors/ResourceEditor.vue'
import BlockNameEditor from '../block-editors/NameEditor.vue'
import BlockLabelEditor from '../block-editors/LabelEditor.vue'
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
import BlockId from '../block-editors/BlockId.vue'
import BlockMinimumNumericEditor from '../block-editors/MinimumNumericEditor.vue'
import BlockMaximumNumericEditor from '../block-editors/MaximumNumericEditor.vue'
import BlockMaxDigitEditor from '../block-editors/MaxDigitEditor.vue'
import GenericContactPropertyEditor from '../block-editors/GenericContactPropertyEditor.vue'
import BlockOutputBranchingConfig from '@/components/interaction-designer/block-editors/BlockOutputBranchingConfig.vue'

const flowVuexNamespace = namespace('flow')
const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const builderVuexNamespace = namespace('builder')

@Component({
  components: {
    GenericContactPropertyEditor,
    ResourceEditor,
    BlockNameEditor,
    BlockLabelEditor,
    BlockSemanticLabelEditor,
    FirstBlockEditorButton,
    BlockId,
    BlockMinimumNumericEditor,
    BlockMaximumNumericEditor,
    BlockMaxDigitEditor,
    Categorization,
    BlockOutputBranchingConfig,
  },
})
class MobilePrimitives_NumericResponseBlock extends mixins(Lang) {
  @Prop() readonly block!: INumericResponseBlock

  @Prop() readonly flow!: IFlow

  showSemanticLabel = false

  get promptResource(): IResource {
    return this.resourcesByUuid[this.block.config.prompt]
  }

  updateValidationMin(value: number | string) {
    this.setValidationMinimum({blockId: this.block.uuid, value})
  }

  updateValidationMax(value: number | string) {
    this.setValidationMaximum({blockId: this.block.uuid, value})
  }

  updateMaxDigits(value: number | string) {
    this.setMaxDigits({blockId: this.block.uuid, value})
  }

  handleBranchingTypeChangedToUnified() {
    this.block_convertExitFormationToUnified({
      blockId: this.block.uuid,
      test: 'true',
    })
  }

  @flowVuexNamespace.Getter resourcesByUuid!: { [key: string]: IResource }

  @flowVuexNamespace.Getter hasVoiceMode!: boolean

  @flowVuexNamespace.Action block_convertExitFormationToUnified!:
    ({blockId, test}: {blockId: IBlock['uuid'], test: IBlockExit['test']}) => Promise<void>

  @blockVuexNamespace.Action setValidationMinimum!: ({
    blockId,
    value,
  }: { blockId: IBlock['uuid'], value: number | string }) => Promise<string>

  @blockVuexNamespace.Action setValidationMaximum!: ({
    blockId,
    value,
  }: { blockId: IBlock['uuid'], value: number | string }) => Promise<string>

  @blockVuexNamespace.Action setMaxDigits!: ({blockId, value}: { blockId: IBlock['uuid'], value: number | string }) => Promise<string>

  @builderVuexNamespace.Getter isEditable !: boolean
}

export default MobilePrimitives_NumericResponseBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, NumericStore)
</script>
