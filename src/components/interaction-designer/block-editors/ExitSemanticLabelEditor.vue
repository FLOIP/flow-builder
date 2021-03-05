<template>
  <div v-if="exit">
    <text-editor v-model="semanticLabel"
        :is-editable="isEditable"
        :label="'flow-builder.block-exit-semantic-label' | trans"
        :placeholder="'flow-builder.enter-block-exit--semantic-label' | trans"/>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import TextEditor from '@/components/common/TextEditor'
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
      exit: {
        type: Object,
        required: true,
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
          return this.exit.semanticLabel
        },
        set(value) {
          this.block_setExitSemanticLabel({exitId: this.exit.uuid, blockId: this.block.uuid, value})
        },
      },
    },
    methods: {
      ...mapMutations('flow', ['block_setExitSemanticLabel']),
    },
  }

</script>
