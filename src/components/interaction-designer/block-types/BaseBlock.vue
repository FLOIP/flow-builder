<template>
  <div>
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

      <slot name="resource-editors" />
      <hr>
      <slot name="extras" />

      <slot name="vendor-extras" />

      <slot name="branching">
        <block-output-branching-config
          v-if="usesDefaultBranchingEditor"
          :block="block"
          :has-exit-per-choice="false"
          @branchingTypeChangedToUnified="handleBranchingTypeChangedToUnified" />
      </slot>

      <categorization :block="block" />

      <slot name="contact-props">
        <generic-contact-property-editor
          v-if="usesDefaultContactPropsEditor"
          :block="block" />
      </slot>

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
import {IBlock, IFlow} from '@floip/flow-runner'
import Lang from '@/lib/filters/lang'
import {mixins} from 'vue-class-component'

const builderVuexNamespace = namespace('builder')

@Component({})
export class BaseBlock extends mixins(Lang) {
  @Prop() readonly block!: IBlock
  @Prop() readonly flow!: IFlow
  @Prop({default: true}) readonly usesDefaultBranchingEditor!: boolean
  @Prop({default: true}) readonly usesDefaultContactPropsEditor!: boolean
  @Prop({default: false}) showSemanticLabel!: boolean

  handleBranchingTypeChangedToUnified(): void {
    this.$emit('handleBranchingTypeChangedToUnified')
  }

  @builderVuexNamespace.Getter isEditable !: boolean
}

export default BaseBlock
</script>
