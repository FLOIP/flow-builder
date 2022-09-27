<template>
  <div class="simplified-name-editor">
    <validation-message :message-key="`block/${block.uuid}/name`">
      <template #input-control="{ isValid }">
        <div v-if="editBlockName || isValid === false">
          <text-editor
            v-model="blockName"
            :label="''"
            :placeholder="trans('flow-builder.enter-block-code')"
            :valid-state="isValid"
            @keydown="filterName"
            @mouseleave.native="handleCompleteEditing"/>
        </div>
        <div v-else class="block-code">
          <div @mouseenter="activateEditing"> {{ blockName }} </div>
        </div>
      </template>
    </validation-message>
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import Lang from '@/lib/filters/lang'
import {IBlock, IBlockUIMetadata} from '@floip/flow-runner'
import {namespace} from 'vuex-class'

const flowVuexNamespace = namespace('flow')

@Component({})
export class SimplifiedNameEditor extends mixins(Lang) {
  editBlockName = false

  @Prop() readonly block!: IBlock
  @flowVuexNamespace.Action block_setName!: ({
    blockId,
    value,
    lockAutoUpdate,
  }: {
    blockId: IBlock['uuid'],
    value: IBlock['name'],
    lockAutoUpdate: boolean,
  }) => void;
  @flowVuexNamespace.Action block_resetName!: ({blockId}: { blockId: IBlock['uuid'] }) => void;

  get blockName(): IBlock['name'] {
    return this.block.name
  }

  set blockName(value: IBlock['name']) {
    this.block_setName({
      blockId: this.block.uuid,
      value,
      lockAutoUpdate: true,
    })
  }

  updated() {
    if (this.blockName === '') {
      this.editBlockName = true
    }
  }

  filterName(e: KeyboardEvent): void {
    this.activateEditing()

    if (e.key.match(/\W+|Enter/g)) {
      e.preventDefault()
    }
  }

  activateEditing(): void {
    this.editBlockName = true
  }

  handleCompleteEditing(): void {
    this.editBlockName = false

    if (this.blockName === '') {
      // This will turn on automatic name generation from the label
      this.block_resetName({blockId: this.block.uuid})
    }
  }
}
export default SimplifiedNameEditor
</script>

<style scoped>
.block-code {
  word-break: break-all;
}
</style>
