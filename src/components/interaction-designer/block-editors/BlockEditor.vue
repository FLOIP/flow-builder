<template>
  <div class="block-editor-wrapper">
    <div v-if="activeBlock" class="block-editor">
      <div class="tree-sidebar-edit-block"
           :data-block-type="activeBlock && activeBlock.type"
           :data-for-block-id="activeBlock && activeBlock.uuid">
        <component v-if="activeBlock"
                   :is="`Flow${activeBlock.type.replace('.', '')}`"
                   :block="activeBlock"
                   :flow="activeFlow" />
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import {get} from 'lodash'

export const BlockEditor = {
  computed: {
    ...mapGetters('builder', ['activeBlock']),
    ...mapState({
      blockClasses: ({trees: {ui}}) => ui.blockClasses,
    }),
    ...mapGetters('flow', ['activeFlow']),
  },
  methods: {
    sidebarType() {
      const blockType = get(this.selectedBlock, 'type')
      return this.isEditable
        ? blockType || 'TreeEditor'
        : blockType || 'TreeViewer'
    },
  },
}
export default BlockEditor
</script>

<style lang="scss">
.block-editor-wrapper {
  position: absolute;
  top: 0;
  background: white;
  z-index: 15;
  max-height: 75vh;
  width: 365px;
  overflow-y: scroll;
  padding: 1em;
  padding-top: 0;
  border: 1px solid lightgray;
  border-radius: 0;
  box-shadow: 0 3px 6px #cacaca;
  transition: right 200ms ease-in-out, 200ms background-color ease-in-out, 200ms border-color ease-in-out, 200ms border-radius ease-in-out;
}


.viamo-app-container .block-editor-wrapper.block-editor {
  left: 90px;
}

.block-editor-header {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 1);
  padding-top: 1rem;
  padding-bottom: 0.8rem;
  z-index: 15;
}
</style>
