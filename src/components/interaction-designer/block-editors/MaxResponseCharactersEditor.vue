<template>
  <div v-if="hasText" class="form-group block-max-response-characters">
    <numeric-editor v-model.number="maxResponse"
        :is-editable="isEditable"
        :label="'flow-builder.max-response-characters' | trans"
        :placeholder="'flow-builder.enter-max-value' | trans">
    </numeric-editor>
    <small class="text-muted">
      {{'flow-builder.unlimited-if-not-defined-or-set-as-zero' | trans}}
    </small>
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
      hasText: {
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
        defaultMaxLength: 0,
      }
    },

    computed: {
      maxResponse: {
        get() {
          return get(this.block, 'config.text.maxResponseCharacters', '')
        },
        set(value) {
          this.$emit('commitMaxResponseCharactersChange', value)
        }
      }
    }
  }
</script>
