<template>
  <div class="number-editor">
    <label>{{label}}</label>
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
          @input="$emit('input', $event.target.value)"
      />
    </div>
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    state: {
      type: Boolean,
      default: undefined, // to tell boostrap `No state`
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
      default: '[0-9\-]',
    },
  },
  computed: {
    isInvalid() {
      // strict comparison, because `undefined` doesn't mean invalid
      return this.state === false
    }
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
