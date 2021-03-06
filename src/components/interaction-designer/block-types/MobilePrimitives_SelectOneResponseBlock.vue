<template>
  <div class="mobile-primitive-select-one-response-block">
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
      <first-block-editor-button
        :flow="flow"
        :block-id="block.uuid" />
    </fieldset>

    <block-id :block="block" />
  </div>
</template>

<script lang="ts">
import {IFlow, IResource} from '@floip/flow-runner'
import {ISelectOneResponseBlock} from '@floip/flow-runner/src/model/block/ISelectOneResponseBlock'
import {namespace} from 'vuex-class'
import {Component, Prop, Watch} from 'vue-property-decorator'

import SelectOneStore, {BLOCK_TYPE, IInflatedChoicesInterface} from '@/store/flow/block-types/MobilePrimitives_SelectOneResponseBlockStore'
import Lang from '@/lib/filters/lang'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import {mixins} from 'vue-class-component'
import BlockNameEditor from '../block-editors/NameEditor.vue'
import BlockLabelEditor from '../block-editors/LabelEditor.vue'
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
import BlockExitSemanticLabelEditor from '../block-editors/ExitSemanticLabelEditor.vue'
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
import ResourceEditor from '../resource-editors/ResourceEditor.vue'
import BlockId from '../block-editors/BlockId.vue'

const flowVuexNamespace = namespace('flow')
const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const builderVuexNamespace = namespace('builder')

@Component<any>({
  components: {
    BlockNameEditor,
    BlockLabelEditor,
    BlockSemanticLabelEditor,
    BlockExitSemanticLabelEditor,
    FirstBlockEditorButton,
    ResourceEditor,
    BlockId,
  },
})
export class MobilePrimitives_SelectOneResponseBlock extends mixins(Lang) {
  @Prop() readonly block!: ISelectOneResponseBlock

  @Prop() readonly flow!: IFlow

  showSemanticLabel = false

  get promptResource(): IResource {
    return this.resourcesByUuid[this.block.config.prompt]
  }

  get questionPromptResource(): IResource {
    return this.resourcesByUuid[this.block.config.question_prompt || '']
  }

  get choicesPromptResource(): IResource {
    return this.resourcesByUuid[this.block.config.choices_prompt || '']
  }

  @Watch('inflatedChoices', {deep: true})
  onChoicesChanged(newChoices: object) {
    console.debug('Watched inflatedChoices', newChoices)
    this.editSelectOneResponseBlockChoice()
  }

  @Watch('inflatedEmptyChoice', {deep: true})
  onEmptyChoiceChanged(newChoice: object, oldChoice: object) {
    console.debug('Watched inflatedEmptyChoice', newChoice, oldChoice)
    this.editEmptyChoice({choice: oldChoice as IInflatedChoicesInterface})
  }

  @flowVuexNamespace.Getter resourcesByUuid!: { [key: string]: IResource }

  @blockVuexNamespace.Getter inflatedChoices?: { [key: string]: IResource }
  @blockVuexNamespace.State inflatedEmptyChoice?: { [key: string]: IResource }

  @blockVuexNamespace.Action editSelectOneResponseBlockChoice!: () => Promise<object>
  @blockVuexNamespace.Action editEmptyChoice!: ({choice}: { choice: IInflatedChoicesInterface }) => Promise<object>

  @builderVuexNamespace.Getter isEditable !: boolean
}

export default MobilePrimitives_SelectOneResponseBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, SelectOneStore)
</script>
