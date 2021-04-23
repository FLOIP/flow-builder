<template>
  <validation-message :message-key="`block/${block.uuid}/.name`" #input-control="{ isValid }">
    <div class="block-name">
      <text-editor v-model="name"
                   :label="'flow-builder.block-name' | trans"
                   :placeholder="'flow-builder.enter-block-name' | trans"
                   :validationState="!isValid"
                   @keydown="filterName">
        <small class="text-muted">
          {{'flow-builder.only-accepts-word-characters' | trans}}
        </small>
      </text-editor>
    </div>
  </validation-message>
</template>

<script>
import { mapMutations } from 'vuex'
import TextEditor from '@/components/common/TextEditor'
import { lang } from '@/lib/filters/lang'
import ValidationMessage from '@/components/common/ValidationMessage';

export default {
  components: {
    TextEditor,
    ValidationMessage
  },
  mixins: [lang],
  props: {
    block: {
      type: Object,
      required: true,
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
