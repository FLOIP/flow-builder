<template>
  <div class="block-editor-wrapper">
    <div v-if="activeBlock" class="tree-sidebar"
         :class="[`category-${blockClasses[activeBlock.type].category}`]">
        <div class="tree-sidebar-edit-block"
             :data-block-type="activeBlock && activeBlock.type"
             :data-for-block-id="activeBlock && activeBlock.uuid">
          <component v-if="activeBlock"
                     :is="`Flow${activeBlock.type.replace('.', '')}`"
                     :block="activeBlock"
                     :flow="activeFlow">
          </component>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import lodash from 'lodash'

export default {
  computed: {
    ...mapGetters('builder', ['activeBlock']),
    ...mapState({
      blockClasses: ({ trees: { ui } }) => ui.blockClasses,
    }),
    ...mapGetters('flow', ['activeFlow']),
  },
  methods: {
    sidebarType() {
      const
        blockType = lodash.get(this.selectedBlock, 'type')
      const blockViewerType = blockType && (this.isPureVueBlock ? blockType : 'BlockViewer')

      return this.isEditable
        ? blockType || 'TreeEditor'
        : blockViewerType || 'TreeViewer'
    },
  }
}
</script>

<style scoped>
.block-editor-wrapper {
  position: relative;
  z-index: 30;
  height: 100vh;
  width: 365px;
  overflow-y: scroll;
  padding: 1em;
  margin-top: 3em;


  background-color: #eee;
  border: 1px solid lightgray;
  border-radius: 0;
  box-shadow: 0 3px 6px #cacaca;

  transition: right 200ms ease-in-out, 200ms background-color ease-in-out, 200ms border-color ease-in-out, 200ms border-radius ease-in-out;
}
</style>
