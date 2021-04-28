<template>
  <div class="form-group">
    <label>{{'flow-builder.output-branching' | trans}}</label><br/>
    <div class="btn-group">
      <button @click="setBranching('segregated')"
              class="btn btn-sm"
              :class="{
                active: isBranchingTypeSegregated,
                'btn-primary': isBranchingTypeSegregated,
                'btn-secondary': !isBranchingTypeSegregated,
              }"
              data-toggle="tooltip"
              data-placement="bottom"
              :title="'flow-builder.separate-output-for-each-choice' | trans">
        <i class="v5icon-branching-on v5icon-2x"></i>
      </button>
      <button @click="setBranching('unified')"
              class="btn btn-sm"
              :class="{
                active: isBranchingTypeUnified,
                'btn-primary': isBranchingTypeUnified,
                'btn-secondary': !isBranchingTypeUnified,
              }"
              data-toggle="tooltip"
              data-placement="bottom"
              :title="'flow-builder.one-output-for-all-choices' | trans">
        <i class="v5icon-branching-off v5icon-2x"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { get, isNil } from 'lodash'
  import { Component, Prop} from 'vue-property-decorator'
  import { IBlock } from '@floip/flow-runner'
  import { mixins } from 'vue-class-component'
  import Lang from '@/lib/filters/lang'
  import { namespace } from 'vuex-class'

  const flowVuexNamespace = namespace('flow')

  const BRANCHING_TYPE_UNIFIED = 'unified'
  const BRANCHING_TYPE_SEGREGATED = 'segregated'

  @Component({})
  export default class BlockOutputBranchingConfig extends mixins(Lang){
    @Prop() readonly block!: IBlock

    branchingType: string = BRANCHING_TYPE_SEGREGATED

    get isBranchingTypeSegregated() {
      return this.branchingType === BRANCHING_TYPE_SEGREGATED
    }

    get isBranchingTypeUnified() {
      return this.branchingType === BRANCHING_TYPE_UNIFIED
    }

    mounted() {
      const path = 'io_viamo.branchingType'
      // @ts-ignore TODO: remove this once IBlock has vendor_metadata key
      let value = get(this.block.vendor_metadata, path)
      if (isNil(value) && this.block) {
        this.block_updateVendorMetadataByPath({ blockId: this.block.uuid, path, value: this.branchingType })
        return this.branchingType
      } else {
        this.branchingType = value
      }
    }

    setBranching(value: string) {
      const willBranchingTypeSegregated = value === BRANCHING_TYPE_SEGREGATED
      if(willBranchingTypeSegregated) {
        this.branchingType = BRANCHING_TYPE_SEGREGATED
      } else {
        this.branchingType = BRANCHING_TYPE_UNIFIED
      }
      this.block_updateVendorMetadataByPath({ blockId: this.block.uuid, path: 'io_viamo.branchingType', value })
      this.$emit('commitIsSegregatedBranching')
    }

    @flowVuexNamespace.Mutation block_updateVendorMetadataByPath!: ({ blockId, path, value }: { blockId: string, path: string, value: object | string }) => void
  }
</script>
