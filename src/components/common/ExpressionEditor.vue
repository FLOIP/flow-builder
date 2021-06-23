<template>
  <text-editor class="expression-editor"
      v-model="expression"
      :label="label"
      :disabled="disabled"
      :placeholder="placeholder"
      :validState="validState" />
</template>

<script>
import TextEditor from '@/components/common/TextEditor'

export default {
  components: {
    TextEditor,
  },
  props: {
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
    validState: {
      type: Boolean,
      default: null,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false,
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
