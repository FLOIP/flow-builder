<template>
  <div class="block-toolbar d-flex justify-content-between">
    <div class="header-actions-left">
      <template v-if="isEditable">
        <!--Selection-->
        <font-awesome-icon
          v-if="isBlockSelected"
          v-b-tooltip.hover="trans('flow-builder.deselect-block')"
          :icon="['far', 'check-circle']"
          class="cursor-pointer text-info"
          @click.stop="isEditable && block_deselect({ blockId: block.uuid })" />
        <font-awesome-icon
          v-if="!isBlockSelected"
          v-b-tooltip.hover="trans('flow-builder.select-block')"
          :icon="['far', 'circle']"
          class="cursor-pointer"
          @click.stop="isEditable && block_select({ blockId: block.uuid })" />
      </template>
    </div>
    <div class="header-actions-right d-flex">
      <slot name="right" />
      <!--Delete-->
      <div
        v-if="isEditable"
        class="mr-1 ml-2">
        <div v-if="isDeleting">
          <button
            class="btn btn-light btn-xs"
            @click.stop="isDeleting = false">
            <small>{{ trans('flow-builder.cancel') }}</small>
          </button>
          <button
            :class="{
              'btn-danger': !isWaitingForConnection && !isActivatedByConnection,
              'btn-secondary': isWaitingForConnection || isActivatedByConnection,
            }"
            class="btn btn-xs ml-1"
            @click.stop="handleDeleteBlock">
            <small>{{ trans('flow-builder.delete-block') }}</small>
          </button>
        </div>
        <font-awesome-icon
          v-if="!isDeleting"
          v-b-tooltip.hover="trans('flow-builder.tooltip-delete-block')"
          :icon="['far', 'trash-alt']"
          :class="{
            'text-danger': !isWaitingForConnection && !isActivatedByConnection,
          }"
          class="cursor-pointer"
          @click.stop="isDeleting = true" />
      </div>
      <!--Duplicate-->
      <div class="mr-1 ml-2">
        <font-awesome-icon
          v-if="isEditable"
          v-b-tooltip.hover="trans('flow-builder.tooltip-duplicate-block')"
          :icon="['fac', 'copy']"
          class="cursor-pointer"
          @click.stop="handleDuplicateBlock" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import Component, {mixins} from 'vue-class-component'
import Lang from '@/lib/filters/lang'
import {Prop} from 'vue-property-decorator'
import {IBlock} from '@floip/flow-runner'
import {namespace} from 'vuex-class'

const builderVuexNamespace = namespace('builder')
const flowVuexNamespace = namespace('flow')
const validationVuexNamespace = namespace('validation')
const undoRedoVuexNamespace = namespace('undoRedo')

@Component({})
export class BlockToolbar extends mixins(Lang) {
  @Prop() readonly block!: IBlock
  @Prop() readonly isBlockSelected!: boolean
  @Prop() readonly isEditorVisible!: boolean
  @Prop() readonly isWaitingForConnection!: boolean
  @Prop() readonly isActivatedByConnection!: boolean

  isDeleting = false

  async handleDeleteBlock(): Promise<void> {
    await this.block_deselect({blockId: this.block.uuid})
    await this.flow_removeBlock({blockId: this.block.uuid})
    this.isDeleting = false
    this.$emit('after-delete')
  }

  async handleDuplicateBlock(): Promise<void> {
    const duplicatedBlock = await this.flow_duplicateBlock({blockId: this.block.uuid})
    await this.$router.replace({
      name: 'block-selected-details',
      params: {blockId: duplicatedBlock.uuid},
    })
    this.$emit('after-duplicate')
  }

  @builderVuexNamespace.Getter isEditable !: boolean

  @flowVuexNamespace.Action block_select!: ({blockId}: {blockId: IBlock['uuid']}) => Promise<void>
  @flowVuexNamespace.Action block_deselect!: ({blockId}: {blockId: IBlock['uuid']}) => Promise<void>
  @flowVuexNamespace.Action flow_removeBlock!: ({blockId}: {blockId: IBlock['uuid']}) => Promise<void>
  @flowVuexNamespace.Action flow_duplicateBlock!: ({blockId}: {blockId: IBlock['uuid']}) => Promise<IBlock>

}
export default BlockToolbar
</script>
