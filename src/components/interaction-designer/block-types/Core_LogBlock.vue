<template>
  <div class="core-log-block">
    <h3 class="no-room-above">
      {{'flow-builder.edit-block-type' | trans({block_type: trans(`flow-builder.${block.type}`)})}}
    </h3>
    <fieldset :disabled="!isEditable">
      <validation-message :message-key="`block/${block.uuid}/.name`" #input-control="{ isValid: isNameValid }">
        <block-name-editor :block="block" :validationState="!isNameValid" />
      </validation-message>
      <validation-message :message-key="`block/${block.uuid}/.label`" #input-control="{ isValid: isLabelValid }">
        <block-label-editor :block="block" :validationState="!isLabelValid" />
      </validation-message>
      <validation-message :message-key="`block/${block.uuid}/.semantic_label`" #input-control="{ isValid: isSemanticLabelValid }">
        <block-semantic-label-editor :block="block" :validationState="!isSemanticLabelValid" />
      </validation-message>

      <div class="text-only-resource-editor">
        <hr />

        <h4>Log Message</h4>
        <template v-for="{id: languageId, label: language} in flow.languages">
          <div class="block-content-editor-lang">
            <h5 class="badge badge-info">
              {{language || 'flow-builder.unknown-language' | trans}}
            </h5>
          </div>

          <template v-for="mode in flow.supported_modes">
            <h6>{{`flow-builder.${mode.toLowerCase()}-content` | trans}}</h6>
            <resource-variant-text-editor :resource-id="messageResource.uuid"
                                          :resource-variant="findOrGenerateStubbedVariantOn(
                                            messageResource,
                                            {languageId, contentType: ['text'], modes: [mode]})"
                                          :mode="mode"
                                          :enable-autogen-button="true || enableAutogenButton" />
          </template>
        </template>
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

import { IFlow } from '@floip/flow-runner'
import { ILogBlock } from '@floip/flow-runner/src/model/block/ILogBlock'
import { IResourceDefinition } from '@floip/flow-runner/src/domain/IResourceResolver'

import { findOrGenerateStubbedVariantOn } from '@/store/flow/resource'
import LogStore, { BLOCK_TYPE } from '@/store/flow/block-types/Core_LogBlockStore'
import { createDefaultBlockTypeInstallerFor } from '@/store/builder'
import Lang from '@/lib/filters/lang'
import ResourceEditor from '../resource-editors/ResourceEditor.vue'
import ResourceVariantTextEditor from '../resource-editors/ResourceVariantTextEditor.vue'
import BlockNameEditor from '../block-editors/NameEditor.vue'
import BlockLabelEditor from '../block-editors/LabelEditor.vue'
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
import BlockId from '../block-editors/BlockId.vue'
import { mixins } from 'vue-class-component'
import ValidationMessage from '@/components/common/ValidationMessage.vue';

const flowVuexNamespace = namespace('flow')
const builderVuexNamespace = namespace('builder')

@Component({
  components: {
    ResourceEditor,
    ResourceVariantTextEditor,
    BlockNameEditor,
    BlockLabelEditor,
    BlockSemanticLabelEditor,
    FirstBlockEditorButton,
    BlockId,
    ValidationMessage
  },
})
class Core_LogBlock extends mixins(Lang) {
    @Prop()readonly block!: ILogBlock

    @Prop()readonly flow!: IFlow

    findOrGenerateStubbedVariantOn = findOrGenerateStubbedVariantOn

    get messageResource(): IResourceDefinition {
      return this.resourcesByUuid[this.block.config.message]
    }

    @flowVuexNamespace.Getter resourcesByUuid!: {[key: string]: IResourceDefinition}

    @builderVuexNamespace.Getter isEditable !: boolean
  }

export default Core_LogBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, LogStore)
</script>
