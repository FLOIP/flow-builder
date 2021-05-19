<template>
  <div class="core-case-block">
    <h3 class="no-room-above">
      {{'flow-builder.edit-block-type' | trans({block_type: trans(`flow-builder.${block.type}`)})}}
    </h3>

    <fieldset :disabled="!isEditable">
      <block-name-editor :block="block" />
      <block-label-editor :block="block" />
      <block-semantic-label-editor :block="block" />

      <div v-for="(exit,i) in exits" class="form-group form-inline">
        <expression-editor :label="i+1"
            :placeholder="'flow-builder.edit-expression' | trans"
            :current-expression="exit.test"
            :expression-identifier="exit.uuid"
            @commitExpressionChange="editCaseBlockExit"/>
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
import { namespace } from 'vuex-class'
import { Component, Prop } from 'vue-property-decorator'

import { ICaseBlock } from '@floip/flow-runner/src/model/block/ICaseBlock'
import { IBlockExitTestRequired, IFlow, IBlockExit } from '@floip/flow-runner'
import ExpressionEditor from '@/components/common/ExpressionEditor.vue'

import CaseStore, { BLOCK_CLASS_CONFIG } from '@/store/flow/block-types/Core_CaseBlockStore'
import Lang from '@/lib/filters/lang'
import { createDefaultBlockTypeInstallerFor } from '@/store/builder'
import BlockNameEditor from '../block-editors/NameEditor.vue'
import BlockLabelEditor from '../block-editors/LabelEditor.vue'
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
import BlockId from '../block-editors/BlockId.vue'
import { mixins } from 'vue-class-component'

const blockVuexNamespace = namespace(`flow/${BLOCK_CLASS_CONFIG.type}`)
const builderVuexNamespace = namespace('builder')

@Component({
  components: {
    ExpressionEditor,
    BlockNameEditor,
    BlockLabelEditor,
    BlockSemanticLabelEditor,
    FirstBlockEditorButton,
    BlockId,
  },
})
class Core_CaseBlock extends mixins(Lang) {
    @Prop()readonly block!: ICaseBlock

    @Prop()readonly flow!: IFlow

    get exits(): IBlockExitTestRequired[] {
      return this.block.exits
    }

    @blockVuexNamespace.Action editCaseBlockExit!: ({ exitId, value }: {exitId: string; value: string}) => Promise<IBlockExit>

    @builderVuexNamespace.Getter isEditable !: boolean
  }

export default Core_CaseBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_CLASS_CONFIG.type, CaseStore)
</script>
