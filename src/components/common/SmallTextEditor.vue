<template>
  <div>
    <h6 v-if="label">{{ label }}</h6>
    <input
      type="text"
      class="form-control w-100"
      :class="{ 'is-invalid': isInvalid }"
      :placeholder="placeholder"
      :value="value"
      @keydown="$emit('keydown', $event)"
      @input="$emit('input', $event.target.value)" />
    <slot />
  </div>
</template>

<script lang="js">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */
export default {
  props: {
    label: {
      type: [String, Number],
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
  },
  computed: {
    isInvalid() {
      return this.validState === false
    },
  },
}
</script>
