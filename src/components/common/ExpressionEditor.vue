<template>
  <text-editor
    v-model="expression"
    class="expression-editor"
    :label="label"
    :placeholder="placeholder"
    :valid-state="validState" />
</template>

<script lang="js">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */
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
