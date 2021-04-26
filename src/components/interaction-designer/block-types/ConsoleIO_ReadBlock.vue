<template>
  <div class="console-io-read-block">
    <h3 class="no-room-above">
      {{'flow-builder.edit-block-type' | trans({block_type: trans(`flow-builder.${block.type}`)})}}
    </h3>

    <fieldset :disabled="!isEditable">
      <block-name-editor :block="block" />
      <block-label-editor :block="block" />
      <block-semantic-label-editor :block="block" />

      <!--Specific config-->
      <block-format-string-editor :block="block" @commitFormatStringChange="setFormatString"/>

      <div v-for="(variableStringFormat,i) in destinationVariablesFields"
           class="form-group form-inline">
        <text-editor :label="i+1"
            :placeholder="'flow-builder.edit-variable' | trans"
            value=""
            @keydown="filterVariableName"
            @input="updatedestinationVariables($event, i)"/>
      </div>
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

import { IFlow } from '@floip/flow-runner'
import { IReadBlock } from '@floip/flow-runner/src/model/block/IReadBlock'
import TextEditor from '@/components/common/TextEditor.vue'
import ReadStore, { BLOCK_TYPE } from '@/store/flow/block-types/ConsoleIO_ReadBlockStore'
import lang from '@/lib/filters/lang'
import { createDefaultBlockTypeInstallerFor } from '@/store/builder'
import ResourceEditor from '../resource-editors/ResourceEditor.vue'
import BlockNameEditor from '../block-editors/NameEditor.vue'
import BlockLabelEditor from '../block-editors/LabelEditor.vue'
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
import BlockFormatStringEditor from '../block-editors/FormatStringEditor.vue'
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
import BlockId from '../block-editors/BlockId.vue'

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const builderVuexNamespace = namespace('builder')

  @Component<any>({
    components: {
      ResourceEditor,
      BlockNameEditor,
      BlockLabelEditor,
      BlockSemanticLabelEditor,
      BlockFormatStringEditor,
      FirstBlockEditorButton,
      TextEditor,
      BlockId,
    },
    mixins: [lang],
  })
class ConsoleIO_ReadBlock extends Vue {
    @Prop()readonly block!: IReadBlock

    @Prop()readonly flow!: IFlow

    filterVariableName(e) {
      if (e.key.match(/\W+|Enter/g)) {
        e.preventDefault()
      }
    }

    updatedestinationVariables(value, i) {
      this.editDestinationVariable({ variableName: value, keyIndex: i })
    }

    @blockVuexNamespace.Action setFormatString!: (newFormatString: string) => Promise<string>

    @blockVuexNamespace.Action editDestinationVariable!: ({
      variableName: string,
      keyIndex: number,
    }) => Promise<string>

    @blockVuexNamespace.Getter destinationVariablesFields!: () => Promise<string[]>

    @builderVuexNamespace.Getter isEditable !: boolean
  }

export default ConsoleIO_ReadBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, ReadStore)
</script>
