<template>
  <div class="number-editor">
    <label class="text-primary mb-0">{{ label }}</label>
    <div class="small mb-2">{{subTitle}}</div>
    <div>
      <input
        type="number"
        min="0"
        class="form-control"
        :class="{ 'is-invalid': isInvalid }"
        :placeholder="placeholder"
        :value="value"
        @keypress="filterNumeric"
        @keydown="$emit('keydown', $event)"
        @input="$emit('input', $event.target.value)">
    </div>
    <slot />
  </div>
</template>

<script lang="js">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */
export default {
  props: {
    validState: {
      type: Boolean,
      default: null,
      required: false,
    },
    label: {
      type: [String, Number],
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      required: true,
    },
    regexNumericFiltering: {
      type: String,
      required: false,
      default: '[0-9-]',
    },
    subTitle: {
      type: [String],
      required: false,
      default: '',
    },
  },
  computed: {
    isInvalid() {
      // strict comparison, because `undefined` doesn't mean invalid
      return this.validState === false
    },
  },
  methods: {
    filterNumeric(e) {
      if (!e.key.match(new RegExp(this.regexNumericFiltering, 'g'))) {
        e.preventDefault()
      }
    },
  },
}
</script>
