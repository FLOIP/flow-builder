<template>
  <div class="form-group">
    <label>{{label}}</label>
    <textarea
        class="form-control"
        :class="{ 'is-invalid': isInvalid }"
        :placeholder="placeholder"
        :value="value"
        @keydown="$emit('keydown', $event)"
        @input="$emit('input', $event.target.value)"/>
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
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    state: {
      type: Boolean,
      default: undefined, // to tell boostrap `No state`
      required: false,
    },
  },
  computed: {
    isInvalid() {
      // strict comparison, because `undefined` doesn't mean invalid
      return this.state === false
    }
  },
}
</script>
