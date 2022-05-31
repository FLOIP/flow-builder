<template>
  <div class="core-log-block">
    <base-block
      :block="block"
      :flow="flow"
      :show-semantic-label="false"
      :uses-default-contact-props-editor="usesDefaultContactPropsEditor"
      :uses-default-branching-editor="usesDefaultBranchingEditor"
      @handleBranchingTypeChangedToUnified="handleBranchingTypeChangedToUnified({block})">
      <slot
        slot="resource-editors"
        name="resource-editors" />
      <slot
        slot="extras"
        name="extras">
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
      </slot>
      <slot
        slot="vendor-extras"
        name="vendor-extras" />
      <slot
        slot="branching"
        name="branching" />
      <slot
        slot="contact-props"
        name="contact-props" />
      <slot
        slot="vendor"
        name="vendor" />
    </base-block>
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
  @Prop({default: true}) readonly usesDefaultBranchingEditor!: boolean
  @Prop({default: false}) readonly usesDefaultContactPropsEditor!: boolean

  get value(): string {
    return this.block.config.message || ''
  }

  commitMessageChange(value: string): Promise<string> {
    return this.editMessage({blockId: this.block.uuid, message: value})
  }

  @blockVuexNamespace.Action editMessage!: (params: { blockId: IBlock['uuid'], message: string }) => Promise<string>
  @blockVuexNamespace.Action handleBranchingTypeChangedToUnified!: ({block}: {block: IBlock}) => void
  @builderVuexNamespace.Getter isEditable !: boolean
}

export default Core_LogBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, LogStore)
</script>
