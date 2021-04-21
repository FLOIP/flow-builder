<template>
  <div class="form-group block-threshold">
    <float-editor v-model.number="threshold"
        :min="0"
        :regex-float-filtering="'[0-9.,]'"
        :label="'flow-builder.accuracy-threshold-in-meters' | trans"
        :placeholder="'flow-builder.enter-value' | trans"
        :state="state">
    </float-editor>
  </div>
</template>

<script>
import FloatEditor from '@/components/common/FloatEditor'
import { get } from 'lodash'
import lang from '@/lib/filters/lang'

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
    state: {
      type: Boolean,
      default: undefined, // to tell boostrap `No state`
      required: false,
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
        return get(this.block, 'config.accuracy_threshold_meters', this.defaultValue)
      },
      set(value) {
        this.$emit('commitAccuracyThresholdMetersChange', value)
      },
    },
  },
}
</script>
