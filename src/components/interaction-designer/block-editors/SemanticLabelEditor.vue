<template>
  <div class="block-semantic-label" :id="`${block.uuid}.semanticLabel`">
    <text-editor v-model="semanticLabel"
        :label="'flow-builder.block-semantic-label' | trans"
        :placeholder="'flow-builder.enter-block-semantic-label' | trans"/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import TextEditor from '@/components/common/TextEditor'
import { lang } from '@/lib/filters/lang'

export default {
  components: {
    TextEditor,
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
