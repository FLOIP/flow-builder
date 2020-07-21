<template>
  <div>
    <text-editor v-model="name"
        :is-editable="isEditable"
        :label="'flow-builder.block-name' | trans"
        :placeholder="'flow-builder.enter-block-name' | trans"
        @keydown="filterName">
      <small class="text-muted">
        {{'flow-builder.only-accepts-word-characters' | trans}}
      </small>
    </text-editor>
  </div>
</template>

<script>
  import lang from 'lib/filters/lang'
  import {mapMutations} from 'vuex'
  import TextEditor from '../../common/TextEditor'

  export default {
    name: 'NameEditor',
    components: {
      TextEditor,
    },
    props: {
      //TODO - where should this come from - here and in other cases? Platform metadata? Need to write a story for this mode
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
      name: {
        get() {
          return this.block.name
        },
        set(value) {
          this.block_setName({blockId: this.block.uuid, value})
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
