<template>
  <div>
    <text-editor v-model="formatString"
        :is-editable="isEditable"
        :label="'flow-builder.format-string' | trans"
        :placeholder="'flow-builder.enter-format-string' | trans"/>
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
      isEditable: {
        default: true,
        type: Boolean,
      },
      block: {
        type: Object,
        required: true,
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
