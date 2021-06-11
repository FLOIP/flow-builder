<template>
  <validation-message
    #input-control="{ isValid }"
    :message-key="`block/${block.uuid}/config/format_string`"
  >
    <div class="block-format-string">
      <text-editor
        v-model="formatString"
        :label="'flow-builder.format-string' | trans"
        :placeholder="'flow-builder.enter-format-string' | trans"
        :valid-state="isValid"
      />
    </div>
  </validation-message>
</template>

<script>
import TextEditor from '@/components/common/TextEditor.vue'
import {lang} from '@/lib/filters/lang'
import ValidationMessage from '@/components/common/ValidationMessage.vue'

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
