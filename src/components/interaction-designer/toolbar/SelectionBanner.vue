<template>
  <div class="selection-banner" v-if="!!countSelectedBlocks">
    <div class="alert alert-primary mb-0 d-flex py-sm-2 px-3" role="alert">
      <div class="mr-3">
        {{ 'flow-builder.selected-x-blocks' | trans({ x: countSelectedBlocks }) }}.
      </div>

      <!--Main multiselect actions-->
      <div v-if="!deleting">
        <button
          class="btn btn-danger btn-sm mr-2"
          @click="deleting = true">
          <font-awesome-icon :icon="['far', 'trash-alt']"/>
          {{ 'flow-builder.delete' | trans }}
        </button>

        <button class="btn btn-outline-dark btn-sm mr-2"
                @click.prevent="handleMultipleDuplicate">
          <font-awesome-icon :icon="['far', 'clone']"/>
          {{ 'flow-builder.duplicate' | trans }}
        </button>

        <button class="btn btn-outline-dark btn-sm ml-4"
                @click="flow_clearMultiSelection">
          {{ 'flow-builder.clear-selection' | trans }}
        </button>
      </div>

      <!--Delete confirmation-->
      <div v-if="deleting">
        <b class="mr-3">{{ 'flow-builder.confirmation-for-delete-selection' | trans }}</b>

        <button class="btn btn-outline-dark btn-sm mr-2"
                @click="deleting = false">
          {{ 'flow-builder.no-cancel' | trans }}
        </button>

        <button class="btn btn-danger btn-sm mr-2"
                @click="confirmMultipleDeletion">
          {{ 'flow-builder.yes-delete' | trans }}
        </button>
      </div>
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

  updated() {
    this.$emit('updated')
  }

  get countSelectedBlocks() {
    return size(this.selectedBlockUuids)
  }

  async confirmMultipleDeletion() {
    await this.flow_removeAllSelectedBlocks()
    this.deleting = false
  }

  async handleMultipleDuplicate() {
    await this.flow_duplicateAllSelectedBlocks()
    await this.flow_clearMultiSelection()
  }

  @flowVuexNamespace.State selectedBlockUuids!: IBlock['uuid'][]
  @flowVuexNamespace.Action flow_clearMultiSelection!: () => void
  @flowVuexNamespace.Action flow_removeAllSelectedBlocks!: () => void
  @flowVuexNamespace.Action flow_duplicateAllSelectedBlocks!: () => void
}
</script>
