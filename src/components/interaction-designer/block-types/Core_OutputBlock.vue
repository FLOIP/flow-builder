<template>
  <div class="core-output-block">
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
          :message-key="`block/${block.uuid}/config/value`">
          <expression-input
            :label="'flow-builder.output-expression' | trans"
            :placeholder="'flow-builder.enter-expression' | trans"
            :current-expression="value"
            :valid-state="isValid"
            @commitExpressionChange="commitExpressionChange" />
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
import {IOutputBlock} from '@floip/flow-runner/src/model/block/IOutputBlock'
import {IBlock, IFlow} from '@floip/flow-runner'
import OutputStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_OutputBlockStore'
import Lang from '@/lib/filters/lang'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import {mixins} from 'vue-class-component'

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const builderVuexNamespace = namespace('builder')

@Component({})
class Core_OutputBlock extends mixins(Lang) {
  @Prop() readonly block!: IOutputBlock
  @Prop() readonly flow!: IFlow
  @Prop({default: true}) readonly usesDefaultBranchingEditor!: boolean
  @Prop({default: false}) readonly usesDefaultContactPropsEditor!: boolean

  get value(): string {
    return this.block.config.value || ''
  }

  @blockVuexNamespace.Action editOutputExpression!: (params: { blockId: string, value: string }) => Promise<string>
  @blockVuexNamespace.Action handleBranchingTypeChangedToUnified!: ({block}: {block: IBlock}) => void

  @builderVuexNamespace.Getter isEditable !: boolean

  commitExpressionChange(value: string): Promise<string> {
    return this.editOutputExpression({blockId: this.block.uuid, value})
  }
}

export default Core_OutputBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, OutputStore)
</script>
