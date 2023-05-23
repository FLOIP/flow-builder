<template>
  <div class="smart-devices-location-response-block">
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
        <threshold-editor
          :block="block"
          @commitAccuracyThresholdMetersChange="updateThreshold" />
        <timeout-editor
          :block="block"
          @commitAccuracyTimeoutSecondsChange="updateTimeout" />
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
import {IBlock, ILocationResponseBlock} from '@floip/flow-runner'
import LocationStore, {BLOCK_TYPE} from '@/store/flow/block-types/SmartDevices_LocationResponseBlockStore'
import Lang from '@/lib/filters/lang'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import {mixins} from 'vue-class-component'

const flowVuexNamespace = namespace('flow')
const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const builderVuexNamespace = namespace('builder')
const undoRedoVuexNamespace = namespace('undoRedo')

@Component({})
export class SmartDevices_LocationResponseBlock extends mixins(Lang) {
  @Prop() readonly block!: ILocationResponseBlock
  @Prop({default: true}) readonly usesDefaultBranchingEditor!: boolean
  @Prop({default: true}) readonly usesDefaultContactPropsEditor!: boolean

  async updateThreshold(value: number): Promise<void> {
    await this.setAccuracyThreshold({blockId: this.block.uuid, value})
    await this.takeSnapshot()
  }

  async updateTimeout(value: number): Promise<void> {
    await this.setAccuracyTimeout({blockId: this.block.uuid, value})
    await this.takeSnapshot()
  }

  @blockVuexNamespace.Action setAccuracyThreshold!: ({blockId, value}: { blockId: IBlock['uuid'], value: number }) => Promise<string>
  @blockVuexNamespace.Action setAccuracyTimeout!: ({blockId, value}: { blockId: IBlock['uuid'], value: number }) => Promise<string>
  @blockVuexNamespace.Action handleBranchingTypeChangedToUnified!: ({block}: {block: IBlock}) => void
  @builderVuexNamespace.Getter isEditable !: boolean
  @undoRedoVuexNamespace.Action takeSnapshot: () => Promise<void>
}

export default SmartDevices_LocationResponseBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, LocationStore)
</script>
