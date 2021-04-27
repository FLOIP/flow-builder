<template>
  <div class="float-editor">
    <label>{{label}}</label>
    <div>
      <input
          type="number"
          :min="min"
          class="form-control"
          :class="{ 'is-invalid': validationState }"
          :placeholder="placeholder"
          :value="value"
          :step="step"
          @keypress="filterFloat"
          @keydown="$emit('keydown', $event)"
          @input="$emit('input', $event.target.value)"
      />
    </div>
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: [String, Number],
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    step: {
      type: String,
      default: '0.1',
    },
    value: {
      type: [String, Number],
      required: true,
    },
    min: {
      type: [String, Number],
      required: false,
      default: '', // Meaning it's accepting negative by default
    },
    regexFloatFiltering: {
      type: String,
      required: false,
      default: '[0-9\-.,]',
    },
    validationState: {
      type: Boolean,
      default: null,
      required: false,
    },
  },
  methods: {
    filterFloat(e) {
      if (!e.key.match(new RegExp(this.regexFloatFiltering, 'g'))) {
        e.preventDefault()
      }
    },
  },
}
</script>
