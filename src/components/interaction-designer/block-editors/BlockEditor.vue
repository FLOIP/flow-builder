<template>
  <div class="block-editor-wrapper" :class="[`category-${blockClasses[activeBlock.type].category}`]">
    <div v-if="activeBlock" class="block-editor">
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

<style lang="scss">
// color categorizations
$category-0-faint: #fbfdfb;
$category-0-light: #97BD8A;
$category-0-dark: #38542f;
$category-1-faint: #fdfdfe;
$category-1-light: #6897BB;
$category-1-dark: #30516a;
$category-2-faint: #fdfbf8;
$category-2-light: #C69557;
$category-2-dark: #6e4e25;

.block-editor-wrapper {
  position: absolute;
  z-index: 15;
  max-height: 75vh;
  width: 365px;
  overflow-y: scroll;
  padding: 1em;
  background-color: #eee;
  border: 1px solid lightgray;
  border-radius: 0;
  box-shadow: 0 3px 6px #cacaca;
  transition: right 200ms ease-in-out, 200ms background-color ease-in-out, 200ms border-color ease-in-out, 200ms border-radius ease-in-out;

    &.category-0 {
      border-color: $category-0-light;
      background-color: $category-0-faint;
      border-radius: 0.3em;

      h3 {
        color: $category-0-dark;
      }
    }

    &.category-1 {
      border-color: $category-1-light;
      background-color: $category-1-faint;
      border-radius: 0.3em;

      h3 {
        color: $category-1-dark;
      }
    }

    &.category-2 {
      border-color: $category-2-light;
      background-color: $category-2-faint;
      border-radius: 0.3em;

      h3 {
        color: $category-2-dark;
      }
    }

}
</style>
