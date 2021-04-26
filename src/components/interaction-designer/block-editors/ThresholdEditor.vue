<template>
  <div class="form-group block-threshold" :id="`${block.uuid}.config.accuracyThresholdMeters`">
    <float-editor v-model.number="threshold"
        :min="0"
        :regex-float-filtering="'[0-9.,]'"
        :label="'flow-builder.accuracy-threshold-in-meters' | trans"
        :placeholder="'flow-builder.enter-value' | trans">
    </float-editor>
  </div>
</template>

<script>
import FloatEditor from '@/components/common/FloatEditor'
import { get } from 'lodash'
import { lang } from '@/lib/filters/lang'

export default {
  components: {
    FloatEditor,
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
      defaultValue: 5.0,
    }
  },

  computed: {
    threshold: {
      get() {
        return get(this.block, 'config.accuracyThresholdMeters', this.defaultValue)
      },
      set(value) {
        this.$emit('commitAccuracyThresholdMetersChange', value)
      },
    },
  },
}
</script>
