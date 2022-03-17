<template>
  <validation-message
    v-if="hasIvr"
    #input-control="{ isValid }"
    :message-key="`block/${block.uuid}/config/ivr/max_digits`">
    <div class="block-max-digits">
      <numeric-editor
        v-model.number="maxDigits"
        :regex-numeric-filtering="'[0-9]'"
        :label="'flow-builder.maximum-digits' | trans"
        :placeholder="'flow-builder.enter-value' | trans"
        :sub-title="'flow-builder.max-digits-help-text' | trans"
        :valid-state="isValid" />
    </div>
  </validation-message>
</template>

<script lang="js">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */
import {get} from 'lodash'
import {lang} from '@/lib/filters/lang'

export const MaxDigitEditor = {
  mixins: [lang],
  props: {
    block: {
      type: Object,
      required: true,
    },
    hasIvr: {
      default: true,
      type: Boolean,
    },
  },
  computed: {
    maxDigits: {
      get() {
        return get(this.block, 'config.ivr.max_digits', '')
      },
      set(value) {
        this.$emit('commitMaxDigitsChange', value)
      },
    },
  },
}
export default MaxDigitEditor
</script>
