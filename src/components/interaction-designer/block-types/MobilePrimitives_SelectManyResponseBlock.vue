<template>
  <div class="mobile-primitive-select-many-response-block">
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

      <div class="prompt-resource">
        <resource-editor
          v-if="promptResource"
          :label="'flow-builder.prompt' | trans"
          :resource="promptResource"
          :block="block"
          :flow="flow" />
      </div>

      <choices-builder :block="block" />

      <hr>

      <block-output-branching-config :block="block" />

      <slot name="extras"></slot>

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
import SelectOneResponseBlock from './MobilePrimitives_SelectOneResponseBlock.vue'

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const builderVuexNamespace = namespace('builder')

@Component({})
export class MobilePrimitives_SelectManyResponseBlock extends SelectOneResponseBlock {
  showSemanticLabel = false

  //Important: Even we extends from SelectOneResponseBlock, to avoid conflict
  // we SHOULD re-declare @blockVuexNamespace based getter, state, action, mutation
  @builderVuexNamespace.Getter declare isEditable: boolean
}

export default MobilePrimitives_SelectManyResponseBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, SelectManyResponseStore)
</script>
