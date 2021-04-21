<template>
  <div class="form-group block-validation-max">
    <numeric-editor v-model.number="maxValue"
        :regex-numeric-filtering="'[0-9]'"
        :label="'flow-builder.maximum-value-(inclusive)' | trans"
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
      defaultValue: 0,
    }
  },

  computed: {
    maxValue: {
      get() {
        return get(this.block, 'config.validationMaximum', this.defaultValue)
      },
      set(value) {
        this.$emit('commitValidationMaximumChange', value)
      },
    },
  },
}
</script>
