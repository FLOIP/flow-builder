<template>
  <div class="form-group block-timeout">
    <numeric-editor v-model.number="timeout"
        :regex-numeric-filtering="'[0-9]'"
        :label="'flow-builder.accuracy-timeout-in-seconds' | trans"
        :placeholder="'flow-builder.enter-value' | trans">
    </numeric-editor>
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
    block: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      defaultValue: 120,
    }
  },

  computed: {
    timeout: {
      get() {
        return get(this.block, 'config.accuracy_timeout_seconds', this.defaultValue)
      },
      set(value) {
        this.$emit('commitAccuracyTimeoutSecondsChange', value)
      },
    },
  },
}
</script>
