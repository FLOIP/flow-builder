<template>
  <div class="smart-devices-location-response-block">
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

      <block-threshold-editor
        :block="block"
        @commitAccuracyThresholdMetersChange="updateThreshold" />
      <block-timeout-editor
        :block="block"
        @commitAccuracyTimeoutSecondsChange="updateTimeout" />

      <slot name="extras" />

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
// import ILocationResponseBlock from '@floip/flow-runner/src/model/block/ILocationResponseBlock' // TODO: to be created on flow-runner side
import {IBlock, IFlow, IResource} from '@floip/flow-runner'
import LocationStore, {BLOCK_TYPE} from '@/store/flow/block-types/SmartDevices_LocationResponseBlockStore'
import Lang from '@/lib/filters/lang'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import {mixins} from 'vue-class-component'
import ResourceEditor from '../resource-editors/ResourceEditor.vue'
import BlockNameEditor from '../block-editors/NameEditor.vue'
import BlockLabelEditor from '../block-editors/LabelEditor.vue'
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
import BlockId from '../block-editors/BlockId.vue'
import BlockThresholdEditor from '../block-editors/ThresholdEditor.vue'
import BlockTimeoutEditor from '../block-editors/TimeoutEditor.vue'
import GenericContactPropertyEditor from '../block-editors/GenericContactPropertyEditor.vue'

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
    BlockThresholdEditor,
    BlockTimeoutEditor,
  },
})
class SmartDevices_LocationResponseBlock extends mixins(Lang) {
  @Prop() readonly block!: IBlock

  // @Prop()readonly block!: ILocationResponseBlock
  @Prop() readonly flow!: IFlow

  showSemanticLabel = false

  updateThreshold(value: number) {
    this.setAccuracyThreshold({blockId: this.block.uuid, value})
  }

  updateTimeout(value: number) {
    this.setAccuracyTimeout({blockId: this.block.uuid, value})
  }

  @flowVuexNamespace.Getter resourcesByUuid!: { [key: string]: IResource }

  @blockVuexNamespace.Action setAccuracyThreshold!: ({blockId, value}: { blockId: string, value: number }) => Promise<string>

  @blockVuexNamespace.Action setAccuracyTimeout!: ({blockId, value}: { blockId: string, value: number }) => Promise<string>

  @builderVuexNamespace.Getter isEditable !: boolean
}

export default SmartDevices_LocationResponseBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, LocationStore)
</script>
