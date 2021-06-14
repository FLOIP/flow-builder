<template>
  <validation-message :message-key="`block/${block.uuid}/config/validation_maximum`">
    <template
      :id="`${block.uuid}.config.validationMaximum`"
      #input-control="{ isValid }"
      class="form-group block-validation-max"
    >
      <numeric-editor
        v-model.number="maxValue"
        :regex-numeric-filtering="'[0-9]'"
        :label="'flow-builder.maximum-value-(inclusive)' | trans"
        :placeholder="'flow-builder.enter-value' | trans"
        :valid-state="isValid"
      />
    </template>
  </validation-message>
</template>

<script>
import NumericEditor from '@/components/common/NumericEditor.vue'
import {get} from 'lodash'
import {lang} from '@/lib/filters/lang'
import ValidationMessage from '@/components/common/ValidationMessage.vue'

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
