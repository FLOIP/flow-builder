<template>
  <div class="block-output-branching-config">
    <div class="form-group">
      <label class="d-block">{{'flow-builder.output-branching' | trans}}</label>

      <div class="btn-group">
        <button
          :class="{
            active: isBranchingTypeSegregated,
            'btn-primary': isBranchingTypeSegregated,
            'btn-secondary': !isBranchingTypeSegregated,
          }"
          :title="'flow-builder.separate-output-for-each-choice' | trans"
          class="btn btn-sm"
          data-placement="bottom"
          data-toggle="tooltip"
          @click="selectedBranchingType = OutputBranchingType.BRANCHING_TYPE_SEGREGATED">

          <i class="v5icon-branching-on v5icon-2x" />
        </button>

        <button
          :class="{
            active: isBranchingTypeUnified,
            'btn-primary': isBranchingTypeUnified,
            'btn-secondary': !isBranchingTypeUnified,
          }"
          :title="'flow-builder.one-output-for-all-choices' | trans"
          class="btn btn-sm"
          data-placement="bottom"
          data-toggle="tooltip"
          @click="selectedBranchingType = OutputBranchingType.BRANCHING_TYPE_UNIFIED">

          <i class="v5icon-branching-off v5icon-2x" />
        </button>

        <button
          :class="{
            active: isBranchingTypeAdvanced,
            'btn-primary': isBranchingTypeAdvanced,
            'btn-secondary': !isBranchingTypeAdvanced,
          }"
          :title="'flow-builder.advanced-configuration-of-outputs' | trans"
          class="btn btn-sm"
          data-placement="bottom"
          data-toggle="tooltip"
          @click="selectedBranchingType = OutputBranchingType.BRANCHING_TYPE_ADVANCED">

          <i class="v5icon-branching-off v5icon-2x" />
        </button>
      </div>
    </div>

    <advanced-exits-builder
      v-if="isBranchingTypeAdvanced"
      :block="block" />

  </div>
</template>

<script lang="ts">
  import {get, isEmpty, isNil} from 'lodash'
  import {Component, Prop} from 'vue-property-decorator'
  import {IBlock} from '@floip/flow-runner'
  import {mixins} from 'vue-class-component'
  import AdvancedExitsBuilder from '@/components/interaction-designer/block-editors/AdvancedExitsBuilder.vue'
  import Lang from '@/lib/filters/lang'
  import {namespace} from 'vuex-class'

  const flowVuexNamespace = namespace('flow')

  enum OutputBranchingType {
    BRANCHING_TYPE_UNIFIED = 'unified',
    BRANCHING_TYPE_SEGREGATED = 'segregated',
    BRANCHING_TYPE_ADVANCED = 'advanced',
  }

  @Component({
    components: {
      AdvancedExitsBuilder,
    },
  })
  export default class BlockOutputBranchingConfig extends mixins(Lang) {
    @Prop() readonly block!: IBlock

    OutputBranchingType = OutputBranchingType

    get selectedBranchingType(): OutputBranchingType {
      return get(this.block.vendor_metadata, 'io_viamo.branchingType')
    }

    set selectedBranchingType(value: OutputBranchingType) {
      const {uuid: blockId} = this.block
      this.block_updateVendorMetadataByPath({blockId, path: 'io_viamo.branchingType', value})
    }

    get isBranchingTypeSegregated(): boolean {
      return this.selectedBranchingType === OutputBranchingType.BRANCHING_TYPE_SEGREGATED
    }

    get isBranchingTypeUnified(): boolean {
      return this.selectedBranchingType === OutputBranchingType.BRANCHING_TYPE_UNIFIED
    }

    get isBranchingTypeAdvanced(): boolean {
      return this.selectedBranchingType === OutputBranchingType.BRANCHING_TYPE_ADVANCED
    }

    mounted() {
      if (!isEmpty(this.selectedBranchingType)) {
        return
      }

      this.selectedBranchingType = OutputBranchingType.BRANCHING_TYPE_SEGREGATED
    }

    // setBranching(value: string) {
    //   const willBranchingTypeSegregated = value === OutputBranchingType.BRANCHING_TYPE_SEGREGATED
    //
    //   if (willBranchingTypeSegregated) {
    //     this.branchingType = OutputBranchingType.BRANCHING_TYPE_SEGREGATED
    //   } else {
    //     this.branchingType = OutputBranchingType.BRANCHING_TYPE_UNIFIED
    //   }
    //
    //   this.block_updateVendorMetadataByPath({blockId: this.block.uuid, path: 'io_viamo.branchingType', value})
    //   this.$emit('commitIsSegregatedBranching', willBranchingTypeSegregated)
    // }

    @flowVuexNamespace.Mutation block_updateVendorMetadataByPath!:
      ({ blockId, path, value }: { blockId: string, path: string, value: object | string }) => void
  }
</script>
