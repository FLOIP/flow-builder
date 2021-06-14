<template>
  <validation-message :message-key="`block/${block.uuid}/config/ivr/max_duration_seconds`">
    <template
      v-if="hasIvr"
      :id="`${block.uuid}.config.ivr.maxDurationSeconds`"
      #input-control="{ isValid }"
      class="form-group block-max-duration-seconds"
    >
      <numeric-editor
        v-model.number="duration"
        :regex-numeric-filtering="'[0-9]'"
        :label="'flow-builder.max-duration-in-seconds' | trans"
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
    hasIvr: {
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
      defaultMaxDuration: 0,
    }
  },

  computed: {
    duration: {
      get() {
        return get(this.block, 'config.ivr.max_duration_seconds', '')
      },
      set(value) {
        this.$emit('commitMaxDurationChange', value)
      },
    },
  },
}
</script>
