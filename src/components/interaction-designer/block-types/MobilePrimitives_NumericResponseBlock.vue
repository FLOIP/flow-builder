<template>
  <div class="mobile-primitive-numeric-response-block">
    <h3 class="no-room-above">
      {{'flow-builder.edit-block-type' | trans({block_type: trans(`flow-builder.${block.type}`)})}}
    </h3>

    <fieldset :disabled="!isEditable">
      <block-name-editor :block="block" />
      <block-label-editor :block="block" />
      <block-semantic-label-editor :block="block" />

      <block-minimum-numeric-editor :block="block" @commitValidationMinimumChange="updateValidationMin"/>
      <block-maximum-numeric-editor :block="block" @commitValidationMaximumChange="updateValidationMax"/>
      <block-max-digit-editor :block="block" :hasIvr="hasVoiceMode" @commitMaxDigitsChange="updateMaxDigits"/>

      <resource-editor v-if="promptResource"
                       :resource="promptResource"
                       :block="block"
                       :flow="flow" />
      <slot name="extras"></slot>
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
import { IBlock, IFlow, IResource } from '@floip/flow-runner'
import { INumericResponseBlock } from '@floip/flow-runner/src/model/block/INumericResponseBlock'

import NumericStore, { BLOCK_TYPE } from '@/store/flow/block-types/MobilePrimitives_NumericResponseBlockStore'
import Lang from '@/lib/filters/lang'
import { createDefaultBlockTypeInstallerFor } from '@/store/builder'
import ResourceEditor from '../resource-editors/ResourceEditor.vue'
import BlockNameEditor from '../block-editors/NameEditor.vue'
import BlockLabelEditor from '../block-editors/LabelEditor.vue'
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
import BlockId from '../block-editors/BlockId.vue'
import BlockMinimumNumericEditor from '../block-editors/MinimumNumericEditor.vue'
import BlockMaximumNumericEditor from '../block-editors/MaximumNumericEditor.vue'
import BlockMaxDigitEditor from '../block-editors/MaxDigitEditor.vue'
import { mixins } from 'vue-class-component'

const flowVuexNamespace = namespace('flow')
const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const builderVuexNamespace = namespace('builder')

@Component({
  components: {
    ResourceEditor,
    BlockNameEditor,
    BlockLabelEditor,
    BlockSemanticLabelEditor,
    FirstBlockEditorButton,
    BlockId,
    BlockMinimumNumericEditor,
    BlockMaximumNumericEditor,
    BlockMaxDigitEditor,
  },
})
class MobilePrimitives_NumericResponseBlock extends mixins(Lang) {
    @Prop()readonly block!: INumericResponseBlock

    @Prop()readonly flow!: IFlow

    get promptResource(): IResource {
      return this.resourcesByUuid[this.block.config.prompt]
    }

    updateValidationMin(value: number | string) {
      this.setValidationMinimum({ blockId: this.block.uuid, value })
    }

    updateValidationMax(value: number | string) {
      this.setValidationMaximum({ blockId: this.block.uuid, value })
    }

    updateMaxDigits(value: number | string) {
      this.setMaxDigits({ blockId: this.block.uuid, value })
    }

    @flowVuexNamespace.Getter resourcesByUuid!: {[key: string]: IResource}

    @flowVuexNamespace.Getter hasVoiceMode!: boolean

    @blockVuexNamespace.Action setValidationMinimum!: ({ blockId, value }: { blockId: IBlock['uuid']; value: number | string }) => Promise<string>

    @blockVuexNamespace.Action setValidationMaximum!: ({ blockId, value }: { blockId: IBlock['uuid']; value: number | string }) => Promise<string>

    @blockVuexNamespace.Action setMaxDigits!: ({ blockId, value }: { blockId: IBlock['uuid']; value: number | string }) => Promise<string>

    @builderVuexNamespace.Getter isEditable !: boolean
  }

export default MobilePrimitives_NumericResponseBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, NumericStore)
</script>
