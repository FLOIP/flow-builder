<template>
  <div class="exit-semantic-label-editor">
    <text-editor
      v-model="semanticLabel"
      :is-editable="isEditable"
      :label="'flow-builder.block-exit-semantic-label' | trans"
      :placeholder="'flow-builder.enter-block-exit-semantic-label' | trans" />
  </div>
</template>

<script lang="js">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */
import {mapMutations} from 'vuex'
import {lang} from '@/lib/filters/lang'

export const ExitSemanticLabelEditor = {
  mixins: [lang],
  props: {
    isEditable: {
      default: true,
      type: Boolean,
    },
    exit: {
      type: Object,
      required: true,
    },
  },
  computed: {
    semanticLabel: {
      get() {
        return this.exit.semantic_label
      },
      set(value) {
        this.exit.semantic_label = value
        this.$emit('commitSemanticLabel', value)
      },
    },
  },
  methods: {
    ...mapMutations('flow', ['block_setExitSemanticLabel']),
  },
}

export default ExitSemanticLabelEditor
</script>
