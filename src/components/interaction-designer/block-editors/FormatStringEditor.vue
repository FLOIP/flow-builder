<template>
  <validation-message
    #input-control="{ isValid }"
    :message-key="`block/${block.uuid}/config/format_string`">
    <div class="block-format-string">
      <text-editor
        v-model="formatString"
        :label="'flow-builder.format-string' | trans"
        :placeholder="'flow-builder.enter-format-string' | trans"
        :valid-state="isValid" />
      <small class="text-muted">
        {{ 'flow-builder.format-string-hint' | trans }}
      </small>
    </div>
  </validation-message>
</template>

<script lang="js">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */
import {lang} from '@/lib/filters/lang'

export default {
  mixins: [lang],
  props: {
    block: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formatString: {
      get() {
        return this.block.config.format_string
      },
      set(value) {
        this.$emit('commitFormatStringChange', value)
      },
    },
  },
}
</script>
