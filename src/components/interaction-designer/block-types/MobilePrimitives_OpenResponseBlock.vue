<template>
  <div>
    <h3 class="no-room-above">
      {{'flow-builder.edit-block-type' | trans({block_type: trans(`flow-builder.${block.type}`)})}}
    </h3>

    <block-name-editor :block="block" />
    <block-label-editor :block="block" />
    <block-semantic-label-editor :block="block" />

    <block-max-duration-seconds-editor :block="block" :hasIvr="hasVoiceMode" @commitMaxDurationChange="setMaxDurationSeconds"/>
    <block-max-response-characters-editor :block="block" :hasText="hasTextMode" @commitMaxResponseCharactersChange="setMaxResponseCharacters"/>

    <resource-editor v-if="promptResource"
                     :resource="promptResource"
                     :block="block"
                     :flow="flow" />

    <first-block-editor-button
        :flow="flow"
        :block-id="block.uuid" />

    <block-id :block="block" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { namespace } from 'vuex-class'
import { Component, Prop } from 'vue-property-decorator'

import { IBlockExit, IFlow } from '@floip/flow-runner'
import { IOpenResponseBlock } from '@floip/flow-runner/src/model/block/IOpenResponseBlock'
import {
  IResourceDefinition,
} from '@floip/flow-runner/src/domain/IResourceResolver'

import OpenResponseStore, { BLOCK_TYPE } from '@/store/flow/block-types/MobilePrimitives_OpenResponseBlockStore'
import lang from '@/lib/filters/lang'
import { createDefaultBlockTypeInstallerFor } from '@/store/builder'
import ResourceEditor from '../resource-editors/ResourceEditor.vue'
import BlockNameEditor from '../block-editors/NameEditor.vue'
import BlockLabelEditor from '../block-editors/LabelEditor.vue'
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
import BlockId from '../block-editors/BlockId.vue'
import BlockMaxDurationSecondsEditor from '../block-editors/MaxDurationSecondsEditor.vue'
import BlockMaxResponseCharactersEditor from '../block-editors/MaxResponseCharactersEditor.vue'

const flowVuexNamespace = namespace('flow')
const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)

  @Component<any>({
    components: {
      ResourceEditor,
      BlockNameEditor,
      BlockLabelEditor,
      BlockSemanticLabelEditor,
      FirstBlockEditorButton,
      BlockId,
      BlockMaxDurationSecondsEditor,
      BlockMaxResponseCharactersEditor,
    },
    mixins: [lang],
  })
class MobilePrimitives_OpenResponseBlock extends Vue {
    @Prop()readonly block!: IOpenResponseBlock

    @Prop()readonly flow!: IFlow

    get promptResource(): IResourceDefinition {
      return this.resourcesByUuid[this.block.config.prompt]
    }

    @flowVuexNamespace.Getter resourcesByUuid!: {[key: string]: IResourceDefinition}

    @flowVuexNamespace.Getter hasTextMode

    @flowVuexNamespace.Getter hasVoiceMode

    @blockVuexNamespace.Action setMaxDurationSeconds!: (newDuration: number) => Promise<string>

    @blockVuexNamespace.Action setMaxResponseCharacters!: (newLength: number) => Promise<string>
  }

export default MobilePrimitives_OpenResponseBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, OpenResponseStore)
</script>
