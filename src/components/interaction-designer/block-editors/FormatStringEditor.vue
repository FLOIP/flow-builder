<template>
  <div class="block-format-string">
    <text-editor v-model="formatString"
        :label="'flow-builder.format-string' | trans"
        :placeholder="'flow-builder.enter-format-string' | trans"
        :validationState="validationState" />
  </div>
</template>

<script>
import TextEditor from '@/components/common/TextEditor'
import { lang } from '@/lib/filters/lang'

export default {
  components: {
    TextEditor,
  },
  mixins: [lang],
  props: {
    block: {
      type: Object,
      required: true,
    },
    validationState: {
      type: Boolean,
      default: null, // to tell boostrap `No state`
      required: false,
    },
  },
  computed: {
    formatString: {
      get() {
        return this.block.config.format_string
      },
      set(value) {
        this.$emit('commitFormatStringChange', value)
      },
    },
  },
}
</script>
