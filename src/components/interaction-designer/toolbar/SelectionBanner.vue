<template>
  <div class="selection-banner" v-if="!!countSelectedBlocks">
    <div class="alert alert-primary mb-0 d-flex" role="alert">
      <div class="mr-3">
        {{ 'flow-builder.selected-x-blocks' | trans({ x: countSelectedBlocks }) }}
      </div>
      <button class="btn btn-outline-dark btn-sm" @click="block_clearMultiSelection">
        {{ 'flow-builder.clear-selection' | trans }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Lang from '@/lib/filters/lang'
import Component, { mixins } from "vue-class-component";
import { namespace } from 'vuex-class'
import { IBlock } from '@floip/flow-runner'
import { size } from 'lodash'
const flowVuexNamespace = namespace('flow')

@Component({})
export default class SelectionBanner extends mixins(Lang) {

  get countSelectedBlocks() {
    return size(this.selectedBlocks)
  }

  @flowVuexNamespace.State selectedBlocks!: IBlock['uuid'][]
  @flowVuexNamespace.Action block_clearMultiSelection!: void
}
</script>
