<template>
  <validation-message :message-key="`block/${block.uuid}/config/text/max_response_characters`" #input-control="{ isValid }">
    <div v-if="hasText" class="form-group block-max-response-characters">
      <numeric-editor v-model.number="maxResponse"
          :regex-numeric-filtering="'[0-9]'"
          :label="'flow-builder.max-response-characters' | trans"
          :placeholder="'flow-builder.enter-value' | trans"
          :validState="isValid">
      </numeric-editor>
      <small class="text-muted">
        {{'flow-builder.unlimited-if-not-defined-or-set-as-zero' | trans}}
      </small>
    </div>
  </validation-message>
</template>

<script>
import NumericEditor from '@/components/common/NumericEditor'
import { get } from 'lodash'
import { lang } from '@/lib/filters/lang'
import ValidationMessage from '@/components/common/ValidationMessage';

export default {
  components: {
    NumericEditor,
    ValidationMessage
  },
  mixins: [lang],
  props: {
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
        return get(this.block, 'config.text.max_response_characters', '')
      },
      set(value) {
        this.$emit('commitMaxResponseCharactersChange', value)
      },
    },
  },
}
</script>
