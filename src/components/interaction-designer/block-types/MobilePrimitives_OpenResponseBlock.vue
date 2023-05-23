<template>
  <div class="mobile-primitives-open-response-block">
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
        <max-duration-seconds-editor
          :block="block"
          :has-ivr="hasVoiceMode"
          @commitMaxDurationChange="updateMaxDurationSeconds" />
        <end-recording-digits-editor
          :block="block"
          :has-ivr="hasVoiceMode"
          @commitEndRecordingDigitsChange="updateEndRecordingDigits" />
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

import {IBlock} from '@floip/flow-runner'
import {IOpenResponseBlock} from '@floip/flow-runner/src/model/block/IOpenResponseBlock'
import OpenResponseStore, {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_OpenResponseBlockStore'
import Lang from '@/lib/filters/lang'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import {mixins} from 'vue-class-component'

const flowVuexNamespace = namespace('flow')
const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const builderVuexNamespace = namespace('builder')
const undoRedoVuexNamespace = namespace('undoRedo')

@Component({})
class MobilePrimitives_OpenResponseBlock extends mixins(Lang) {
  @Prop() readonly block!: IOpenResponseBlock
  @Prop({default: true}) readonly usesDefaultBranchingEditor!: boolean
  @Prop({default: true}) readonly usesDefaultContactPropsEditor!: boolean

  async updateMaxDurationSeconds(newDuration: number): Promise<void> {
    await this.setMaxDurationSeconds(newDuration)
    await this.takeSnapshot()
  }

  async updateEndRecordingDigits(value: number): Promise<void> {
    await this.setEndRecordingDigits(value)
    await this.takeSnapshot()
  }

  @flowVuexNamespace.Getter hasTextMode!: boolean
  @flowVuexNamespace.Getter hasVoiceMode!: boolean
  @blockVuexNamespace.Action setMaxDurationSeconds!: (newDuration: number) => Promise<void>
  @blockVuexNamespace.Action setEndRecordingDigits!: (endRecordingDigits: string) => Promise<void>
  @blockVuexNamespace.Action handleBranchingTypeChangedToUnified!: ({block}: {block: IBlock}) => Promise<void>
  @builderVuexNamespace.Getter isEditable !: boolean
  @undoRedoVuexNamespace.Action takeSnapshot: () => Promise<void>
}

export default MobilePrimitives_OpenResponseBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, OpenResponseStore)
</script>
