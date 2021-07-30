<template>
  <div class="block-toolbar d-flex justify-content-between">
    <div class="header-actions-left">
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
            class="btn btn-danger btn-xs ml-1"
            @click.prevent="handleDeleteBlock">
            <small>{{ trans('flow-builder.delete-block') }}</small>
          </button>
        </div>
        <font-awesome-icon
          v-if="!isDeleting"
          v-b-tooltip.hover="trans('flow-builder.tooltip-delete-block')"
          :icon="['far', 'trash-alt']"
          class="fa-btn text-danger"
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
          v-if="isEditable"
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
class BlockToolbar extends mixins(Lang) {
  @Prop() readonly block!: IBlock
  @Prop() readonly isBlockSelected!: boolean
  @Prop() readonly isEditorVisible!: boolean

  isDeleting = false

  handleDeleteBlock() {
    this.block_deselect({blockId: this.block.uuid})
    this.flow_removeBlock({blockId: this.block.uuid})
    this.removeValidationStatusesFor({key: `block/${this.block.uuid}`})
    this.isDeleting = false
    this.$emit('after-delete')
  }

  handleDuplicateBlock() {
    this.flow_duplicateBlock({blockId: this.block.uuid}).then((duplicatedBlock) => {
      this.$router.replace({
        name: 'block-selected-details',
        params: {blockId: duplicatedBlock.uuid},
      })
    })
    this.$emit('duplicate')
  }

  handleExpandMinimizeBlockEditor() {
    this.setIsBlockEditorOpen(!this.isEditorVisible)
    let routerName = ''
    if (this.isEditorVisible) {
      routerName = 'block-selected-details'
      this.$emit('minimize')
    } else {
      routerName = 'block-selected'
      this.$emit('expand')
    }

    this.$router.replace({
      name: routerName,
      params: {blockId: this.block.uuid},
    })
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
.block {
  .block-toolbar {
    transition: opacity 100ms ease-in-out;
    background: white;
    opacity: 0; // default state of hidden

    margin-top: -39.25px;
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
}
</style>
