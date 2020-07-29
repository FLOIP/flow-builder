<template>
  <div class="float-editor">
    <label>{{label}}</label>
    <div v-if="isEditable">
      <input
          type="number"
          min="0"
          class="form-control"
          :placeholder="placeholder"
          :value="value"
          :step="step"
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
        default: "",
      },
      step: {
        type: String,
        default: "0.1",
      },
      value: {
        type: [String, Number],
        required: true,
      },
    },
  }
</script>
