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
      <div class="question-prompt-resource">
        <resource-editor
          v-if="questionPromptResource"
          :label="'flow-builder.question-prompt' | trans"
          :resource="questionPromptResource"
          :block="block"
          :flow="flow" />
      </div>
      <div class="choices-prompt-resource">
        <resource-editor
          v-if="choicesPromptResource"
          :label="'flow-builder.choices-prompt' | trans"
          :resource="choicesPromptResource"
          :block="block"
          :flow="flow" />
      </div>
      <div class="form-group">
        <!--Show non empty choices-->
        <template v-for="(choiceKey) in Object.keys(inflatedChoices)">
          <hr>
          <h4>{{ `Choice ${choiceKey}` }}</h4>
          <block-exit-semantic-label-editor
            v-if="inflatedChoices[choiceKey].exit"
            :exit="inflatedChoices[choiceKey].exit"
            :block="block" />

          <resource-editor
            :resource="inflatedChoices[choiceKey].resource"
            :block="block"
            :flow="flow" />
        </template>
        <!--Show empty choice-->
        <hr>
        <h4>{{ `Choice ${Object.keys(inflatedChoices).length + 1}` }}</h4>
        <block-exit-semantic-label-editor :exit="inflatedEmptyChoice.exit" />

        <resource-editor
          :resource="inflatedEmptyChoice.resource"
          :block="block"
          :flow="flow" />
      </div>
      <slot name="extras" />

      <generic-contact-property-editor :block="block" />

      <first-block-editor-button
        :flow="flow"
        :block-id="block.uuid" />
    </fieldset>

    <block-id :block="block" />
  </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator'
import {IResource} from '@floip/flow-runner'
import SelectManyResponseStore, {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_SelectManyResponseBlockStore'
import {namespace} from 'vuex-class'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
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
  },
})
export class MobilePrimitives_SelectManyResponseBlock extends SelectOneResponseBlock {
  showSemanticLabel = false

  //Important: Even we extends from SelectOneResponseBlock, to avoid conflict we SHOULD re-declare @blockVuexNamespace based getter, state, action, mutation
  @blockVuexNamespace.Getter declare inflatedChoices?: { [key: string]: IResource }
  @blockVuexNamespace.State declare inflatedEmptyChoice?: { [key: string]: IResource }

  @blockVuexNamespace.Action declare editSelectOneResponseBlockChoice: () => Promise<object>
  @blockVuexNamespace.Action declare editEmptyChoice: () => Promise<object>

  @builderVuexNamespace.Getter declare isEditable: boolean
}

export default MobilePrimitives_SelectManyResponseBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, SelectManyResponseStore)
</script>
