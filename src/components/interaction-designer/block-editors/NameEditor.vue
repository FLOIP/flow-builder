<template>
  <div class="block-name">
    <text-editor v-model="name"
                 :label="'flow-builder.block-name' | trans"
                 :placeholder="'flow-builder.enter-block-name' | trans"
                 :validationState="validationState"
                 @keydown="filterName">
      <small class="text-muted">
        {{'flow-builder.only-accepts-word-characters' | trans}}
      </small>
    </text-editor>
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
  mixins: [lang],
  props: {
    block: {
      type: Object,
      required: true,
    },
    validationState: {
      type: Boolean,
      default: null, // to tell boostrap `No state`
      required: false,
    },
  },
  computed: {
    name: {
      get() {
        return this.block.name
      },
      set(value) {
        this.block_setName({ blockId: this.block.uuid, value })
      },
    },

  },
  methods: {
    ...mapMutations('flow', ['block_setName']),
    filterName(e) {
      if (e.key.match(/\W+|Enter/g)) {
        e.preventDefault()
      }
    },
  },
}
</script>
