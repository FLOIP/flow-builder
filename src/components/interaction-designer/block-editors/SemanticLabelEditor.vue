<template>
  <div>
    <text-editor v-model="semanticLabel"
                 :label="'flow-builder.block-semantic-label' | trans"
                 :placeholder="'flow-builder.enter-block-semantic-label' | trans"
                 :state="state" />
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
    block: {
      type: Object,
      required: true,
    },
    state: {
      type: Boolean,
      default: undefined, // to tell boostrap `No state`
      required: false,
    },
  },
  mixins: [lang],
  computed: {
    semanticLabel: {
      get() {
        return this.block.semantic_label
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
