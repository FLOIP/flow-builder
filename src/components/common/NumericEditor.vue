<template>
  <div class="number-editor">
    <label>{{label}}</label>
    <div>
      <input
          type="number"
          min="0"
          class="form-control"
          :placeholder="placeholder"
          :value="value"
          :disabled="!isEditable"
          @keypress="filterNumeric"
          @keydown="$emit('keydown', $event)"
          @input="$emit('input', $event.target.value)"
      />
    </div>
    <slot/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: {
    isEditable: {
      default: true,
      type: Boolean,
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
      default: '[0-9\-]',
    },
  },
  methods: {
    filterNumeric(e) {
      if (!e.key.match(new RegExp(this.regexNumericFiltering, 'g'))) {
        e.preventDefault();
      }
    },
  },
};
</script>
