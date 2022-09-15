<template>
  <div class="core-case-block">
    <base-block
      :block="block"
      :flow="flow"
      :show-semantic-label="false"
      :uses-default-contact-props-editor="usesDefaultContactPropsEditor"
      :uses-default-branching-editor="usesDefaultBranchingEditor">
      <slot
        slot="resource-editors"
        name="resource-editors" />
      <slot
        slot="extras"
        name="extras" />
      <slot
        slot="vendor-extras"
        name="vendor-extras" />
      <slot
        slot="branching"
        name="branching">
        <block-output-branching-config
          :block="block"
          :has-exit-per-choice="false"
          :has-unified-exit="false" />
      </slot>
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
import {ICaseBlock} from '@floip/flow-runner/src/model/block/ICaseBlock'
import {IBlockExit, IFlow} from '@floip/flow-runner'
import CaseStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_CaseBlockStore'
import Lang from '@/lib/filters/lang'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import {mixins} from 'vue-class-component'

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const builderVuexNamespace = namespace('builder')

@Component({})
export class Core_CaseBlock extends mixins(Lang) {
  @Prop() readonly block!: ICaseBlock
  @Prop() readonly flow!: IFlow
  @Prop({default: true}) readonly usesDefaultBranchingEditor!: boolean
  @Prop({default: false}) readonly usesDefaultContactPropsEditor!: boolean

  get exits(): IBlockExit[] {
    return this.block.exits
  }

  @builderVuexNamespace.Getter isEditable !: boolean
}

export default Core_CaseBlock
export const caseBlockInstaller = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, CaseStore)
</script>
