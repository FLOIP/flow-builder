<template>
  <div class="form-group block-threshold">
    <float-editor v-model.number="threshold"
        :is-editable="isEditable"
        :label="'flow-builder.accuracy-threshold-in-meters' | trans"
        :placeholder="'flow-builder.enter-value' | trans">
    </float-editor>
  </div>
</template>

<script>
  import FloatEditor from '@/components/common/FloatEditor'
  import {get} from 'lodash'
  import lang from '@/lib/filters/lang'

  export default {
    components: {
      FloatEditor,
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
        defaultValue: 5.0,
      }
    },

    computed: {
      threshold: {
        get() {
          return get(this.block, 'config.accuracyThresholdMeters', this.defaultValue)
        },
        set(value) {
          this.$emit('commitAccuracyThresholdMetersChange', value)
        }
      }
    }
  }
</script>
