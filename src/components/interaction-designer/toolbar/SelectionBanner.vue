<template>
  <div
    v-if="!!countSelectedBlocks"
    class="selection-banner">
    <div
      class="alert alert-primary mb-0 d-flex py-sm-2 px-3"
      role="alert">
      <div class="mr-3">
        {{ trans('flow-builder.selected-x-blocks', {x: countSelectedBlocks}) }}.
      </div>

      <!--Main multiselect actions-->
      <div v-if="!deleting">
        <button
          class="btn btn-danger btn-sm mr-2"
          @click="deleting = true">
          <font-awesome-icon :icon="['far', 'trash-alt']" />
          {{ trans('flow-builder.delete', ) }}
        </button>

        <button
          class="btn btn-outline-dark btn-sm mr-2"
          @click.prevent="handleMultipleDuplicate">
          <font-awesome-icon :icon="['fac', 'copy']" />
          {{ trans('flow-builder.duplicate', ) }}
        </button>

        <button
          class="btn btn-outline-dark btn-sm ml-4"
          @click="flow_clearMultiSelection">
          {{ trans('flow-builder.clear-selection') }}
        </button>
      </div>

      <!--Delete confirmation-->
      <div v-if="deleting">
        <b class="mr-3">{{ trans('flow-builder.confirmation-for-delete-selection') }}</b>

        <button
          class="btn btn-outline-dark btn-sm mr-2"
          @click="deleting = false">
          {{ trans('flow-builder.no-cancel') }}
        </button>

        <button
          class="btn btn-danger btn-sm mr-2"
          @click="confirmMultipleDeletion">
          {{ trans('flow-builder.yes-delete') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Lang} from '@/lib/filters/lang'
import {mixins, Options} from 'vue-class-component'
import {namespace} from 'vuex-class'
import {IBlock} from '@floip/flow-runner'
import {size} from 'lodash'

const flowVuexNamespace = namespace('flow')

@Options({})
export class SelectionBanner extends mixins(Lang) {
  deleting = false

  updated(): void {
    this.$emit('updated')
  }

  get countSelectedBlocks(): number {
    return size(this.selectedBlocks)
  }

  async confirmMultipleDeletion(): Promise<void> {
    await this.flow_removeAllSelectedBlocks()
    this.deleting = false
  }

  async handleMultipleDuplicate() {
    await this.flow_duplicateAllSelectedBlocks()
    await this.flow_clearMultiSelection()
  }

  @flowVuexNamespace.State selectedBlocks!: IBlock['uuid'][]
  @flowVuexNamespace.Action flow_clearMultiSelection!: () => Promise<void>
  @flowVuexNamespace.Action flow_removeAllSelectedBlocks!: () => Promise<void>
  @flowVuexNamespace.Action flow_duplicateAllSelectedBlocks!: () => Promise<void>
}
export default SelectionBanner
</script>
