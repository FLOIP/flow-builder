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
      <!--        <tree-editor v-if="sidebarType === 'TreeEditor'"-->
      <!--                     :jsonValidationResults="jsonValidationResults"-->
      <!--                     :isTreeValid="isTreeValid"/>-->

      <!--        <tree-viewer v-if="sidebarType === 'TreeViewer'"/>-->

      <!--        <block-viewer-->
      <!--          :key="jsKey"-->
      <!--          v-if="sidebarType === 'BlockViewer'"-->
      <!--          :data-for-block-id="jsKey" />-->
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import {get} from 'lodash'

export default {
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
</script>

<style lang="scss">
.block-editor-wrapper {
  position: absolute;
  background: white;
  z-index: 15;
  max-height: 75vh;
  width: 365px;
  overflow-y: scroll;
  padding: 1em;
  border: 1px solid lightgray;
  border-radius: 0;
  box-shadow: 0 3px 6px #cacaca;
  transition: right 200ms ease-in-out, 200ms background-color ease-in-out, 200ms border-color ease-in-out, 200ms border-radius ease-in-out;
}
</style>
