<template>
  <div class="mobile-primitive-numeric-response-block">
    <base-block
      :block="block"
      :show-semantic-label="false"
      :uses-default-contact-props-editor="usesDefaultContactPropsEditor"
      :uses-default-branching-editor="usesDefaultBranchingEditor"
      @handleBranchingTypeChangedToUnified="handleBranchingTypeChangedToUnified({block})">
      <slot
        slot="description"
        name="description" />
      <slot
        slot="resource-editors"
        name="resource-editors">
        <per-language-resource-editor :block="block" />
      </slot>
      <slot
        slot="extras"
        name="extras">
        <minimum-numeric-editor
          :block="block"
          @commitValidationMinimumChange="updateValidationMin" />
        <maximum-numeric-editor
          :block="block"
          @commitValidationMaximumChange="updateValidationMax" />
        <max-digit-editor
          :block="block"
          :has-ivr="hasVoiceMode"
          @commitMaxDigitsChange="updateMaxDigits" />
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

import {IBlock, IBlockExit, IFlow, IResource} from '@floip/flow-runner'
import {INumericResponseBlock} from '@floip/flow-runner/src/model/block/INumericResponseBlock'

import NumericStore, {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_NumericResponseBlockStore'
import Lang from '@/lib/filters/lang'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import {mixins} from 'vue-class-component'

const flowVuexNamespace = namespace('flow')
const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const builderVuexNamespace = namespace('builder')

@Component({})
export class MobilePrimitives_NumericResponseBlock extends mixins(Lang) {
  @Prop() readonly block!: INumericResponseBlock
  @Prop({default: true}) readonly usesDefaultBranchingEditor!: boolean
  @Prop({default: true}) readonly usesDefaultContactPropsEditor!: boolean

  updateValidationMin(value: number | string): void {
    this.setValidationMinimum({blockId: this.block.uuid, value})
  }

  updateValidationMax(value: number | string): void {
    this.setValidationMaximum({blockId: this.block.uuid, value})
  }

  updateMaxDigits(value: number | string): void {
    this.setMaxDigits({blockId: this.block.uuid, value})
  }

  @flowVuexNamespace.Getter hasVoiceMode!: boolean

  @blockVuexNamespace.Action setValidationMinimum!: ({
    blockId,
    value,
  }: { blockId: IBlock['uuid'], value: number | string }) => Promise<string>

  @blockVuexNamespace.Action setValidationMaximum!: ({
    blockId,
    value,
  }: { blockId: IBlock['uuid'], value: number | string }) => Promise<string>

  @blockVuexNamespace.Action setMaxDigits!: ({blockId, value}: { blockId: IBlock['uuid'], value: number | string }) => Promise<string>

  @blockVuexNamespace.Action handleBranchingTypeChangedToUnified!: ({block}: {block: IBlock}) => void

  @builderVuexNamespace.Getter isEditable !: boolean
}

export default MobilePrimitives_NumericResponseBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, NumericStore)
</script>
