<template>
  <div class="block-toolbar d-flex justify-content-between">
    <div class="header-actions-left">
      <template v-if="isEditable">
        <!--Selection-->
        <font-awesome-icon
          v-if="isBlockSelected"
          v-tooltip="trans('flow-builder.deselect-block')"
          :icon="['far', 'check-circle']"
          class="cursor-pointer text-info"
          @click="isEditable && block_deselect({ blockId: block.uuid })" />
        <font-awesome-icon
          v-if="!isBlockSelected"
          v-tooltip="trans('flow-builder.select-block')"
          :icon="['far', 'circle']"
          class="cursor-pointer"
          @click="isEditable && block_select({ blockId: block.uuid })" />
      </template>
    </div>
    <div class="header-actions-right d-flex">
      <!--Delete-->
      <div
        v-if="isEditable"
        class="mr-1 ml-2">
        <div v-if="isDeleting">
          <button
            class="btn btn-light btn-xs"
            @click.prevent="isDeleting = false">
            <small>{{ trans('flow-builder.cancel') }}</small>
          </button>
          <button
            :class="{
              'btn-danger': !isWaitingForConnection && !isActivatedByConnection,
              'btn-secondary': isWaitingForConnection || isActivatedByConnection,
            }"
            class="btn btn-xs ml-1"
            @click.prevent="handleDeleteBlock">
            <small>{{ trans('flow-builder.delete-block') }}</small>
          </button>
        </div>
        <font-awesome-icon
          v-if="!isDeleting"
          v-tooltip="trans('flow-builder.tooltip-delete-block')"
          :icon="['far', 'trash-alt']"
          :class="{
            'text-danger': !isWaitingForConnection && !isActivatedByConnection,
          }"
          class="cursor-pointer"
          @click.prevent="isDeleting = true" />
      </div>
      <!--Duplicate-->
      <div class="mr-1 ml-2">
        <font-awesome-icon
          v-if="isEditable"
          v-tooltip="trans('flow-builder.tooltip-duplicate-block')"
          :icon="['fac', 'copy']"
          class="cursor-pointer"
          @click.prevent="handleDuplicateBlock" />
      </div>
      <!--Expand block editor-->
      <div
        v-tooltip.hover="trans('flow-builder.toggle-block-editor-tooltip')"
        class="mr-1 ml-2 cursor-pointer icon-container"
        @click.prevent="handleExpandMinimizeBlockEditor">
        <span class="icon-text">
          {{ isEditorVisible ? trans('flow-builder.hide') : trans('flow-builder.show') }}
        </span>
        <font-awesome-icon :icon="isEditorVisible ? ['fac', 'minimize'] : ['fac', 'expand']" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import {mixins, Options} from 'vue-class-component'
import {Lang} from '@/lib/filters/lang'
import {Prop} from 'vue-property-decorator'
import {IBlock} from '@floip/flow-runner'
import {namespace} from 'vuex-class'

const builderVuexNamespace = namespace('builder')
const flowVuexNamespace = namespace('flow')
const validationVuexNamespace = namespace('validation')

@Options({})
export class BlockToolbar extends mixins(Lang) {
  @Prop() readonly block!: IBlock
  @Prop() readonly isBlockSelected!: boolean
  @Prop() readonly isEditorVisible!: boolean
  @Prop() readonly isWaitingForConnection!: boolean
  @Prop() readonly isActivatedByConnection!: boolean

  isDeleting = false

  handleDeleteBlock(): void {
    this.block_deselect({blockId: this.block.uuid})
    this.flow_removeBlock({blockId: this.block.uuid})
    this.removeValidationStatusesFor({key: `block/${this.block.uuid}`})
    this.isDeleting = false
    this.$emit('after-delete')
  }

  handleDuplicateBlock(): void {
    this.flow_duplicateBlock({blockId: this.block.uuid}).then((duplicatedBlock) => {
      this.$router.replace({
        name: 'block-selected-details',
        params: {blockId: duplicatedBlock.uuid},
      })
    })
    this.$emit('after-duplicate')
  }

  handleExpandMinimizeBlockEditor(): void {
    this.setIsBlockEditorOpen(!this.isEditorVisible)
    let routerName
    if (this.isEditorVisible) {
      routerName = 'block-selected-details'
      this.$emit('before-minimize')
    } else {
      routerName = 'block-selected'
      this.$emit('before-expand')
    }

    this.$router.replace(
      {
        name: routerName,
        params: {blockId: this.block.uuid},
      }
      ,
      // undefined,
      // (err) => {
      //   if (err == null) {
      //     console.warn('Unknown navigation error has occurred when expanding/minimizing a block editor')
      //   } else if (err.name !== 'NavigationDuplicated') {
      //     console.warn(err)
      //   }
      // },
    )
  }

  @builderVuexNamespace.Getter isEditable !: boolean
  @builderVuexNamespace.Mutation setIsBlockEditorOpen!: (value: boolean) => void

  @flowVuexNamespace.Action block_select!: ({blockId}: {blockId: IBlock['uuid']}) => void
  @flowVuexNamespace.Action block_deselect!: ({blockId}: {blockId: IBlock['uuid']}) => void
  @flowVuexNamespace.Action flow_removeBlock!: ({blockId}: {blockId: IBlock['uuid']}) => void
  @flowVuexNamespace.Action flow_duplicateBlock!: ({blockId}: {blockId: IBlock['uuid']}) => Promise<IBlock>

  @validationVuexNamespace.Mutation removeValidationStatusesFor!: ({key}: {key: string}) => void
}
export default BlockToolbar
</script>

<style scoped>
.icon-container {
  display: flex;
  align-items: center;
}
.icon-text {
  font-size: 0.8rem;
  margin-right: 0.15rem;
}
</style>
