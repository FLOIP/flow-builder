<template>
  <div>
    <text-editor v-model="semanticLabel"
        :is-editable="isEditable"
        :label="'flow-builder.block-semantic-label' | trans"
        :placeholder="'flow-builder.enter-block-semantic-label' | trans"/>
  </div>
</template>

<script>
  import lang from 'lib/filters/lang'
  import {mapMutations} from 'vuex'
  import TextEditor from '../../common/TextEditor'

  export default {
    name: 'SemanticLabelEditor',
    components: {
      TextEditor,
    },
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
          return this.block.semanticLabel
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

</script>
