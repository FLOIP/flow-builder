<template>
  <div class="form-group block-validation-min">
    <numeric-editor v-model.number="minValue"
        :is-editable="isEditable"
        :label="'flow-builder.Minimum-value-(inclusive)' | trans"
        :placeholder="'flow-builder.enter-value' | trans">
    </numeric-editor>
  </div>
</template>

<script>
  import NumericEditor from '@/components/common/NumericEditor'
  import {get} from 'lodash'

  export default {
    components: {
      NumericEditor,
    },
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
        defaultValue: 0,
      }
    },

    computed: {
      minValue: {
        get() {
          return get(this.block, 'config.validationMinimum', this.defaultValue)
        },
        set(value) {
          this.$emit('commitValidationMinimumChange', value)
        }
      }
    }
  }
</script>
