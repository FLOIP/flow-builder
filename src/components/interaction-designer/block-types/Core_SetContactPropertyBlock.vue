<template>
  <div class="core-set-contact-property-block">
    <base-block
      :block="block"
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
        <contact-property-editor :block="block" />
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
import {IBlock, IFlow} from '@floip/flow-runner'
import SetContactPropertyStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_SetContactPropertyStore'
import Lang from '@/lib/filters/lang'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import {mixins} from 'vue-class-component'

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)

@Component({})
export class Core_SetContactPropertyBlock extends mixins(Lang) {
  @Prop() readonly block!: IBlock
  @Prop({default: true}) readonly usesDefaultBranchingEditor!: boolean
  @Prop({default: false}) readonly usesDefaultContactPropsEditor!: boolean

  @blockVuexNamespace.Action handleBranchingTypeChangedToUnified!: ({block}: {block: IBlock}) => void
}

export default Core_SetContactPropertyBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, SetContactPropertyStore)
</script>
