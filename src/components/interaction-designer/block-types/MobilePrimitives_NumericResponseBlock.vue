<template>
  <div class="mobile-primitive-numeric-response-block">
    <base-block
      :block="block"
      :flow="flow"
      :show-semantic-label="false"
      :uses-default-contact-props-editor="usesDefaultContactPropsEditor"
      :uses-default-branching-editor="usesDefaultBranchingEditor"
      @handleBranchingTypeChangedToUnified="handleBranchingTypeChangedToUnified({block})">
      <slot
        slot="resource-editors"
        name="resource-editors">
        <resource-editor
          v-if="promptResource"
          :resource="promptResource"
          :block="block"
          :flow="flow" />
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
      <slot name="vendor-extras" />
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

import {IBlock, IBlockExit, IFlow, IResource} from '@floip/flow-runner'
import {INumericResponseBlock} from '@floip/flow-runner/src/model/block/INumericResponseBlock'

import NumericStore, {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_NumericResponseBlockStore'
import Lang from '@/lib/filters/lang'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import {mixins} from 'vue-class-component'
import {
  IBlockWithBranchingType,
  OutputBranchingType,
} from '@/components/interaction-designer/block-editors/BlockOutputBranchingConfig.vue'

const flowVuexNamespace = namespace('flow')
const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const builderVuexNamespace = namespace('builder')

@Component({})
class MobilePrimitives_NumericResponseBlock extends mixins(Lang) {
  @Prop() readonly block!: INumericResponseBlock
  @Prop() readonly flow!: IFlow
  @Prop({default: true}) readonly usesDefaultBranchingEditor!: boolean
  @Prop({default: true}) readonly usesDefaultContactPropsEditor!: boolean

  get promptResource(): IResource {
    return this.resourcesByUuidOnActiveFlow[this.block.config.prompt]
  }

  updateValidationMin(value: number | string): void {
    this.setValidationMinimum({blockId: this.block.uuid, value})
    this.handleActionsAccordingToBranchingType()
  }

  updateValidationMax(value: number | string): void {
    this.setValidationMaximum({blockId: this.block.uuid, value})
    this.handleActionsAccordingToBranchingType()
  }

  updateMaxDigits(value: number | string): void {
    this.setMaxDigits({blockId: this.block.uuid, value})
  }

  handleActionsAccordingToBranchingType(): void {
    const {vendor_metadata: metadata} = this.block as unknown as IBlockWithBranchingType
    const {UNIFIED} = OutputBranchingType

    if (metadata.io_viamo.branchingType === UNIFIED) {
      this.handleBranchingTypeChangedToUnified({block: this.block})
    }
  }

  @flowVuexNamespace.Getter resourcesByUuidOnActiveFlow!: { [key: string]: IResource }

  @flowVuexNamespace.Getter hasVoiceMode!: boolean

  @flowVuexNamespace.Action block_convertExitFormationToUnified!:
    ({blockId, test}: {blockId: IBlock['uuid'], test: IBlockExit['test']}) => Promise<void>

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
