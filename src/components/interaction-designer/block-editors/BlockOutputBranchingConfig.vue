<template>
  <div class="block-output-branching-config">
    <div class="form-group">
      <label :class="labelClass">{{ 'flow-builder.output-branching' | trans }}</label>

      <div class="btn-group d-block">
        <button
          v-if="hasExitPerChoice"
          v-b-tooltip.hover.bottom="trans('flow-builder.multiple-choice-mode')"
          :class="{
            active: isBranchingTypeExitPerChoice,
            'btn-primary': isBranchingTypeExitPerChoice,
            'btn-outline-primary': !isBranchingTypeExitPerChoice,
          }"
          class="btn btn-sm"
          @click="selectedBranchingType = OutputBranchingType.EXIT_PER_CHOICE">
          <font-awesome-icon
            :icon="['fac', 'one-exit-per-choice']"
            class="exit-type-icons" />
        </button>

        <button
          v-if="hasUnifiedExit"
          v-b-tooltip.hover.bottom="trans('flow-builder.standard-mode')"
          :class="{
            active: isBranchingTypeUnified,
            'btn-primary': isBranchingTypeUnified,
            'btn-outline-primary': !isBranchingTypeUnified,
          }"
          class="btn btn-sm"
          @click="selectedBranchingType = OutputBranchingType.UNIFIED">
          <font-awesome-icon
            :icon="['fac', 'single-exit']"
            class="exit-type-icons" />
        </button>

        <button
          v-b-tooltip.hover.bottom="trans('flow-builder.advanced-mode')"
          :class="{
            active: isBranchingTypeAdvanced,
            'btn-primary': isBranchingTypeAdvanced,
            'btn-outline-primary': !isBranchingTypeAdvanced,
          }"
          class="btn btn-sm"
          :disabled="!hasUnifiedExit && !hasExitPerChoice"
          @click="selectedBranchingType = OutputBranchingType.ADVANCED">
          <font-awesome-icon
            :icon="['fac', 'advanced-exit']"
            class="exit-type-icons" />
        </button>
      </div>
    </div>

    <advanced-exits-builder
      v-if="isBranchingTypeAdvanced"
      :block="block" />
  </div>
</template>

<script lang="ts">
  import {get, isEmpty} from 'lodash'
  import {Component, Prop} from 'vue-property-decorator'
  import {IBlock, IBlockExit} from '@floip/flow-runner'
  import {mixins} from 'vue-class-component'
  import Lang from '@/lib/filters/lang'
  import {namespace} from 'vuex-class'
  import {ConfigFieldType} from '@/store/flow/block'
  import {OutputBranchingType} from '@/components/interaction-designer/block-editors/BlockOutputBranchingConfig.model'

  const flowVuexNamespace = namespace('flow')

  @Component({})
  export class BlockOutputBranchingConfig extends mixins(Lang) {
    @Prop() readonly block!: IBlock
    @Prop() readonly hasExitPerChoice!: boolean
    @Prop({default: true}) readonly hasUnifiedExit!: boolean
    @Prop({default: 'text-primary'}) readonly labelClass?: string

    OutputBranchingType = OutputBranchingType

    mounted(): void {
      if (isEmpty(this.selectedBranchingType)) {
        // todo: should this be EXIT_PER_CHOICE for SelectOne block?
        this.selectedBranchingType = OutputBranchingType.UNIFIED
      }
    }

    get selectedBranchingType(): OutputBranchingType {
      return get(this.block.vendor_metadata, 'floip.ui_metadata.branching_type')
    }

    set selectedBranchingType(value: OutputBranchingType) {
      const {uuid: blockId} = this.block
      this.block_updateVendorMetadataByPath({blockId, path: 'floip.ui_metadata.branching_type', value})

      switch (value) {
        case OutputBranchingType.UNIFIED:
          this.$emit('branchingTypeChangedToUnified')
          break
        case OutputBranchingType.EXIT_PER_CHOICE:
          // handled via change event from SelectOne; felt awkward importing SelectOne store here
          // should likely make branching types extendable
          //this.reflowExitsFromChoices({blockId})
          break
        case OutputBranchingType.ADVANCED:
          // todo: restore from cache
          break
        default:
          console.warn('block-editors/BlockOutputBranchingConfig',
            'Unknown branching type received.',
            {branching_type: value})
      }

      this.$emit('branchingTypeChanged', {branching_type: value})
    }

    get isBranchingTypeExitPerChoice(): boolean {
      return this.selectedBranchingType === OutputBranchingType.EXIT_PER_CHOICE
    }

    get isBranchingTypeUnified(): boolean {
      return this.selectedBranchingType === OutputBranchingType.UNIFIED
    }

    get isBranchingTypeAdvanced(): boolean {
      return this.selectedBranchingType === OutputBranchingType.ADVANCED
    }

    @flowVuexNamespace.Mutation block_updateVendorMetadataByPath!:
      ({blockId, path, value}: { blockId: string, path: string, value: ConfigFieldType }) => void
    @flowVuexNamespace.Mutation block_exitClearDestinationBlockFor!:
      ({blockExit}: {blockExit: IBlockExit}) => void
  }
  export default BlockOutputBranchingConfig
</script>

<style scoped>
.exit-type-icons {
  font-size: 1.5rem;
}
</style>
