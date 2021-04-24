<template>
  <validation-message :message-key="`block/${block.uuid}/.config.format_string`" #input-control="{ isValid }">
    <div class="block-format-string">
      <text-editor v-model="formatString"
          :label="'flow-builder.format-string' | trans"
          :placeholder="'flow-builder.enter-format-string' | trans"
          :validationState="!isValid" />
    </div>
  </validation-message>
</template>

<script>
import TextEditor from '@/components/common/TextEditor'
import { lang } from '@/lib/filters/lang'
import ValidationMessage from '@/components/common/ValidationMessage';

export default {
  components: {
    TextEditor,
    ValidationMessage,
  },
  mixins: [lang],
  props: {
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
