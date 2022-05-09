<template>
  <div class="text-editor">
    <label
      v-if="label"
      :class="labelClass">{{ label }}</label>
    <textarea
      class="form-control"
      :class="{ 'is-invalid': isInvalid }"
      :placeholder="placeholder"
      :value="value"
      :rows="rows"
      @keydown="$emit('keydown', $event)"
      @input="$emit('input', $event.target.value)" />
    <slot />
  </div>
</template>

<script lang="js">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */
export const TextEditor = {
  props: {
    label: {
      type: [String, Number],
      required: true,
    },
    labelClass: {
      type: String,
      default: 'text-primary',
      required: false,
    },
    placeholder: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    validState: {
      type: Boolean,
      default: null,
      required: false,
    },
    rows: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  computed: {
    isInvalid() {
      return this.validState === false
    },
  },
}

export default TextEditor
</script>
