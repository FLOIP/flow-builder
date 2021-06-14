<template>
  <validation-message :message-key="`block/${block.uuid}/config/accuracy_threshold_meters`">
    <template
      :id="`${block.uuid}.config.accuracyThresholdMeters`"
      #input-control="{ isValid }"
      class="form-group block-threshold"
    >
      <float-editor
        v-model.number="threshold"
        :min="0"
        :regex-float-filtering="'[0-9.,]'"
        :label="'flow-builder.accuracy-threshold-in-meters' | trans"
        :placeholder="'flow-builder.enter-value' | trans"
        :valid-state="isValid"
      />
    </template>
  </validation-message>
</template>

<script>
import FloatEditor from '@/components/common/FloatEditor.vue'
import {get} from 'lodash'
import {lang} from '@/lib/filters/lang'
import ValidationMessage from '@/components/common/ValidationMessage.vue'

export default {
  components: {
    FloatEditor,
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
