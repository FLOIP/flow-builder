<template>
  <div class="max-response-characters-editor">
    <span class="d-flex mb-2">
      <input
        v-model="shouldShowMaxResponseCharField"
        type="checkbox"
        class="align-self-center">
      <p class="m-0 ml-2">{{ 'flow-builder.max-response-prompt' | trans }}</p>
    </span>
    <validation-message
      v-if="shouldShowMaxResponseCharField"
      #input-control="{ isValid }"
      :message-key="`block/${block.uuid}/config/text/max_response_characters`">
      <div
        v-if="hasText"
        class="block-max-response-characters">
        <numeric-editor
          v-model.number="maxResponse"
          :regex-numeric-filtering="'[0-9]'"
          :label="'flow-builder.max-response-characters' | trans"
          :placeholder="'flow-builder.enter-value' | trans"
          :valid-state="isValid" />
        <small class="text-muted">
          {{ 'flow-builder.unlimited-if-not-defined-or-set-as-zero' | trans }}
        </small>
      </div>
    </validation-message>
  </div>
</template>

<script lang="js">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */
import {get} from 'lodash'
import {lang} from '@/lib/filters/lang'

export const MaxResponseCharactersEditor = {
  mixins: [lang],
  props: {
    hasText: {
      default: true,
      type: Boolean,
    },
    block: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      defaultMaxLength: 0,
      shouldShowMaxResponseCharField: false,
    }
  },

  computed: {
    maxResponse: {
      get() {
        return get(this.block, 'config.text.max_response_characters', '')
      },
      set(value) {
        this.$emit('commitMaxResponseCharactersChange', value)
      },
    },
  },
}
export default MaxResponseCharactersEditor
</script>
