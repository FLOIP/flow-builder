<template>
  <div v-if="hasIvr" class="form-group block-max-duration-seconds">
    <numeric-editor v-model.number="duration"
        :regex-numeric-filtering="'[0-9]'"
        :label="'flow-builder.max-duration-in-seconds' | trans"
        :placeholder="'flow-builder.enter-value' | trans"
        :validationState="validationState">
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
    hasIvr: {
      default: true,
      type: Boolean,
    },
    block: {
      type: Object,
      required: true,
    },
    validationState: {
      type: Boolean,
      default: null, // to tell boostrap `No state`
      required: false,
    },
  },
  data() {
    return {
      defaultMaxDuration: 0,
    }
  },

  computed: {
    duration: {
      get() {
        return get(this.block, 'config.ivr.max_duration_seconds', '')
      },
      set(value) {
        this.$emit('commitMaxDurationChange', value)
      },
    },
  },
}
</script>
