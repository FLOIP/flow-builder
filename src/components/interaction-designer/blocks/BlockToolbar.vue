<template>
  <div :class="{
      'target-block-toolbar-waiting-for-connection': isWaitingForConnection,
      'target-block-toolbar-activated-by-connection': isActivatedByConnection
    }"
    class="block-toolbar d-flex justify-content-between">
    <div class="header-actions-left">
      <template v-if="isEditable">
        <!--Selection-->
        <font-awesome-icon
          v-if="isBlockSelected"
          v-b-tooltip.hover="trans('flow-builder.deselect-block')"
          :icon="['far', 'check-circle']"
          class="fa-btn text-info"
          @click="isEditable && block_deselect({ blockId: block.uuid })" />
        <font-awesome-icon
          v-if="!isBlockSelected"
          v-b-tooltip.hover="trans('flow-builder.select-block')"
          :icon="['far', 'circle']"
          class="fa-btn"
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
              'text-danger': !isWaitingForConnection && !isActivatedByConnection,
            }"
            class="btn btn-xs ml-1"
            @click.prevent="handleDeleteBlock">
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
          class="fa-btn"
          @click.prevent="isDeleting = true" />
      </div>
      <!--Duplicate-->
      <div class="mr-1 ml-2">
        <font-awesome-icon
          v-if="isEditable"
          v-b-tooltip.hover="trans('flow-builder.tooltip-duplicate-block')"
          :icon="['fac', 'copy']"
          class="fa-btn"
          @click.prevent="handleDuplicateBlock" />
      </div>
      <!--Expand block editor-->
      <div class="mr-1 ml-2">
        <font-awesome-icon
          v-b-tooltip.hover="trans('flow-builder.toggle-block-editor-tooltip')"
          :icon="isEditorVisible ? ['fac', 'minimize'] : ['fac', 'expand']"
          class="fa-btn"
          @click.prevent="handleExpandMinimizeBlockEditor" />
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

@Component({})
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
    let routerName = ''
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
      },
      undefined,
      (err) => {
        if (err == null) {
          console.warn('Unknown navigation error has occurred when expanding/minimizing a block editor')
        } else if (err.name !== 'NavigationDuplicated') {
          console.warn(err)
        }
      },
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

<style lang="scss">
@import "../../../scss/custom_variables";

.block-draggable {
  .block-toolbar {
    transition: opacity 100ms ease-in-out;
    background: white;
    opacity: 0; // default state of hidden

    margin-top: -37.25px;
    margin-right: -7.5px;
    margin-left: -7.5px;
    padding: 5px;

    border-top: inherit;
    border-right: inherit;
    border-left: inherit;
    border-top-right-radius: inherit;
    border-top-left-radius: inherit;
  }

  &.has-multiple-exits {
    .block-toolbar {
      margin-right: -7.5px;
    }
  }

  &.has-toolbar,
  &:hover {
    .block-toolbar {
      opacity: 1;
    }
  }

  &.active {
    .block-toolbar {
      margin-left: -8.5px;
      margin-right: -8.5px;
    }

    &.has-multiple-exits {
      .block-toolbar {
        margin-right: -8.5px;
      }
    }
  }

  .target-block-toolbar-waiting-for-connection {
    color: #fff;
    background: $success-600;
    border: none;
    margin-right: -6.5px !important;
    margin-left: -6.5px !important;
  }

  .target-block-toolbar-activated-by-connection {
    color: #fff;
    background: $primary-600;
    border: none;
    margin-right: -6.5px !important;
    margin-left: -6.5px !important;
  }
}
</style>
