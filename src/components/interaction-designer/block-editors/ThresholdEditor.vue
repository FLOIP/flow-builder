<template>
  <validation-message
    #input-control="{ isValid }"
    :message-key="`block/${block.uuid}/config/accuracy_threshold_meters`">
    <div class="block-threshold">
      <float-editor
        v-model.number="threshold"
        :min="0"
        :regex-float-filtering="'[0-9.,]'"
        :label="'flow-builder.accuracy-threshold-in-meters' | trans"
        :placeholder="'flow-builder.enter-value' | trans"
        :valid-state="isValid" />
    </div>
  </validation-message>
</template>

<script lang="js">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */
import FloatEditor from '@/components/common/FloatEditor'
import {get} from 'lodash'
import {lang} from '@/lib/filters/lang'
import {ValidationMessage} from '@/components/common/'

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
