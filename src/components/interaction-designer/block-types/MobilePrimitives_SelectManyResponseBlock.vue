<template>
  <div class="mobile-primitive-select-many-response-block">
    <h3 class="no-room-above">
      {{'flow-builder.edit-block-type' | trans({block_type: trans(`flow-builder.${block.type}`)})}}
    </h3>
    <fieldset :disabled="!isEditable">
      <block-name-editor :block="block" />
      <block-label-editor :block="block" />
      <block-semantic-label-editor :block="block" />
      <div class="prompt-resource">
        <resource-editor v-if="promptResource"
                         :label="'flow-builder.prompt' | trans"
                         :resource="promptResource"
                         :block="block"
                         :flow="flow" />
      </div>
      <div class="question-prompt-resource">
        <resource-editor v-if="questionPromptResource"
                         :label="'flow-builder.question-prompt' | trans"
                         :resource="questionPromptResource"
                         :block="block"
                         :flow="flow" />
      </div>
      <div class="choices-prompt-resource">
        <resource-editor v-if="choicesPromptResource"
                         :label="'flow-builder.choices-prompt' | trans"
                         :resource="choicesPromptResource"
                         :block="block"
                         :flow="flow" />
      </div>
      <div class="form-group">
        <!--Show non empty choices-->
        <template v-for="(choiceKey) in Object.keys(inflatedChoices)" >
          <hr/>
          <h4>{{`Choice ${choiceKey}`}}</h4>
          <block-exit-semantic-label-editor v-if="inflatedChoices[choiceKey].exit"
                                            :exit="inflatedChoices[choiceKey].exit"
                                            :block="block"/>

          <resource-editor :resource="inflatedChoices[choiceKey].resource"
                           :block="block"
                           :flow="flow" />
        </template>
        <!--Show empty choice-->
        <hr/>
        <h4>{{`Choice ${Object.keys(inflatedChoices).length + 1}`}}</h4>
        <block-exit-semantic-label-editor :exit="inflatedEmptyChoice.exit"/>

        <resource-editor :resource="inflatedEmptyChoice.resource"
                         :block="block"
                         :flow="flow" />
      </div>

      <block-output-branching-config :block="block" @commitIsSegregatedBranching="handleBranchingTypeChange"/>

      <slot name="extras"></slot>
      <first-block-editor-button
          :flow="flow"
          :block-id="block.uuid" />
    </fieldset>

    <block-id :block="block" />

  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import SelectManyResponseStore, { BLOCK_TYPE } from '@/store/flow/block-types/MobilePrimitives_SelectManyResponseBlockStore'
import { namespace } from 'vuex-class'
import { createDefaultBlockTypeInstallerFor } from '@/store/builder'

import SelectOneResponseBlock from './MobilePrimitives_SelectOneResponseBlock.vue'
import {IInflatedChoicesInterface} from "@/store/flow/block-types/MobilePrimitives_SelectOneResponseBlockStore";

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const builderVuexNamespace = namespace('builder')

@Component({})
export class MobilePrimitives_SelectManyResponseBlock extends SelectOneResponseBlock {
  //Important: Even we extends from SelectOneResponseBlock, to avoid conflict we SHOULD re-declare @blockVuexNamespace based getter, state, action, mutation
  @blockVuexNamespace.Getter inflatedChoices?: { [key: string]: IInflatedChoicesInterface }
  @blockVuexNamespace.State inflatedEmptyChoice?: IInflatedChoicesInterface

  @blockVuexNamespace.Action editSelectOneResponseBlockChoice!: () => Promise<object>
  @blockVuexNamespace.Action editEmptyChoice!: () => Promise<object>

  @builderVuexNamespace.Getter isEditable !: boolean
}

export default MobilePrimitives_SelectManyResponseBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, SelectManyResponseStore)
</script>
