<template>
  <validation-message
    #input-control="{ isValid }"
    :message-key="`block/${block.uuid}/semantic_label`">
    <div class="semantic-label-editor">
      <text-editor
        v-model="semanticLabel"
        :label="'flow-builder.block-exit-semantic-label' | trans"
        :placeholder="'flow-builder.enter-block-semantic-label' | trans"
        :valid-state="isValid" />
    </div>
  </validation-message>
</template>

<script lang="js">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */
import {mapMutations} from 'vuex'
import {lang} from '@/lib/filters/lang'

export const SemanticLabelEditor = {
  mixins: [lang],
  props: {
    block: {
      type: Object,
      required: true,
    },
  },
  computed: {
    semanticLabel: {
      get() {
        return this.block.semantic_label || ''
      },
      set(value) {
        this.block_setSemanticLabel({blockId: this.block.uuid, value})
      },
    },
  },
  methods: {
    ...mapMutations('flow', ['block_setSemanticLabel']),
  },
}
export default SemanticLabelEditor
</script>
