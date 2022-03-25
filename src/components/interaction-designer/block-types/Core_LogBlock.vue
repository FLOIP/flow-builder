<template>
  <div class="core-log-block">
    <h3 class="block-editor-header">
      {{ `flow-builder.${block.type}` | trans }}
    </h3>
    <fieldset :disabled="!isEditable">
      <label-editor
        :block="block"
        @gearClicked="showSemanticLabel = !showSemanticLabel" />
      <semantic-label-editor
        v-if="showSemanticLabel"
        :block="block" />
      <name-editor :block="block" />

      <slot name="extras" />

      <validation-message
        #input-control="{ isValid }"
        :message-key="`block/${block.uuid}/config/message`">
        <expression-input
          :label="'flow-builder.log-message' | trans"
          :placeholder="'flow-builder.enter-message' | trans"
          :current-expression="value"
          :valid-state="isValid"
          @commitExpressionChange="commitMessageChange" />
      </validation-message>

      <hr>

      <block-output-branching-config
        :block="block"
        :has-exit-per-choice="false"
        @branchingTypeChangedToUnified="handleBranchingTypeChangedToUnified({block})" />

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

import {IFlow, IBlock} from '@floip/flow-runner'
import {ILogBlock} from '@floip/flow-runner/src/model/block/ILogBlock'

import LogStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_LogBlockStore'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import Lang from '@/lib/filters/lang'
import {mixins} from 'vue-class-component'

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const builderVuexNamespace = namespace('builder')

@Component({})
class Core_LogBlock extends mixins(Lang) {
  @Prop() readonly block!: ILogBlock

  @Prop() readonly flow!: IFlow

  showSemanticLabel = false

  get value(): string {
    return this.block.config.message || ''
  }

  commitMessageChange(value: string): Promise<string> {
    return this.editMessage({blockId: this.block.uuid, message: value})
  }

  @blockVuexNamespace.Action editMessage!: (params: { blockId: string, message: string }) => Promise<string>
  @blockVuexNamespace.Action handleBranchingTypeChangedToUnified!: ({block}: {block: IBlock}) => void
  @builderVuexNamespace.Getter isEditable !: boolean
}

export default Core_LogBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, LogStore)
</script>
