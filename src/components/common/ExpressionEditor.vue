<template>
  <text-editor v-model="expression"
      :label="label"
      :placeholder="placeholder"
      :state="state" />
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
    state: {
      type: Boolean,
      default: undefined, // to tell boostrap `No state`
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
