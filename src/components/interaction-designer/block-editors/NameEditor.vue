<template>
  <div
    class="name-editor mt-3"
    data-cy="name--editor">
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
              data-cy="name-editor--input"
              @keydown="filterName" />
            <span
              class="btn btn-primary btn-xs align-self-center ml-2"
              data-cy="name-editor--save-btn"
              @click="handleCompleteEditing">
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
            data-cy="name-editor--edit-btn"
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
import {IBlock, IBlockUIMetadata} from '@floip/flow-runner'
import {defineComponent} from 'vue'
import {mapActions, mapMutations} from 'vuex'
import Lang from '@/lib/filters/lang'

export const NameEditor = defineComponent({
  name: 'NameEditor',
  mixins: [Lang],
  props: {
    block: {
      type: Object as () => IBlock,
      required: true,
    },
  },
  computed: {
    blockName: {
      get(): IBlock['name'] {
        return this.block.name
      },
      set(value: IBlock['name']) {
        this.block_setName({
          blockId: this.block.uuid,
          value,
          lockAutoUpdate: true,
        })
      },
    },
    editBlockName: {
      get(): IBlockUIMetadata['editBlockName'] {
        return this.block.vendor_metadata?.floip.ui_metadata.is_block_name_editable ?? false
      },
      set(value: IBlockUIMetadata['editBlockName']) {
        this.block_updateVendorMetadataByPath({
          blockId: this.block.uuid,
          path: 'floip.ui_metadata.is_block_name_editable',
          value,
        })
      },
    },
  },
  methods: {
    ...mapActions({
      block_setName: 'flow/block_setName',
      block_resetName: 'flow/block_resetName',
    }),
    ...mapMutations({
      block_updateVendorMetadataByPath: 'flow/block_updateVendorMetadataByPath',
    }),
    filterName(e: KeyboardEvent): void {
      // Consider user input as name editing
      this.editBlockName = true

      if (e.key.match(/\W+|Enter/g)) {
        e.preventDefault()
      }
    },
    handleCompleteEditing(): void {
      this.editBlockName = false

      if (this.blockName === '') {
        // This will turn on automatic name generation from the label
        this.block_resetName({
          blockId: this.block.uuid,
        })
      }
    },
  },
})

export default NameEditor
</script>

<style scoped>
.block-code {
  word-break: break-all;
}
</style>
