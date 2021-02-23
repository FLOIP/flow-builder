<template>
  <div>
    <text-editor v-model="semanticLabel"
        :is-editable="isEditable"
        :label="'flow-builder.block-semantic-label' | trans"
        :placeholder="'flow-builder.enter-block-semantic-label' | trans"/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import TextEditor from '@/components/common/TextEditor';
import lang from '@/lib/filters/lang';

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
    block: {
      type: Object,
      required: true,
    },
  },
  mixins: [lang],
  computed: {
    semanticLabel: {
      get() {
        return this.block.semanticLabel;
      },
      set(value) {
        this.block_setSemanticLabel({ blockId: this.block.uuid, value });
      },
    },
  },
  methods: {
    ...mapMutations('flow', ['block_setSemanticLabel']),
  },
};

</script>
