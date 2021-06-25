<template>
  <validation-message
    #input-control="{ isValid }"
    :message-key="`block/${block.uuid}/config/validation_minimum`">
    <div class="block-validation-min">
      <numeric-editor
        v-model.number="minValue"
        :regex-numeric-filtering="'[0-9]'"
        :label="'flow-builder.minimum-value-(inclusive)' | trans"
        :placeholder="'flow-builder.enter-value' | trans"
        :valid-state="isValid" />
    </div>
  </validation-message>
</template>

<script lang="js">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */
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
    minValue: {
      get() {
        return get(this.block, 'config.validation_minimum', this.defaultValue)
      },
      set(value) {
        this.$emit('commitValidationMinimumChange', value)
      },
    },
  },
}
</script>
