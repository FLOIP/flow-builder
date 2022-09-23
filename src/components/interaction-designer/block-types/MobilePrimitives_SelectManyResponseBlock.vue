<template>
  <div class="mobile-primitive-select-many-response-block">
    <base-block
      :block="block"
      :show-semantic-label="false"
      :uses-default-contact-props-editor="usesDefaultContactPropsEditor"
      :uses-default-branching-editor="usesDefaultBranchingEditor"
      @handleBranchingTypeChangedToUnified="handleBranchingTypeChangedToUnified({block})">
      <slot
        slot="resource-editors"
        name="resource-editors">
        <resource-editor :block="block" />
      </slot>
      <slot
        slot="extras"
        name="extras">
        <choices-builder
          :block="block"
          @choiceChanged="handleChoiceChanged" />
        <hr>
        <minimum-choices-editor :block="block" />
        <maximum-choices-editor :block="block" />
      </slot>
      <slot
        slot="vendor-extras"
        name="vendor-extras" />
      <slot
        slot="branching"
        name="branching">
        <block-output-branching-config
          :block="block"
          :has-exit-per-choice="false"
          :label-class="''"
          @branchingTypeChanged="reflowExitsWhenSwitchingToBranchingTypeNotUnified()" />
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
import {Component} from 'vue-property-decorator'
import SelectManyResponseStore, {BLOCK_TYPE} from '@/store/flow/block-types/MobilePrimitives_SelectManyResponseBlockStore'
import {namespace} from 'vuex-class'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import {IBlock} from '@floip/flow-runner'
import SelectOneResponseBlock from './MobilePrimitives_SelectOneResponseBlock.vue'

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const builderVuexNamespace = namespace('builder')

@Component({})
export class MobilePrimitives_SelectManyResponseBlock extends SelectOneResponseBlock {
  //Important: Even we extends from SelectOneResponseBlock, to avoid conflict
  // we SHOULD re-declare @blockVuexNamespace based getter, state, action, mutation
  @builderVuexNamespace.Getter declare isEditable: boolean
  @blockVuexNamespace.Action declare handleBranchingTypeChangedToUnified: ({block}: {block: IBlock}) => void
}

export default MobilePrimitives_SelectManyResponseBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, SelectManyResponseStore)
</script>
