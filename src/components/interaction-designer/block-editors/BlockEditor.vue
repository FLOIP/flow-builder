<template>
  <div class="block-editor">
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
import {mixins, Options} from 'vue-class-component'
import {namespace} from 'vuex-class'
import {IBlock, IFlow} from '@floip/flow-runner'
import {Lang} from '@/lib/filters/lang'

const builderNamespace = namespace('builder')
const flowNamespace = namespace('flow')

@Options({})
export class BlockEditor extends mixins(Lang) {
  @builderNamespace.Getter activeBlock?: IBlock
  @flowNamespace.Getter activeFlow?: IFlow
}

export default BlockEditor
</script>

<style lang="scss">
.block-editor {
  position: absolute;
  // TODO: Correct this `top` in https://viamoinc.atlassian.net/browse/VMO-6572 if needed
  top: 30px;
  background: white;
  z-index: 15;
  max-height: 75vh;
  width: 365px;
  overflow-y: scroll;
  padding: 0 1em 1em;
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
