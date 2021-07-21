<template>
  <div class="mobile-primitive-select-one-response-block">
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

      <hr>

      <div class="form-group">
        <h4>{{'flow-builder.choices' | trans}}</h4>

        <!--Show non empty choices-->
        <template v-for="(choiceKey) in Object.keys(inflatedChoices)">
          <!-- we're just making a best guess as to which variant to use
               based on how this instance of flow-builder works -->
          <resource-variant-text-editor
            :label="choiceKey.toString()"
            :rows="1"
            :placeholder="'Enter choice...'"
            :resource-id="inflatedChoices[choiceKey].resource.uuid"
            :resource-variant="findOrGenerateStubbedVariantOn(
              inflatedChoices[choiceKey].resource,
              {language_id: flow.languages[0].id, content_type: SupportedMode.TEXT, modes: [SupportedContentType.TEXT]})"
            :mode="'TEXT'" />

        </template>

        <!--Show empty choice-->
        <resource-variant-text-editor
          :label="(Object.keys(inflatedChoices).length + 1).toString()"
          :rows="1"
          :placeholder="'Enter choice...'"
          :resource-id="inflatedEmptyChoice.resource.uuid"
          :resource-variant="findOrGenerateStubbedVariantOn(
              inflatedEmptyChoice.resource,
              {language_id: flow.languages[0].id, content_type: SupportedMode.TEXT, modes: [SupportedContentType.TEXT]})"
          :mode="'TEXT'" />
      </div>

      <hr>

      <div class="prompt-resource">
        <resource-editor
          v-if="promptResource"
          :label="'flow-builder.prompt' | trans"
          :resource="promptResource"
          :block="block"
          :flow="flow" />
      </div>

      <categorization :block="block" />

      <generic-contact-property-editor :block="block" />

      <hr>

      <slot name="extras" />

      <first-block-editor-button
        :flow="flow"
        :block-id="block.uuid" />

    </fieldset>

    <block-id :block="block" />

  </div>
</template>

<script lang="ts">
import {IFlow, IResource, SupportedContentType, SupportedMode} from '@floip/flow-runner'
import {ISelectOneResponseBlock} from '@floip/flow-runner/src/model/block/ISelectOneResponseBlock'
import {namespace} from 'vuex-class'
import {Component, Prop, Watch} from 'vue-property-decorator'

import SelectOneStore, {BLOCK_TYPE, IInflatedChoicesInterface} from '@/store/flow/block-types/MobilePrimitives_SelectOneResponseBlockStore'
import Lang from '@/lib/filters/lang'
import Categorization from '@/components/interaction-designer/block-editors/Categorization.vue'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import {mixins} from 'vue-class-component'
import ResourceVariantTextEditor from '@/components/interaction-designer/resource-editors/ResourceVariantTextEditor.vue'
import {findOrGenerateStubbedVariantOn} from '@/store/flow/resource'
import BlockNameEditor from '../block-editors/NameEditor.vue'
import BlockLabelEditor from '../block-editors/LabelEditor.vue'
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
import BlockExitSemanticLabelEditor from '../block-editors/ExitSemanticLabelEditor.vue'
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
import ResourceEditor from '../resource-editors/ResourceEditor.vue'
import BlockId from '../block-editors/BlockId.vue'
import GenericContactPropertyEditor from '../block-editors/GenericContactPropertyEditor.vue'

const flowVuexNamespace = namespace('flow')
const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const builderVuexNamespace = namespace('builder')

@Component({
  components: {
    GenericContactPropertyEditor,
    ResourceVariantTextEditor,
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
export class MobilePrimitives_SelectOneResponseBlock extends mixins(Lang) {
  @Prop() readonly block!: ISelectOneResponseBlock

  @Prop() readonly flow!: IFlow

  showSemanticLabel = false

  SupportedContentType = SupportedContentType
  SupportedMode = SupportedMode
  findOrGenerateStubbedVariantOn = findOrGenerateStubbedVariantOn

  get promptResource(): IResource {
    return this.resourcesByUuid[this.block.config.prompt]
  }

  get questionPromptResource(): IResource {
    return this.resourcesByUuid[this.block.config.question_prompt || '']
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
