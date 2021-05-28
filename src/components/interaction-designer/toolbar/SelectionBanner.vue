<template>
  <div class="selection-banner" v-if="!!countSelectedBlocks">
    <div class="alert alert-primary mb-0 d-flex" role="alert">
      <div class="mr-3">
        {{ 'flow-builder.selected-x-blocks' | trans({ x: countSelectedBlocks }) }}.
      </div>
      <div class="mr-3" v-if="deleting">
        <b>Are you sure you want to delete your selection ?</b>
      </div>

      <button
        class="btn btn-danger btn-sm"
        v-if="!deleting"
        @click="deleting = true">
        <font-awesome-icon
          :icon="['far', 'trash-alt']"
          class="fa-btn"
        />
        {{ 'flow-builder.delete' | trans }}
      </button>

      <button class="btn btn-outline-dark btn-sm mr-2"
              v-if="deleting"
              @click="deleting = false">
        No, cancel
      </button>

      <button class="btn btn-danger btn-sm mr-2"
              v-if="deleting"
              @click="">
        Yes, delete
      </button>

      <button class="btn btn-outline-dark btn-sm ml-4"
              v-if="!deleting"
              @click="block_clearMultiSelection">
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
  deleting: boolean = false

  get countSelectedBlocks() {
    return size(this.selectedBlocks)
  }

  confirmMultipleDeletion() {
    this.deleting = true
  }

  @flowVuexNamespace.State selectedBlocks!: IBlock['uuid'][]
  @flowVuexNamespace.Action block_clearMultiSelection!: void
}
</script>
