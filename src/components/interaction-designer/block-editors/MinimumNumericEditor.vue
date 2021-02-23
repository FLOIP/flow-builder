<template>
  <div class="form-group block-validation-min">
    <numeric-editor v-model.number="minValue"
        :is-editable="isEditable"
        :regex-numeric-filtering="'[0-9]'"
        :label="'flow-builder.minimum-value-(inclusive)' | trans"
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
      defaultValue: 0,
    };
  },

  computed: {
    minValue: {
      get() {
        return get(this.block, 'config.validationMinimum', this.defaultValue);
      },
      set(value) {
        this.$emit('commitValidationMinimumChange', value);
      },
    },
  },
};
</script>
