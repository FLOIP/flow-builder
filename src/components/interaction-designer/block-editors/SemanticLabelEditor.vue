<template>
  <validation-message :message-key="`block/${block.uuid}/.semantic_label`" #input-control="{ isInvalid }">
    <div class="block-semantic-label">
      <text-editor v-model="semanticLabel"
                   :label="'flow-builder.block-semantic-label' | trans"
                   :placeholder="'flow-builder.enter-block-semantic-label' | trans"
                   :validationState="isInvalid" />
    </div>
  </validation-message>
</template>

<script>
import { mapMutations } from 'vuex'
import TextEditor from '@/components/common/TextEditor'
import { lang } from '@/lib/filters/lang'
import ValidationMessage from '@/components/common/ValidationMessage';

export default {
  components: {
    TextEditor,
    ValidationMessage
  },
  props: {
    block: {
      type: Object,
      required: true,
    },
  },
  mixins: [lang],
  computed: {
    semanticLabel: {
      get() {
        return this.block.semantic_label || ''
      },
      set(value) {
        this.block_setSemanticLabel({ blockId: this.block.uuid, value })
      },
    },
  },
  methods: {
    ...mapMutations('flow', ['block_setSemanticLabel']),
  },
}

</script>
