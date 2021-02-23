<template>
  <div>
    <h3 class="no-room-above">
      {{'flow-builder.edit-block-type' | trans({block_type: trans(`flow-builder.${block.type}`)})}}
    </h3>

    <block-name-editor :is-editable="isEditable" :block="block" />
    <block-label-editor :is-editable="isEditable" :block="block" />
    <block-semantic-label-editor :is-editable="isEditable" :block="block" />

    <expression-editor :label="'flow-builder.output-expression' | trans"
        :placeholder="'flow-builder.edit-expression' | trans"
        :current-expression="value"
        :is-editable="isEditable"
        @commitExpressionChange="commitExpressionChange"/>

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

import IOutputBlock from '@floip/flow-runner/src/model/block/IOutputBlock';
import { IFlow } from '@floip/flow-runner';
import ExpressionEditor from '@/components/common/ExpressionEditor.vue';
import OutputStore, { BLOCK_TYPE } from '@/store/flow/block-types/Core_OutputBlockStore';
import lang from '@/lib/filters/lang';
import { createDefaultBlockTypeInstallerFor } from '@/store/builder';
import BlockNameEditor from '../block-editors/NameEditor.vue';
import BlockLabelEditor from '../block-editors/LabelEditor.vue';
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue';
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue';
import BlockId from '../block-editors/BlockId.vue';

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`);
const builderVuexNamespace = namespace('builder');

  // providing this generic is required by tsserver checking but not in the build run by yarn storybook
  // TODO - understand what is going on here and if there is something more correct we should have instead
  @Component<any>({
    components: {
      ExpressionEditor,
      BlockNameEditor,
      BlockLabelEditor,
      BlockSemanticLabelEditor,
      FirstBlockEditorButton,
      BlockId,
    },
    mixins: [lang],
  })
class Core_OutputBlock extends Vue {
    @Prop()readonly block!: IOutputBlock

    @Prop()readonly flow!: IFlow

    get value(): string {
      return this.block.config.value || '';
    }

    @blockVuexNamespace.Action editOutputExpression!: (params: {blockId: string; value: string}) => Promise<string>

    @builderVuexNamespace.Getter isEditable !: boolean

    commitExpressionChange(value: string): Promise<string> {
      return this.editOutputExpression({ blockId: this.block.uuid, value });
    }
  }

export default Core_OutputBlock;
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, OutputStore);
</script>
