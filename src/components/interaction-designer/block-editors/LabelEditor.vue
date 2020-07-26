<template>
  <div>
    <text-editor v-model="label"
        :is-editable="isEditable"
        :label="'flow-builder.block-label' | trans"
        :placeholder="'flow-builder.enter-block-label' | trans"/>
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
      label: {
        get() {
          return this.block.label
        },
        set(value) {
          this.block_setLabel({blockId: this.block.uuid, value})
        },
      },
    },
    methods: {
      ...mapMutations('flow', ['block_setLabel']),
    },
  }
</script>
