<template>
  <div>
    <h3 class="no-room-above">
      {{'flow-builder.edit-block-type' | trans({block_type: trans(`flow-builder.${block.type}`)})}}
    </h3>

    <fieldset :disabled="!isEditable">
      <block-name-editor  :block="block" />
      <block-label-editor :block="block" />
      <block-semantic-label-editor :block="block" />

      <block-threshold-editor :block="block" @commitAccuracyThresholdMetersChange="updateThreshold"/>
      <block-timeout-editor :block="block" @commitAccuracyTimeoutSecondsChange="updateTimeout"/>

      <first-block-editor-button
          :flow="flow"
          :block-id="block.uuid" />
    </fieldset>

    <block-id :block="block" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {namespace} from 'vuex-class'
import {Component, Prop} from 'vue-property-decorator'

import {IBlock, IBlockExit, IFlow} from '@floip/flow-runner'
// import ILocationResponseBlock from '@floip/flow-runner/src/model/block/ILocationResponseBlock' // TODO: to be created on flow-runner side
import {
  IResourceDefinition,
} from '@floip/flow-runner/src/domain/IResourceResolver'

import LocationStore, {BLOCK_TYPE} from '@/store/flow/block-types/SmartDevices_LocationResponseBlockStore'
import lang from '@/lib/filters/lang'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import ResourceEditor from '../resource-editors/ResourceEditor.vue'
import BlockNameEditor from '../block-editors/NameEditor.vue'
import BlockLabelEditor from '../block-editors/LabelEditor.vue'
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
import BlockId from '../block-editors/BlockId.vue'
import BlockThresholdEditor from '../block-editors/ThresholdEditor.vue'
import BlockTimeoutEditor from '../block-editors/TimeoutEditor.vue'

const flowVuexNamespace = namespace('flow')
const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const builderVuexNamespace = namespace('builder')

  @Component<any>({
    components: {
      ResourceEditor,
      BlockNameEditor,
      BlockLabelEditor,
      BlockSemanticLabelEditor,
      FirstBlockEditorButton,
      BlockId,
      BlockThresholdEditor,
      BlockTimeoutEditor,
    },
    mixins: [lang],
  })
class SmartDevices_LocationResponseBlock extends Vue {
    @Prop()readonly block!: IBlock

    // @Prop()readonly block!: ILocationResponseBlock
    @Prop()readonly flow!: IFlow

    updateThreshold(value: number) {
      this.setAccuracyThreshold({blockId: this.block.uuid, value})
    }

    updateTimeout(value: number) {
      this.setAccuracyTimeout({blockId: this.block.uuid, value})
    }

    @flowVuexNamespace.Getter resourcesByUuid!: {[key: string]: IResourceDefinition}

    @blockVuexNamespace.Action setAccuracyThreshold!: ({blockId, value}: {blockId: string; value: number}) => Promise<string>

    @blockVuexNamespace.Action setAccuracyTimeout!: ({blockId, value}: {blockId: string; value: number}) => Promise<string>

    @builderVuexNamespace.Getter isEditable !: boolean
  }

export default SmartDevices_LocationResponseBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, LocationStore)
</script>
