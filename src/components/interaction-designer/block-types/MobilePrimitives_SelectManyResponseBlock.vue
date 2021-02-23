<template>
  <div>
    <h3 class="no-room-above">
      {{'flow-builder.edit-block-type' | trans({block_type: trans(`flow-builder.${block.type}`)})}}
    </h3>

    <block-name-editor :is-editable="isEditable" :block="block" />
    <block-label-editor :is-editable="isEditable" :block="block" />
    <block-semantic-label-editor :is-editable="isEditable" :block="block" />

    <div class="prompt-resource">
      <resource-editor v-if="promptResource"
                       :label="'flow-builder.prompt' | trans"
                       :is-editable="isEditable"
                       :resource="promptResource"
                       :block="block"
                       :flow="flow" />
    </div>
    <div class="question-prompt-resource">
      <resource-editor v-if="questionPromptResource"
                       :label="'flow-builder.question-prompt' | trans"
                       :resource="questionPromptResource"
                       :is-editable="isEditable"
                       :block="block"
                       :flow="flow" />
    </div>
    <div class="choices-prompt-resource">
      <resource-editor v-if="choicesPromptResource"
                       :label="'flow-builder.choices-prompt' | trans"
                       :resource="choicesPromptResource"
                       :is-editable="isEditable"
                       :block="block"
                       :flow="flow" />
    </div>
    <div v-for="(choiceKey) in Object.keys(inflatedChoices)" class="form-group form-inline">
      <resource-editor :label="`Choice ${choiceKey}`"
                       :resource="inflatedChoices[choiceKey]"
                       :is-editable="isEditable"
                       :block="block"
                       :flow="flow" />
    </div>

    <first-block-editor-button
        :flow="flow"
        :block-id="block.uuid" />

    <block-id :block="block" />

  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import {
  IResourceDefinition,
} from '@floip/flow-runner/src/domain/IResourceResolver';
import SelectManyResponseStore, { BLOCK_TYPE } from '@/store/flow/block-types/MobilePrimitives_SelectManyResponseBlockStore';
import { namespace } from 'vuex-class';
import lang from '@/lib/filters/lang';
import { createDefaultBlockTypeInstallerFor } from '@/store/builder';
import BlockNameEditor from '../block-editors/NameEditor.vue';
import BlockLabelEditor from '../block-editors/LabelEditor.vue';
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue';

import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue';
import ResourceEditor from '../resource-editors/ResourceEditor.vue';
import BlockId from '../block-editors/BlockId.vue';

import SelectOneResponseBlock from './MobilePrimitives_SelectOneResponseBlock.vue';

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`);
const builderVuexNamespace = namespace('builder');

  @Component<any>({
    components: {
      BlockNameEditor,
      BlockLabelEditor,
      BlockSemanticLabelEditor,
      FirstBlockEditorButton,
      ResourceEditor,
      BlockId,
    },
    mixins: [lang],
  })
export class MobilePrimitives_SelectManyResponseBlock extends SelectOneResponseBlock {
    @blockVuexNamespace.Getter inflatedChoices!: {[key: string]: IResourceDefinition}

    @blockVuexNamespace.Action editSelectOneResponseBlockChoice!: () => Promise<object>

    @builderVuexNamespace.Getter isEditable !: boolean
}

export default MobilePrimitives_SelectManyResponseBlock;
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, SelectManyResponseStore);
</script>
