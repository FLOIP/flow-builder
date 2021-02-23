<template>
  <div>
    <h3 class="no-room-above">
      {{'flow-builder.edit-block-type' | trans({block_type: trans(`flow-builder.${block.type}`)})}}
    </h3>

    <block-name-editor :is-editable="isEditable" :block="block" />
    <block-label-editor :is-editable="isEditable" :block="block" />
    <block-semantic-label-editor :is-editable="isEditable" :block="block" />

    <first-block-editor-button
        :flow="flow"
        :block-id="block.uuid" />

    <block-id :block="block" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { namespace } from 'vuex-class';
import { Component, Prop } from 'vue-property-decorator';

import { IBlock, IBlockExit, IFlow } from '@floip/flow-runner';
// import IPhotoResponseBlock from '@floip/flow-runner/src/model/block/IPhotoResponseBlock' // TODO: to be created in flow-runner
import {
  IResourceDefinition,
} from '@floip/flow-runner/src/domain/IResourceResolver';

import PhotoStore, { BLOCK_TYPE } from '@/store/flow/block-types/SmartDevices_PhotoResponseBlockStore';
import lang from '@/lib/filters/lang';
import { createDefaultBlockTypeInstallerFor } from '@/store/builder';
import BlockNameEditor from '../block-editors/NameEditor.vue';
import BlockLabelEditor from '../block-editors/LabelEditor.vue';
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue';
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue';
import BlockId from '../block-editors/BlockId.vue';

const flowVuexNamespace = namespace('flow');
const builderVuexNamespace = namespace('builder');

  @Component<any>({
    components: {
      BlockNameEditor,
      BlockLabelEditor,
      BlockSemanticLabelEditor,
      FirstBlockEditorButton,
      BlockId,
    },
    mixins: [lang],
  })
class SmartDevices_PhotoResponseBlock extends Vue {
    // @Prop()readonly block!: IPhotoResponseBlock
    @Prop()readonly block!: IBlock

    @Prop()readonly flow!: IFlow

    @flowVuexNamespace.Getter resourcesByUuid!: {[key: string]: IResourceDefinition}

    @builderVuexNamespace.Getter isEditable !: boolean
  }

export default SmartDevices_PhotoResponseBlock;
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, PhotoStore);
</script>
