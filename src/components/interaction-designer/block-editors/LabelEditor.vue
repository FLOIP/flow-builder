<template>
  <div>
    <text-editor v-model="label"
        :label="'flow-builder.block-label' | trans"
        :placeholder="'flow-builder.enter-block-label' | trans"/>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
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
  },
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
