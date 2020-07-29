<template>
  <div v-if="hasIvr" class="form-group block-max-digits">
    <numeric-editor v-model.number="maxDigits"
        :is-editable="isEditable"
        :label="'flow-builder.Maximum-digits' | trans"
        :placeholder="'flow-builder.enter-value' | trans">
    </numeric-editor>
  </div>
</template>

<script>
  import NumericEditor from '@/components/common/NumericEditor'
  import {get} from 'lodash'
  import lang from '@/lib/filters/lang'

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
      hasIvr: {
        default: true,
        type: Boolean,
      },
    },

    computed: {
      maxDigits: {
        get() {
          return get(this.block, 'config.ivr.maxDigits', '')
        },
        set(value) {
          this.$emit('commitMaxDigitsChange', value)
        }
      }
    }
  }
</script>
