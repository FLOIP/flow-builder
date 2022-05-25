<template>
  <div class="mobile-primitive-open-response-block">
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
        <max-duration-seconds-editor
          :block="block"
          :has-ivr="hasVoiceMode"
          @commitMaxDurationChange="setMaxDurationSeconds" />
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

import {IBlock, IFlow, IResource} from '@floip/flow-runner'
import {IOpenResponseBlock} from '@floip/flow-runner/src/model/block/IOpenResponseBlock'
import OpenResponseStore, {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_OpenResponseBlockStore'
import Lang from '@/lib/filters/lang'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import {mixins} from 'vue-class-component'

const flowVuexNamespace = namespace('flow')
const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const builderVuexNamespace = namespace('builder')

@Component({})
class MobilePrimitives_OpenResponseBlock extends mixins(Lang) {
  @Prop() readonly block!: IOpenResponseBlock
  @Prop() readonly flow!: IFlow
  @Prop({default: true}) readonly usesDefaultBranchingEditor!: boolean
  @Prop({default: true}) readonly usesDefaultContactPropsEditor!: boolean

  get promptResource(): IResource {
    return this.resourcesByUuidOnActiveFlow[this.block.config.prompt]
  }

  @flowVuexNamespace.Getter resourcesByUuidOnActiveFlow!: { [key: string]: IResource }
  @flowVuexNamespace.Getter hasTextMode!: boolean
  @flowVuexNamespace.Getter hasVoiceMode!: boolean

  @blockVuexNamespace.Action setMaxDurationSeconds!: (newDuration: number) => Promise<string>
  @blockVuexNamespace.Action handleBranchingTypeChangedToUnified!: ({block}: {block: IBlock}) => void

  @builderVuexNamespace.Getter isEditable !: boolean
}

export default MobilePrimitives_OpenResponseBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, OpenResponseStore)
</script>
