<template>
  <div class="core-log-block">
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

      <slot name="extras" />

      <div class="text-only-resource-editor">
        <hr>

        <h4>Log Message</h4>
        <template v-for="{id: languageId, label: language} in flow.languages">
          <div class="block-content-editor-lang">
            <h5 class="badge badge-info">
              {{ language || 'flow-builder.unknown-language' | trans }}
            </h5>
          </div>

          <template v-for="mode in flow.supported_modes">
            <h6>{{ `flow-builder.${mode.toLowerCase()}-content` | trans }}</h6>
            <resource-variant-text-editor
              :resource-id="messageResource.uuid"
              :resource-variant="findOrGenerateStubbedVariantOn(
                messageResource,
                {language_id: languageId, content_type: ['text'], modes: [mode]})"
              :mode="mode"
              :enable-autogen-button="true || enableAutogenButton" />
          </template>
        </template>
      </div>

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
import {namespace} from 'vuex-class'
import {Component, Prop} from 'vue-property-decorator'

import {IFlow, IResource} from '@floip/flow-runner'
import {ILogBlock} from '@floip/flow-runner/src/model/block/ILogBlock'

import {findOrGenerateStubbedVariantOn} from '@/store/flow/resource'
import LogStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_LogBlockStore'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import Lang from '@/lib/filters/lang'
import Categorization from '@/components/interaction-designer/block-editors/Categorization.vue'
import {mixins} from 'vue-class-component'
import ResourceEditor from '../resource-editors/ResourceEditor.vue'
import ResourceVariantTextEditor from '../resource-editors/ResourceVariantTextEditor.vue'
import BlockNameEditor from '../block-editors/NameEditor.vue'
import BlockLabelEditor from '../block-editors/LabelEditor.vue'
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
import BlockId from '../block-editors/BlockId.vue'
import GenericContactPropertyEditor from '../block-editors/GenericContactPropertyEditor.vue'

const flowVuexNamespace = namespace('flow')
const builderVuexNamespace = namespace('builder')

@Component({
  components: {
    GenericContactPropertyEditor,
    ResourceEditor,
    ResourceVariantTextEditor,
    BlockNameEditor,
    BlockLabelEditor,
    BlockSemanticLabelEditor,
    FirstBlockEditorButton,
    BlockId,
    Categorization,
  },
})
class Core_LogBlock extends mixins(Lang) {
  @Prop() readonly block!: ILogBlock

  @Prop() readonly flow!: IFlow

  showSemanticLabel = false

  findOrGenerateStubbedVariantOn = findOrGenerateStubbedVariantOn

  get messageResource(): IResource {
    return this.resourcesByUuid[this.block.config.message]
  }

  @flowVuexNamespace.Getter resourcesByUuid!: { [key: string]: IResource }

  @builderVuexNamespace.Getter isEditable !: boolean
}

export default Core_LogBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, LogStore)
</script>
