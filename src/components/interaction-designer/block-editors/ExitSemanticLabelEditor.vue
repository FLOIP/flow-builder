<template>
  <div>
    <text-editor v-model="semanticLabel"
                 :is-editable="isEditable"
                 :label="'flow-builder.block-exit-semantic-label' | trans"
                 :placeholder="'flow-builder.enter-block-exit-semantic-label' | trans"/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import TextEditor from '@/components/common/TextEditor'
import lang from '@/lib/filters/lang'

export default {
  components: {
    TextEditor,
  },
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
        return this.exit.semanticLabel
      },
      set(value) {
        this.exit.semanticLabel = value
        this.$emit('commitSemanticLabel', value)
      },
    },
  },
  methods: {
    ...mapMutations('flow', ['block_setExitSemanticLabel']),
  },
}

</script>
