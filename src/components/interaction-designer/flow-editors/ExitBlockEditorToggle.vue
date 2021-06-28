<template>
  <div class="flow-editor exit-block-editor-toggle">
    <template v-if="isEditable && hasClipboard">
      <div class="form-group">
        <button
          type="button"
          class="btn btn-secondary btn-sm"
          :class="{active: isExitBlock}"
          @click="toggleExitBlock">
          <template v-if="isExitBlock">
            {{ 'flow-builder.unset-as-exit-block' | trans }}
          </template>
          <template v-else>
            {{ 'flow-builder.set-as-exit-block' | trans }}
          </template>
        </button>
      </div>
    </template>
  </div>
</template>

<script lang="js">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */
import {mapMutations} from 'vuex'
import {lang} from '@/lib/filters/lang'

export default {
  mixins: [lang],
  props: {
    flow: Object,
    // toggle for particular block
    blockId: String,

    isEditable: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    isExitBlock() {
      return this.blockId === this.flow.exit_block_id
    },
  },

  methods: {
    ...mapMutations('flow', ['flow_setExitBlockId']),

    toggleExitBlock() {
      this.flow_setExitBlockId({
        flowId: this.flow.uuid,
        blockId: this.isExitBlock ? null : this.blockId,
      })
    },
  },
}
</script>
