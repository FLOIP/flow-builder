<template>
  <div>
    <h3 class="no-room-above">
      {{ 'flow-builder.edit-block-type' | trans({ block_type: trans(`flow-builder.${block.type}`) }) }}
    </h3>

    <block-name-editor :block="block"/>
    <block-label-editor :block="block"/>
    <block-semantic-label-editor :block="block"/>

    <group-selector :block="block"/>

    <first-block-editor-button
        :flow="flow"
        :block-id="block.uuid"/>

    <block-id :block="block"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { namespace } from 'vuex-class'
import { Component, Prop } from 'vue-property-decorator'

import {
  IFlow,
  IBlock,
} from '@floip/flow-runner'
import BlockNameEditor from '../block-editors/NameEditor.vue'
import BlockLabelEditor from '../block-editors/LabelEditor.vue'
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
import BlockId from '../block-editors/BlockId.vue'
import GroupSelector from '@/components/interaction-designer/block-editors/GroupSelector.vue'

import SetGroupMembershipStore, { BLOCK_TYPE } from '@/store/flow/block-types/Core_SetGroupMembershipStore'
import lang from '@/lib/filters/lang'
import { createDefaultBlockTypeInstallerFor } from '@/store/builder'
import { get } from 'lodash'

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)

//providing this generic is required by tsserver checking but not in the build run by yarn storybook
//TODO - understand what is going on here and if there is something more correct we should have instead
@Component<any>({
  components: {
    BlockNameEditor,
    BlockLabelEditor,
    BlockSemanticLabelEditor,
    FirstBlockEditorButton,
    BlockId,
    GroupSelector,
  },
  mixins: [lang],
})
class Core_SetGroupMembershipBlock extends Vue {
  @Prop() readonly block!: IBlock
  @Prop() readonly flow!: IFlow

  get propertyValue(): string {
    return get(this.block, 'config.set_contact_property.property_value', '')
  }
}

export default Core_SetGroupMembershipBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, SetGroupMembershipStore)
</script>
