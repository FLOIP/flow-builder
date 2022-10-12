<template>
  <div class="smart-devices-photo-response-block">
    <base-block
      :block="block"
      :show-semantic-label="false"
      :uses-default-contact-props-editor="usesDefaultContactPropsEditor"
      :uses-default-branching-editor="usesDefaultBranchingEditor"
      @handleBranchingTypeChangedToUnified="handleBranchingTypeChangedToUnified({block})">
      <slot
        slot="resource-editors"
        name="resource-editors">
        <per-language-resource-editor :block="block" />
      </slot>
      <slot
        slot="extras"
        name="extras" />
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
// import IPhotoResponseBlock from '@floip/flow-runner/src/model/block/IPhotoResponseBlock' // TODO: to be created in flow-runner
import {IBlock, IFlow, IResource} from '@floip/flow-runner'
import PhotoStore, {BLOCK_TYPE} from '@/store/flow/block-types/SmartDevices_PhotoResponseBlockStore'
import Lang from '@/lib/filters/lang'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import {mixins} from 'vue-class-component'

const flowVuexNamespace = namespace('flow')
const builderVuexNamespace = namespace('builder')
const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)

@Component({})
export class SmartDevices_PhotoResponseBlock extends mixins(Lang) {
  // @Prop()readonly block!: IPhotoResponseBlock
  @Prop() readonly block!: IBlock
  @Prop({default: true}) readonly usesDefaultBranchingEditor!: boolean
  @Prop({default: true}) readonly usesDefaultContactPropsEditor!: boolean

  @builderVuexNamespace.Getter isEditable !: boolean

  @blockVuexNamespace.Action handleBranchingTypeChangedToUnified!: ({block}: {block: IBlock}) => void
}

export default SmartDevices_PhotoResponseBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, PhotoStore)
</script>
