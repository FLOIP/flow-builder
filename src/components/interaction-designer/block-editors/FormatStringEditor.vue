<template>
  <div>
    <text-editor v-model="formatString"
        :label="'flow-builder.format-string' | trans"
        :placeholder="'flow-builder.enter-format-string' | trans"/>
    <small class="text-muted" v-if="!isScanfSelectorValid">
      {{'flow-builder.scanf-format-string-invalid' | trans}}
    </small>
  </div>
</template>

<script>
import TextEditor from '@/components/common/TextEditor'
import lang from '@/lib/filters/lang'
import scanf from 'scanf'

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
          scanf(newFormatString)
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
