<template>
  <text-editor v-model="expression"
      :label="label"
      :is-editable="isEditable"
      :placeholder="placeholder"/>
</template>

<script>
  import TextEditor from './TextEditor'

  export default {
    components: {
      TextEditor,
    },
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
      currentExpression: {
        type: String,
        required: true,
      },
      expressionIdentifier: {
        type: [String, Number],
        default: null,
      },
    },

    computed: {
      expression: {
        get() {
          return this.currentExpression
        },
        set(value) {
          if (this.expressionIdentifier !== null) {
            value = {
              identifier: this.expressionIdentifier,
              value,
            }
          }
          this.$emit('commitExpressionChange', value)
        },
      },
    },
  }
</script>
