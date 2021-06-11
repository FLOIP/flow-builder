<template>
  <validation-message
    #input-control="{ isValid }"
    :message-key="`block/${block.uuid}/config/accuracy_timeout_seconds`"
  >
    <div
      :id="`${block.uuid}.config.accuracyTimeoutSeconds`"
      class="form-group block-timeout"
    >
      <numeric-editor
        v-model.number="timeout"
        :regex-numeric-filtering="'[0-9]'"
        :label="'flow-builder.accuracy-timeout-in-seconds' | trans"
        :placeholder="'flow-builder.enter-value' | trans"
        :valid-state="isValid"
      />
    </div>
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
    validState: {
      type: Boolean,
      default: null,
      required: false,
    },
  },
  data() {
    return {
      defaultValue: 120,
    }
  },
  computed: {
    timeout: {
      get() {
        return get(this.block, 'config.accuracy_timeout_seconds', this.defaultValue)
      },
      set(value) {
        this.$emit('commitAccuracyTimeoutSecondsChange', value)
      },
    },
  },
}
</script>
