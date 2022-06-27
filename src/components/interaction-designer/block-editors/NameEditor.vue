<template>
  <div class="name-editor mt-3">
    <validation-message :message-key="`block/${block.uuid}/name`">
      <template #input-control="{ isValid }">
        <div v-if="editBlockName || isValid === false">
          <h6>{{ trans('flow-builder.edit-block-code') }}</h6>
          <div class="d-flex">
            <text-editor
              v-model="blockName"
              class="w-100"
              :label="''"
              :placeholder="trans('flow-builder.enter-block-code')"
              :valid-state="isValid"
              @keydown="filterName" />
            <span
              class="btn btn-primary btn-xs align-self-center ml-2"
              @click="editBlockName = false">
              <font-awesome-icon
                :icon="['fas', 'check']"
                class="fa-btn" />
            </span>
          </div>
        </div>
        <div
          v-else
          class="d-flex justify-content-between">
          <div class="block-code align-self-center">
            <h6 class="d-inline">
              {{ trans('flow-builder.code') }}:
            </h6>
            <span> {{ blockName }} </span>
          </div>
          <span
            class="btn btn-primary btn-xs align-self-baseline ml-2"
            @click="editBlockName = true">
            <font-awesome-icon
              :icon="['far', 'edit']"
              class="fa-btn" />
          </span>
        </div>
      </template>
    </validation-message>
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import Lang from '@/lib/filters/lang'
import {IBlock, IBlockUIMetadata} from '@floip/flow-runner'
import {namespace} from 'vuex-class'

const flowVuexNamespace = namespace('flow')

@Component({})
export class NameEditor extends mixins(Lang) {
  editBlockName = false

  @Prop() readonly block!: IBlock

  get blockName(): IBlock['name'] {
    return this.block.name
  }

  set blockName(value: IBlock['name']) {
    this.block_setName({blockId: this.block.uuid, value, isUserDefinedName: true})
  }

  filterName(e: KeyboardEvent): void {
    // Consider user input as name editing
    this.editBlockName = true

    if (e.key.match(/\W+|Enter/g)) {
      e.preventDefault()
    }
  }

  @flowVuexNamespace.Action block_setName!: ({
    blockId,
    value,
    isUserDefinedName,
  }: {
    blockId: IBlock['uuid'],
    value: IBlock['name'],
    isUserDefinedName: IBlockUIMetadata['has_user_defined_name'],
  }) => void;
}
export default NameEditor
</script>

<style scoped>
.block-code {
  word-break: break-all;
}
</style>
