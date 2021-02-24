<template>
  <div class="float-editor">
    <label>{{label}}</label>
    <div v-if="isEditable">
      <input
          type="number"
          :min="min"
          class="form-control"
          :placeholder="placeholder"
          :value="value"
          :step="step"
          @keypress="filterFloat"
          @keydown="$emit('keydown', $event)"
          @input="$emit('input', $event.target.value)"
      />
    </div>

    <p v-else>
      {{value}}
    </p>
    <slot/>
  </div>
</template>

<script>
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
