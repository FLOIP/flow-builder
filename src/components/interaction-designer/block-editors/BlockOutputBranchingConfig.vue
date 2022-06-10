<template>
  <div class="block-output-branching-config">
    <div class="form-group">
      <label :class="labelClass">{{ 'flow-builder.output-branching' | trans }}</label>

      <div class="btn-group d-block">
        <button
          v-if="hasExitPerChoice"
          v-b-tooltip.hover.bottom="trans('flow-builder.separate-output-for-each-choice')"
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
          v-b-tooltip.hover.bottom="trans('flow-builder.one-output-for-all-choices')"
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
          v-b-tooltip.hover.bottom="trans('flow-builder.advanced-configuration-of-outputs')"
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
  import {get, isEmpty, find} from 'lodash'
  import {Component, Prop} from 'vue-property-decorator'
  import {IBlock, IBlockExit, ValidationException} from '@floip/flow-runner'
  import {mixins} from 'vue-class-component'
  import Lang from '@/lib/filters/lang'
  import {namespace} from 'vuex-class'

  const flowVuexNamespace = namespace('flow')

  export enum OutputBranchingType {
    UNIFIED = 'UNIFIED',
    EXIT_PER_CHOICE = 'EXIT_PER_CHOICE',
    ADVANCED = 'ADVANCED',
  }

  export interface IVendorMetadataWithBranchingType {
    io_viamo: {
      branchingType: OutputBranchingType,
    },
  }

  export interface IBlockWithBranchingType extends IBlock {
    vendor_metadata: IVendorMetadataWithBranchingType,
  }

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
      return get(this.block.vendor_metadata, 'io_viamo.branchingType')
    }

    set selectedBranchingType(value: OutputBranchingType) {
      const {uuid: blockId} = this.block
      this.block_updateVendorMetadataByPath({blockId, path: 'io_viamo.branchingType', value})

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
            {branchingType: value})
      }

      this.$emit('branchingTypeChanged', {branchingType: value})
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
      ({blockId, path, value}: { blockId: string, path: string, value: object | string }) => void
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
