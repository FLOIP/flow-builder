<template>
  <div>
    <text-editor v-model="formatString"
        :label="'flow-builder.format-string' | trans"
        :placeholder="'flow-builder.enter-format-string' | trans"
        :state="state" />
  </div>
</template>

<script>
import TextEditor from '@/components/common/TextEditor'
import lang from '@/lib/filters/lang'

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
    state: {
      type: Boolean,
      default: undefined, // to tell boostrap `No state`
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
