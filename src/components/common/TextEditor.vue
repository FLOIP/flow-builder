<template>
  <div class="form-group">
    <label>{{label}}</label>
    <textarea v-if="isEditable"
        class="form-control"
        :placeholder="placeholder"
        :value="value"
        @keydown="$emit('keydown', $event)"
        @input="$emit('input', $event.target.value)"/>

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
        required: true,
      },
      value: {
        type: String,
        default: '',
      },
    },
  }
</script>
