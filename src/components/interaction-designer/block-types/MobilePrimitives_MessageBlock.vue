<template>
  <div>
    <h3 class="no-room-above">
      {{
        "flow-builder.edit-block-type" | trans({ block_type: trans(`flow-builder.${block.type}`) })
      }}
    </h3>

    <fieldset :disabled="!isEditable">
      <block-name-editor :block="block" />
      <block-label-editor :block="block" />
      <block-semantic-label-editor :block="block" />
      <resource-editor
        v-if="promptResource"
        :resource="promptResource"
        :block="block"
        :flow="flow"
      />
      <first-block-editor-button :flow="flow" :block-id="block.uuid" />
    </fieldset>

    <block-id :block="block" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {namespace} from 'vuex-class'
import {Component, Prop} from 'vue-property-decorator'

import {IFlow} from '@floip/flow-runner'
import {IMessageBlock} from '@floip/flow-runner/src/model/block/IMessageBlock'
import {IResourceDefinition} from '@floip/flow-runner/src/domain/IResourceResolver'

import MessageStore, {
  BLOCK_TYPE,
} from '@/store/flow/block-types/MobilePrimitives_MessageBlockStore'
import lang from '@/lib/filters/lang'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import ResourceEditor from '../resource-editors/ResourceEditor.vue'
import BlockNameEditor from '../block-editors/NameEditor.vue'
import BlockLabelEditor from '../block-editors/LabelEditor.vue'
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
import BlockId from '../block-editors/BlockId.vue'

const flowVuexNamespace = namespace('flow')
const builderVuexNamespace = namespace('builder')

@Component<any>({
  components: {
    ResourceEditor,
    BlockNameEditor,
    BlockLabelEditor,
    BlockSemanticLabelEditor,
    FirstBlockEditorButton,
    BlockId,
  },
  mixins: [lang],
})
class MobilePrimitives_MessageBlock extends Vue {
  @Prop() readonly block!: IMessageBlock;

  @Prop() readonly flow!: IFlow;

  get promptResource(): IResourceDefinition {
    return this.resourcesByUuid[this.block.config.prompt]
  }

  @flowVuexNamespace.Getter resourcesByUuid!: { [key: string]: IResourceDefinition };

  @builderVuexNamespace.Getter isEditable!: boolean;
}

export default MobilePrimitives_MessageBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, MessageStore)
</script>
