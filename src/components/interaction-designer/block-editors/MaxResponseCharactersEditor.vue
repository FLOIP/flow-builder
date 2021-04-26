<template>
  <div v-if="hasText" class="form-group block-max-response-characters" :id="`${block.uuid}.config.text.maxResponseCharacters`">
    <numeric-editor v-model.number="maxResponse"
        :regex-numeric-filtering="'[0-9]'"
        :label="'flow-builder.max-response-characters' | trans"
        :placeholder="'flow-builder.enter-value' | trans">
    </numeric-editor>
    <small class="text-muted">
      {{'flow-builder.unlimited-if-not-defined-or-set-as-zero' | trans}}
    </small>
  </div>
</template>

<script>
import NumericEditor from '@/components/common/NumericEditor'
import { get } from 'lodash'
import { lang } from '@/lib/filters/lang'

export default {
  components: {
    NumericEditor,
  },
  mixins: [lang],
  props: {
    hasText: {
      default: true,
      type: Boolean,
    },
    block: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      defaultMaxLength: 0,
    }
  },

  computed: {
    maxResponse: {
      get() {
        return get(this.block, 'config.text.maxResponseCharacters', '')
      },
      set(value) {
        this.$emit('commitMaxResponseCharactersChange', value)
      },
    },
  },
}
</script>
