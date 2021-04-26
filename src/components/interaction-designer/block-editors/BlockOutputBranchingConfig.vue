<template>
  <div class="form-group">
    <label>{{'flow-builder.output-branching' | trans}}</label><br/>
    <div class="btn-group">
      <button @click="branching = 'segregated'"
              class="btn btn-sm"
              :class="{
                active: isBranchingTypeSegregated,
                'btn-primary': isBranchingTypeSegregated,
                'btn-secondary': !isBranchingTypeSegregated,
              }"
              data-toggle="tooltip"
              data-placement="bottom"
              :title="'flow-builder.separate-output-for-each-choice' | trans">
        <i class="v5icon-branching-on v5icon-2x">X</i>
      </button>
      <button @click="branching = 'unified'"
              class="btn btn-sm"
              :class="{
                active: isBranchingTypeUnified,
                'btn-primary': isBranchingTypeUnified,
                'btn-secondary': !isBranchingTypeUnified,
              }"
              data-toggle="tooltip"
              data-placement="bottom"
              :title="'flow-builder.one-output-for-all-choices' | trans">
        <i class="v5icon-branching-off v5icon-2x">Y</i>
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

    defaultBranchingType: string = BRANCHING_TYPE_SEGREGATED

    get isBranchingTypeSegregated() {
      return this.branching === BRANCHING_TYPE_SEGREGATED
    }

    get isBranchingTypeUnified() {
      return this.branching === BRANCHING_TYPE_UNIFIED
    }

    get branching() {
      // TODO: confirm this path because FLOIP spec doesn't provide a definition for the output branching persistence
      let value = get(this.block, 'vendor_metadata.branchingType')
      if (isNil(value) && this.block) {
        this.block_updateVendorMetadataByPath({ blockId: this.block.uuid, path: 'branchingType', value: this.defaultBranchingType })
        return this.defaultBranchingType
      }
      return value
    }

    set branching(value) {
      this.block_updateVendorMetadataByPath({ blockId: this.block.uuid, path: 'branchingType', value })
      const willBranchingTypeSegregated = value === BRANCHING_TYPE_SEGREGATED
      if(willBranchingTypeSegregated) {
        this.block_segregateExitsBranching( { blockId: this.block.uuid })
      } else {
        this.block_unifyExitsBranching( { blockId: this.block.uuid })
      }
      this.$emit('commitIsSegregatedBranching', willBranchingTypeSegregated)
    }

    @flowVuexNamespace.Mutation block_updateVendorMetadataByPath!: ({ blockId, path, value }: { blockId: string, path: string, value: object | string }) => void
    @flowVuexNamespace.Action block_segregateExitsBranching!: ( { blockId }: { blockId: IBlock['uuid'] } ) => void
    @flowVuexNamespace.Action block_unifyExitsBranching!: ( { blockId }: { blockId: IBlock['uuid'] } ) => void
  }
</script>
