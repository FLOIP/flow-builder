<template>
  <div>
    <h3 class="no-room-above">
      {{'flow-builder.edit-block-type' | trans({block_type: trans(`flow-builder.${block.type}`)})}}
    </h3>

    <fieldset :disabled="!isEditable">
      <validation-message :message-key="`block/${block.uuid}/.name`" #input-control="{ isValid: isNameValid }">
        <block-name-editor  :block="block" :state="!isNameValid" />
      </validation-message>
      <validation-message :message-key="`block/${block.uuid}/.label`" #input-control="{ isValid: isLabelValid }">
        <block-label-editor :block="block" :state="!isLabelValid" />
      </validation-message>
      <validation-message :message-key="`block/${block.uuid}/.semantic_label`" #input-control="{ isValid: isSemanticLabelValid }">
        <block-semantic-label-editor :block="block" :state="!isSemanticLabelValid" />
      </validation-message>
      <validation-message :message-key="`block/${block.uuid}/.config.accuracy_threshold_meters`" #input-control="{ isValid: isThresholdMetersValid }">
        <block-threshold-editor :block="block" @commitAccuracyThresholdMetersChange="updateThreshold" :state="!isThresholdMetersValid" />
      </validation-message>
      <validation-message :message-key="`block/${block.uuid}/.config.accuracy_timeout_seconds`" #input-control="{ isValid: isTimeoutSecondsValid }">
        <block-timeout-editor :block="block" @commitAccuracyTimeoutSecondsChange="updateTimeout" :state="!isTimeoutSecondsValid" />
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
import { IBlock, IBlockExit, IFlow } from '@floip/flow-runner'
// import ILocationResponseBlock from '@floip/flow-runner/src/model/block/ILocationResponseBlock' // TODO: to be created on flow-runner side
import {
  IResourceDefinition,
} from '@floip/flow-runner/src/domain/IResourceResolver'
import LocationStore, { BLOCK_TYPE } from '@/store/flow/block-types/SmartDevices_LocationResponseBlockStore'
import { Lang } from '@/lib/filters/lang'
import { createDefaultBlockTypeInstallerFor } from '@/store/builder'
import ResourceEditor from '../resource-editors/ResourceEditor.vue'
import BlockNameEditor from '../block-editors/NameEditor.vue'
import BlockLabelEditor from '../block-editors/LabelEditor.vue'
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
import BlockId from '../block-editors/BlockId.vue'
import BlockThresholdEditor from '../block-editors/ThresholdEditor.vue'
import BlockTimeoutEditor from '../block-editors/TimeoutEditor.vue'
import { mixins } from 'vue-class-component'
import ValidationMessage from '@/components/common/ValidationMessage.vue';

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
    BlockThresholdEditor,
    BlockTimeoutEditor,
    ValidationMessage
  },
})
class SmartDevices_LocationResponseBlock extends mixins(Lang) {
    @Prop()readonly block!: IBlock

    // @Prop()readonly block!: ILocationResponseBlock
    @Prop()readonly flow!: IFlow

    updateThreshold(value: number) {
      this.setAccuracyThreshold({ blockId: this.block.uuid, value })
    }

    updateTimeout(value: number) {
      this.setAccuracyTimeout({ blockId: this.block.uuid, value })
    }

    @flowVuexNamespace.Getter resourcesByUuid!: {[key: string]: IResourceDefinition}

    @blockVuexNamespace.Action setAccuracyThreshold!: ({ blockId, value }: {blockId: string; value: number}) => Promise<string>

    @blockVuexNamespace.Action setAccuracyTimeout!: ({ blockId, value }: {blockId: string; value: number}) => Promise<string>

    @builderVuexNamespace.Getter isEditable !: boolean
  }

export default SmartDevices_LocationResponseBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, LocationStore)
</script>
