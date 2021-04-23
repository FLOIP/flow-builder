<template>
  <div class="mobile-primitive-open-response-block">
    <h3 class="no-room-above">
      {{'flow-builder.edit-block-type' | trans({block_type: trans(`flow-builder.${block.type}`)})}}
    </h3>

    <fieldset :disabled="!isEditable">
      <block-name-editor :block="block" />
      <block-label-editor :block="block" />
      <block-semantic-label-editor :block="block" />

      <validation-message :message-key="`block/${block.uuid}/.config.ivr.max_duration_seconds`" #input-control="{ isValid: isMaxDurationValid }">
        <block-max-duration-seconds-editor :block="block" :validationState="!isMaxDurationValid" :hasIvr="hasVoiceMode" @commitMaxDurationChange="setMaxDurationSeconds"/>
      </validation-message>
      <validation-message :message-key="`block/${block.uuid}/.config.text.max_response_characters`" #input-control="{ isValid: isMaxResponseValid }">
        <block-max-response-characters-editor :block="block" :validationState="!isMaxResponseValid" :hasText="hasTextMode" @commitMaxResponseCharactersChange="setMaxResponseCharacters"/>
      </validation-message>

      <resource-editor v-if="promptResource"
                       :resource="promptResource"
                       :block="block"
                       :flow="flow" />
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

import { IBlockExit, IFlow } from '@floip/flow-runner'
import { IOpenResponseBlock } from '@floip/flow-runner/src/model/block/IOpenResponseBlock'
import {
  IResourceDefinition,
} from '@floip/flow-runner/src/domain/IResourceResolver'

import OpenResponseStore, { BLOCK_TYPE } from '@/store/flow/block-types/MobilePrimitives_OpenResponseBlockStore'
import Lang from '@/lib/filters/lang'
import { createDefaultBlockTypeInstallerFor } from '@/store/builder'
import ResourceEditor from '../resource-editors/ResourceEditor.vue'
import BlockNameEditor from '../block-editors/NameEditor.vue'
import BlockLabelEditor from '../block-editors/LabelEditor.vue'
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
import BlockId from '../block-editors/BlockId.vue'
import BlockMaxDurationSecondsEditor from '../block-editors/MaxDurationSecondsEditor.vue'
import BlockMaxResponseCharactersEditor from '../block-editors/MaxResponseCharactersEditor.vue'
import { mixins } from 'vue-class-component'
import ValidationMessage from '@/components/common/ValidationMessage.vue';

const flowVuexNamespace = namespace('flow')
const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const builderVuexNamespace = namespace('builder')

@Component({
  components: {
    ResourceEditor,
    BlockNameEditor,
    BlockLabelEditor,
    BlockSemanticLabelEditor,
    FirstBlockEditorButton,
    BlockId,
    BlockMaxDurationSecondsEditor,
    BlockMaxResponseCharactersEditor,
    ValidationMessage
  },
})
class MobilePrimitives_OpenResponseBlock extends mixins(Lang) {
    @Prop()readonly block!: IOpenResponseBlock

    @Prop()readonly flow!: IFlow

    get promptResource(): IResourceDefinition {
      return this.resourcesByUuid[this.block.config.prompt]
    }

    @flowVuexNamespace.Getter resourcesByUuid!: {[key: string]: IResourceDefinition}

    @flowVuexNamespace.Getter hasTextMode!: boolean

    @flowVuexNamespace.Getter hasVoiceMode!: boolean

    @blockVuexNamespace.Action setMaxDurationSeconds!: (newDuration: number) => Promise<string>

    @blockVuexNamespace.Action setMaxResponseCharacters!: (newLength: number) => Promise<string>

    @builderVuexNamespace.Getter isEditable !: boolean
  }

export default MobilePrimitives_OpenResponseBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, OpenResponseStore)
</script>
