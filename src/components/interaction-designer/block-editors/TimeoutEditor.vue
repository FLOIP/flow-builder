<template>
  <div class="form-group block-timeout">
    <numeric-editor v-model.number="timeout"
        :is-editable="isEditable"
        :regex-numeric-filtering="'[0-9]'"
        :label="'flow-builder.Accuracy-timeout-in-seconds' | trans"
        :placeholder="'flow-builder.enter-value' | trans">
    </numeric-editor>
  </div>
</template>

<script>
import NumericEditor from '@/components/common/NumericEditor';
import { get } from 'lodash';
import lang from '@/lib/filters/lang';

export default {
  components: {
    NumericEditor,
  },
  mixins: [lang],
  props: {
    isEditable: {
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
      defaultValue: 120,
    };
  },

  computed: {
    timeout: {
      get() {
        return get(this.block, 'config.accuracyTimeoutSeconds', this.defaultValue);
      },
      set(value) {
        this.$emit('commitAccuracyTimeoutSecondsChange', value);
      },
    },
  },
};
</script>
