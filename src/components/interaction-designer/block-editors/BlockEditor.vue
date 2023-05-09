<template>
  <div class="block-editor" :style="{top: topPosition}">
    <div v-if="activeBlock">
      <div
        class="tree-sidebar-edit-block"
        :data-block-type="activeBlock && activeBlock.type"
        :data-for-block-id="activeBlock && activeBlock.uuid">
        <component
          :is="`Flow${activeBlock.type.replace('.', '')}`"
          v-if="activeBlock"
          :block="activeBlock"
          :flow="activeFlow" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {mixins} from 'vue-class-component'
import {Component} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import {IBlock, IFlow} from '@floip/flow-runner'
import Lang from '@/lib/filters/lang'

const builderNamespace = namespace('builder')
const flowNamespace = namespace('flow')

@Component({})
export class BlockEditor extends mixins(Lang) {
  @builderNamespace.Getter activeBlock?: IBlock
  @builderNamespace.Getter interactionDesignerHeaderBoundingClientRect!: DOMRect
  @flowNamespace.Getter activeFlow?: IFlow

  get topPosition() {
    // the interaction designer header may change:
    // - top: related to how the builder is embedded in the consumer UI, eg: the might be other elements above it
    // - height: related to which toolbar elements are visible, eg: 'multi-select blocks' toolbar is not always visible, same for the validations
    const correction = 5
    return `${this.interactionDesignerHeaderBoundingClientRect.top + this.interactionDesignerHeaderBoundingClientRect.height + correction}px`
  }
}

export default BlockEditor
</script>

<style lang="scss">
.block-editor {
  position: fixed;
  right: 5px;
  background: white;
  z-index: 15;
  max-height: 82vh;
  width: 365px;
  overflow-y: scroll;
  padding: 0 1em 1em;
  border: 1px solid lightgray;
  border-radius: 0;
  box-shadow: 0 3px 6px #cacaca;
  transition: right 200ms ease-in-out, 200ms background-color ease-in-out, 200ms border-color ease-in-out, 200ms border-radius ease-in-out;
}

.block-editor-header {
  top: 0;
  background: rgba(255, 255, 255, 1);
  padding-top: 1rem;
  padding-bottom: 0.8rem;
  z-index: 15;
}
</style>
