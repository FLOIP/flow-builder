<template>
  <div class="core-case-block">
    <h3 class="block-editor-header">
      {{ `flow-builder.${block.type}` | trans }}
    </h3>

    <fieldset :disabled="!isEditable">
      <label-editor
        :block="block"
        @gearClicked="showSemanticLabel = !showSemanticLabel" />
      <semantic-label-editor
        v-if="showSemanticLabel"
        :block="block" />
      <name-editor :block="block" />

      <hr>

      <block-output-branching-config
        :block="block"
        :has-exit-per-choice="false"
        :has-unified-exit="false" />

      <slot name="extras" />

      <categorization :block="block" />

      <generic-contact-property-editor :block="block" />

      <hr>

      <first-block-editor-button
        :flow="flow"
        :block-id="block.uuid" />

    </fieldset>

    <block-id :block="block" />
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
class Core_CaseBlock extends mixins(Lang) {
  @Prop() readonly block!: ICaseBlock

  @Prop() readonly flow!: IFlow

  showSemanticLabel = false

  get exits(): IBlockExit[] {
    return this.block.exits
  }

  @builderVuexNamespace.Getter isEditable !: boolean
}

export default Core_CaseBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, CaseStore)
</script>
