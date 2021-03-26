<template>
  <text-editor v-model="expression" :label="label" :placeholder="placeholder" />
</template>

<script>
import TextEditor from '@/components/common/TextEditor.vue'

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
