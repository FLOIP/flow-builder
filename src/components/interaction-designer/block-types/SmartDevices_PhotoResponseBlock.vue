<template>
  <div class="smart-devices-photo-response-block">
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

      <slot name="extras" />

      <hr>
      <block-output-branching-config
        :block="block"
        :has-exit-per-choice="false"
        @branchingTypeChangedToUnified="handleBranchingTypeChangedToUnified({block})" />

      <resource-editor
        v-if="promptResource"
        :resource="promptResource"
        :block="block"
        :flow="flow" />

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
class SmartDevices_PhotoResponseBlock extends mixins(Lang) {
  // @Prop()readonly block!: IPhotoResponseBlock
  @Prop() readonly block!: IBlock

  @Prop() readonly flow!: IFlow

  showSemanticLabel = false

  get promptResource(): IResource {
    return this.resourcesByUuidOnActiveFlow[this.block.config.prompt]
  }

  @flowVuexNamespace.Getter resourcesByUuidOnActiveFlow!: { [key: string]: IResource }

  @builderVuexNamespace.Getter isEditable !: boolean

  @blockVuexNamespace.Action handleBranchingTypeChangedToUnified!: ({block}: {block: IBlock}) => void
}

export default SmartDevices_PhotoResponseBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, PhotoStore)
</script>
