<template>
  <div class="mobile-primitive-select-many-response-block">
    <h3 class="no-room-above">
      {{ `flow-builder.${block.type}` | trans }}
    </h3>
    <fieldset :disabled="!isEditable">
      <block-label-editor
        :block="block"
        @gearClicked="showSemanticLabel = !showSemanticLabel" />
      <block-semantic-label-editor
        v-if="showSemanticLabel"
        :block="block" />
      <block-name-editor :block="block" />

      <div class="prompt-resource">
        <resource-editor
          v-if="promptResource"
          :label="'flow-builder.prompt' | trans"
          :resource="promptResource"
          :block="block"
          :flow="flow" />
      </div>

      <hr>

      <choices-builder :block="block" />

      <block-output-branching-config :block="block" />

      <slot name="extras"></slot>

      <categorization :block="block" />

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
import {Component} from 'vue-property-decorator'
import SelectManyResponseStore, {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_SelectManyResponseBlockStore'
import {namespace} from 'vuex-class'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import Categorization from '@/components/interaction-designer/block-editors/Categorization.vue'
import BlockNameEditor from '../block-editors/NameEditor.vue'
import BlockLabelEditor from '../block-editors/LabelEditor.vue'
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
import BlockExitSemanticLabelEditor from '../block-editors/ExitSemanticLabelEditor.vue'
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
import ResourceEditor from '../resource-editors/ResourceEditor.vue'
import BlockId from '../block-editors/BlockId.vue'
import SelectOneResponseBlock from './MobilePrimitives_SelectOneResponseBlock.vue'
import GenericContactPropertyEditor from '../block-editors/GenericContactPropertyEditor.vue'

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const builderVuexNamespace = namespace('builder')

@Component({
  components: {
    GenericContactPropertyEditor,
    BlockNameEditor,
    BlockLabelEditor,
    BlockSemanticLabelEditor,
    BlockExitSemanticLabelEditor,
    FirstBlockEditorButton,
    ResourceEditor,
    BlockId,
    Categorization,
  },
})
export class MobilePrimitives_SelectManyResponseBlock extends SelectOneResponseBlock {
  showSemanticLabel = false

  //Important: Even we extends from SelectOneResponseBlock, to avoid conflict
  // we SHOULD re-declare @blockVuexNamespace based getter, state, action, mutation
  @builderVuexNamespace.Getter declare isEditable: boolean
}

export default MobilePrimitives_SelectManyResponseBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, SelectManyResponseStore)
</script>
