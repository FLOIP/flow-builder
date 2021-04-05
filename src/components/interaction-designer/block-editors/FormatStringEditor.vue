<template>
  <div>
    <text-editor v-model="formatString"
        :label="'flow-builder.format-string' | trans"
        :placeholder="'flow-builder.enter-format-string' | trans">
      <small class="text-danger" v-if="!isScanfSelectorValid">
        {{'flow-builder.scanf-format-string-invalid' | trans}}
      </small>
    </text-editor>
  </div>
</template>

<script>
import TextEditor from '@/components/common/TextEditor'
import lang from '@/lib/filters/lang'
import { sscanf } from 'scanf'

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
  },
  data() {
    return {
      isScanfSelectorValid: true,
    }
  },
  computed: {
    formatString: {
      get() {
        return this.block.config.format_string
      },
      set(newFormatString) {
        try {
          sscanf('any string', newFormatString)
          this.isScanfSelectorValid = true
        } catch (error) {
          this.isScanfSelectorValid = false
        }
        this.$emit('commitFormatStringChange', newFormatString)
      },
    },
  },
}
</script>
