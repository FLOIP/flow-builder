<template>
  <validation-message
    #input-control="{ isValid }"
    :message-key="`block/${block.uuid}/config/validation_maximum`">
    <div class="block-validation-max">
      <numeric-editor
        v-model.number="maxValue"
        :regex-numeric-filtering="'[0-9]'"
        :label="'flow-builder.maximum-value-(inclusive)' | trans"
        :placeholder="'flow-builder.enter-value' | trans"
        :valid-state="isValid" />
    </div>
  </validation-message>
</template>

<script>
import NumericEditor from '@/components/common/NumericEditor'
import {get} from 'lodash'
import {lang} from '@/lib/filters/lang'
import ValidationMessage from '@/components/common/ValidationMessage'

export default {
  components: {
    NumericEditor,
    ValidationMessage,
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
        return get(this.block, 'config.validation_maximum', this.defaultValue)
      },
      set(value) {
        this.$emit('commitValidationMaximumChange', value)
      },
    },
  },
}
</script>
