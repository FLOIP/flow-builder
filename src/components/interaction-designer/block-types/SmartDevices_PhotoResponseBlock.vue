<template>
  <div class="smart-devices-photo-response-block">
    <h3 class="no-room-above">
      {{'flow-builder.edit-block-type' | trans({block_type: trans(`flow-builder.${block.type}`)})}}
    </h3>
    <fieldset :disabled="!isEditable">
      <block-name-editor :block="block" />
      <block-label-editor :block="block" />
      <block-semantic-label-editor :block="block" />

      <slot name="extras"></slot>
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

import { IBlock, IBlockExit, IFlow } from '@floip/flow-runner'
// import IPhotoResponseBlock from '@floip/flow-runner/src/model/block/IPhotoResponseBlock' // TODO: to be created in flow-runner
import {
  IResourceDefinition,
} from '@floip/flow-runner/src/domain/IResourceResolver'

import PhotoStore, { BLOCK_TYPE } from '@/store/flow/block-types/SmartDevices_PhotoResponseBlockStore'
import Lang from '@/lib/filters/lang'
import { createDefaultBlockTypeInstallerFor } from '@/store/builder'
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
    BlockNameEditor,
    BlockLabelEditor,
    BlockSemanticLabelEditor,
    FirstBlockEditorButton,
    BlockId,
    ValidationMessage
  },
})
class SmartDevices_PhotoResponseBlock extends mixins(Lang) {
    // @Prop()readonly block!: IPhotoResponseBlock
    @Prop()readonly block!: IBlock

    @Prop()readonly flow!: IFlow

    @flowVuexNamespace.Getter resourcesByUuid!: {[key: string]: IResourceDefinition}

    @builderVuexNamespace.Getter isEditable !: boolean
  }

export default SmartDevices_PhotoResponseBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, PhotoStore)
</script>
