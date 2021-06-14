<template>
  <validation-message :message-key="`block/${block.uuid}/config/ivr/max_digits`">
    <template
      v-if="hasIvr"
      :id="`${block.uuid}.config.ivr.maxDigits`"
      #input-control="{ isValid }"
      class="form-group block-max-digits"
    >
      <numeric-editor
        v-model.number="maxDigits"
        :regex-numeric-filtering="'[0-9]'"
        :label="'flow-builder.maximum-digits' | trans"
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
    hasIvr: {
      default: true,
      type: Boolean,
    },
  },
  computed: {
    maxDigits: {
      get() {
        return get(this.block, 'config.ivr.max_digits', '')
      },
      set(value) {
        this.$emit('commitMaxDigitsChange', value)
      },
    },
  },
}
</script>
