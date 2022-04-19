<template>
  <div class="console-io-print-block">
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
            :label="'flow-builder.print-message' | trans"
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
    </base-block>
    <slot name="vendor" />
  </div>
</template>

<script lang="ts">
import {namespace} from 'vuex-class'
import {Component, Prop} from 'vue-property-decorator'

import {IBlock, IFlow} from '@floip/flow-runner'
import {IPrintBlock} from '@floip/flow-runner/src/model/block/IPrintBlock'

import PrintStore, {BLOCK_TYPE} from '@/store/flow/block-types/ConsoleIO_PrintBlockStore'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import {mixins} from 'vue-class-component'
import Lang from '@/lib/filters/lang'

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const builderVuexNamespace = namespace('builder')

@Component({})
class ConsoleIO_PrintBlock extends mixins(Lang) {
  @Prop() readonly block!: IPrintBlock
  @Prop() readonly flow!: IFlow
  @Prop({default: true}) readonly usesDefaultBranchingEditor!: boolean
  @Prop({default: false}) readonly usesDefaultContactPropsEditor!: boolean

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

export default ConsoleIO_PrintBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, PrintStore)
</script>
