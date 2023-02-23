<template>
  <div
    class="block"
    :id="`block/${block.uuid}`"
    :ref="`block/${block.uuid}`"
    @click.stop="selectBlock"
    @mouseenter="setIsMouseOnBlock(true)"
    @mouseleave="setIsMouseOnBlock(false)">
    <plain-draggable
      v-if="hasLayout"
      ref="draggable"
      class="block-draggable"
      :class="{
        'is-active': isBlockActivated,
        'source-block-having-active-connection': isAssociatedWithActiveConnectionAsSourceBlock,
        'target-block-having-active-connection': isAssociatedWithActiveConnectionAsTargetBlock,
        'target-block-waiting-for-connection': isWaitingForConnection,
        'has-toolbar': isBlockSelected || shouldShowBlockEditorForCurrentBlock,
        ['has-exits']: hasExitsShown,
        ['has-multiple-exits']: hasMultipleExitsShown,
        [`has-${numberOfExitsShown}-exits`]: true,
        [`category-${blockClasses[block.type].category}`]: true,
      }"
      :start-x="x"
      :start-y="y"
      content-type="block"
      :is-editable="isEditable"
      @dragged="onMoved"
      @dragEnded="handleDraggableEndedForBlock"
      @destroyed="handleDraggableDestroyedForBlock"
      @mouseenter.native="isConnectionCreateActive && activateBlockAsDropZone()"
      @mouseleave.native="isConnectionCreateActive && deactivateBlockAsDropZone()">
      <header
        :id="`block/${block.uuid}/handle`"
        class="block-target draggable-handle"
        :class="{
          'initial': false,
          'pending': isConnectionCreateActive,
          'fulfilled': false,
          'rejected': false,
          'activated': isBlockActivated,
        }">
        <block-toolbar
          :block="block"
          :is-activated-by-connection="isAssociatedWithActiveConnectionAsTargetBlock"
          :is-block-selected="isBlockSelected"
          :is-editor-visible="shouldShowBlockEditorForCurrentBlock"
          :is-waiting-for-connection="isWaitingForConnection"
          @showHideHasClicked="selectBlock" />

        <div class="d-flex justify-content-between">
          <p class="block-type">
            {{ trans(`flow-builder.${block.type}`) }}
          </p>
          <i
            v-if="activeFlow.first_block_id === block.uuid"
            class="glyphicon glyphicon-arrow-down" />
        </div>

        <h3
          class="block-label"
          :style="{ maxWidth: `${labelContainerMaxWidth}px` }"
          :class="{'empty': !block.label}">
          {{ block.label || trans('flow-builder.untitled-block') }}
        </h3>
      </header>

      <footer
        :id="`block/${block.uuid}/exits`"
        :ref="`block/${block.uuid}/exits`"
        :class="{'pointer-events-none': !isEditable}"
        class="block-exits d-flex mt-1">
        <block-exit
          v-for="exit in block.exits"
          :id="`exit/${exit.uuid}`"
          :key="exit.uuid"
          :exit="exit"
          :block="block"
          @connection-create-start="setIsConnectionSource(true)"
          @connection-create-end="setIsConnectionSource(false)" />
      </footer>
    </plain-draggable>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */
import Vue from 'vue'
import {filter, forEach, includes, isNumber} from 'lodash'
import {mixins} from 'vue-class-component'
import {Component, Prop, Watch} from 'vue-property-decorator'
import {namespace, State} from 'vuex-class'
import {IBlock, IBlockExit, IFlow} from '@floip/flow-runner'
import {
  IConnectionContext,
  IPosition,
  OperationKind,
  SupportedOperation,
} from '@/store/builder'
import Lang from '@/lib/filters/lang'
import {BlockClassNames} from '@/lib/types'

const flowNamespace = namespace('flow')
const builderNamespace = namespace('builder')

type BlockAction = ({block}: { block: IBlock }) => void
type BlockPositionAction = ({block, position}: { block: IBlock, position: IPosition }) => void

const LABEL_CONTAINER_MAX_WIDTH = 650
export const BLOCK_RESET_CONNECTIONS = 'BLOCK_RESET_CONNECTIONS'

@Component({})
export class Block extends mixins(Lang) {
  @Prop({type: Object, required: true}) readonly block!: IBlock
  @Prop({type: Number, required: true}) readonly x!: number
  @Prop({type: Number, required: true}) readonly y!: number

  labelContainerMaxWidth = LABEL_CONTAINER_MAX_WIDTH
  blockWidth = 0
  isConnectionSource = false

  created(): void {
    this.initDraggableForExitsByUuid()
  }

  updated(): void {
    if (this.$refs.draggable) {
      this.blockWidth = (this.$refs.draggable as Vue).$el.clientWidth
    }
  }

  mounted(): void {
    this.$nextTick(function onMounted() {
      this.updateLabelContainerMaxWidth()
    })

    window.addEventListener('message', message => {
      if (message.data === BLOCK_RESET_CONNECTIONS) {
        this.activeConnectionsContext.forEach(context => {
          this.deactivateConnectionFromExitUuid({exitUuid: context.exitId})
        })
      }
    })
  }

  @Watch('blockExitsLength')
  onBlockExitsLengthChanged(newValue: number, oldValue: number): void {
    this.$nextTick(() => {
      this.updateLabelContainerMaxWidth(newValue, newValue < oldValue)
    })
  }

  @flowNamespace.State selectedBlocks!: IBlock['uuid'][]
  @builderNamespace.State activeBlockId!: IBlock['uuid'] | null
  @builderNamespace.State operations!: Record<OperationKind, SupportedOperation>
  @builderNamespace.State activeConnectionsContext!: IConnectionContext[]
  @builderNamespace.State isBlockEditorOpen!: boolean
  @builderNamespace.State isConnectionCreationInProgress!: boolean
  @State(({trees: {ui}}) => ui.blockClasses) blockClasses!: BlockClassNames
  @builderNamespace.Getter isEditable!: boolean
  @flowNamespace.Getter activeFlow?: IFlow

  isMouseOnBlock = false

  get blockExitsLength(): number {
    return this.block.exits.length
  }

  get numberOfExitsShown(): number {
    const {exits} = this.block
    // With the `Default` exit
    return exits.length
  }

  get hasExitsShown(): boolean {
    return this.numberOfExitsShown > 0
  }

  get hasMultipleExitsShown(): boolean {
    return this.numberOfExitsShown > 1
  }

  get hasLayout(): boolean {
    return isNumber(this.x) && isNumber(this.y)
  }

  get isAssociatedWithActiveConnection(): boolean {
    const {block, activeConnectionsContext} = this
    return !!filter(activeConnectionsContext, (context) => context.sourceId === block.uuid || context.targetId === block.uuid).length
  }

  get isAssociatedWithActiveConnectionAsSourceBlock(): boolean {
    const {block, activeConnectionsContext} = this
    return !!filter(activeConnectionsContext, (context) => context.sourceId === block.uuid).length
  }

  get isAssociatedWithActiveConnectionAsTargetBlock(): boolean {
    const {block, activeConnectionsContext} = this
    return !!filter(activeConnectionsContext, (context) => context.targetId === block.uuid).length
  }

  get isWaitingForConnection(): boolean {
    return !this.isConnectionSource && this.isMouseOnBlock && this.isConnectionCreationInProgress
  }

  get isBlockSelected(): boolean {
    return includes(this.selectedBlocks, this.block.uuid)
  }

  // todo: does this component know too much, what out of the above mapped state can be mapped?
  // todo: We should likely also proxy our resource resolving so that as to mitigate the need to see all resources and generate a context

  get isConnectionCreateActive(): boolean {
    const {operations} = this
    return !!operations[OperationKind.CONNECTION_CREATE].data
  }

  get isBlockActivated(): boolean {
    const {activeBlockId, isAssociatedWithActiveConnection, block, operations} = this
    if ((activeBlockId && activeBlockId === block.uuid) || isAssociatedWithActiveConnection) {
      return true
    }

    const {data} = operations[OperationKind.CONNECTION_CREATE]
    return data?.targetId === block.uuid
  }

  get shouldShowBlockEditorForCurrentBlock(): boolean {
    return this.isBlockEditorOpen && this.activeBlockId === this.block.uuid
  }

  @builderNamespace.Mutation activateBlock!: () => void
  @builderNamespace.Mutation setBlockPositionTo!: BlockPositionAction
  @builderNamespace.Mutation initDraggableForExitsByUuid!: () => void
  @builderNamespace.Mutation setIsBlockEditorOpen!: (value: boolean) => void
  @builderNamespace.Mutation deactivateConnectionFromExitUuid!: ({exitUuid}: {exitUuid: IBlockExit['uuid']}) => void

  // ConnectionCreate
  @builderNamespace.Action setConnectionCreateTargetBlock!: BlockAction
  @builderNamespace.Action setConnectionCreateTargetBlockToNullFrom!: BlockAction

  setIsMouseOnBlock(value: boolean): void {
    this.isMouseOnBlock = value
  }

  setIsConnectionSource(value: boolean): void {
    this.isConnectionSource = value
  }

  updateLabelContainerMaxWidth(blockExitsLength = this.blockExitsLength, isRemoving = false): void {
    // one exit
    const blockExitElement = document.querySelector(`#block\\/${this.block.uuid} .block-exit`) as HTMLElement

    if (!blockExitElement) {
      console.debug('blockExitWidth', 'DOM not ready yet on', `#block\\/${this.block.uuid} .block-exit`)
      return
    }

    // This allows us to shrink .block-exit into the min-width before extending the block label container
    // Removing exit
    if (isRemoving) {
      // -1: to force having LABEL_CONTAINER_MAX_WIDTH as possible
      if (LABEL_CONTAINER_MAX_WIDTH < (blockExitsLength - 1) * blockExitElement.offsetWidth) {
        // but set with `n x {outer width}`
        this.labelContainerMaxWidth = (blockExitsLength - 1) * blockExitElement.offsetWidth
        return
      }
      // Adding new exit
    } else if (LABEL_CONTAINER_MAX_WIDTH < blockExitsLength * blockExitElement.clientWidth) {
        // -1: to force having LABEL_CONTAINER_MAX_WIDTH as possible (especially when removing exits)
        // but set with `n x {outer width}`
        this.labelContainerMaxWidth = blockExitsLength * blockExitElement.offsetWidth
        return
      }

    this.labelContainerMaxWidth = LABEL_CONTAINER_MAX_WIDTH
  }

  isExitActivatedForCreate(exit: IBlockExit): boolean {
    const {data} = this.operations[OperationKind.CONNECTION_CREATE]
    return data?.source?.exitId === exit.uuid
  }

  activateBlockAsDropZone(): void {
    const {block} = this
    this.setConnectionCreateTargetBlock({block})
  }

  deactivateBlockAsDropZone(): void {
    const {block} = this

    if ((this.operations[OperationKind.CONNECTION_CREATE]).data?.targetId !== null) {
      this.setConnectionCreateTargetBlockToNullFrom({block})
    }
  }

  onMoved({position: {left: x, top: y}}: {position: {left: number, top: number}}): void {
    // todo: try this the vuejs way where we push the change into state, then return false + modify draggable w/in store ?

    const {block} = this
    this.$nextTick(() => {
      this.setBlockPositionTo({position: {x, y}, block})

      forEach(this.draggableForExitsByUuid, (draggable, key) => {
        try {
          draggable.position()
        } catch (e) {
          console.warn('Block', 'onMoved', 'positioning draggable on', key, 'can\'t access property "initElm", props is undefined')
        }
      })
      console.debug('Block', 'onMoved', 'positioned all of', this.draggableForExitsByUuid)
    })
  }

  // todo: store the leaderlines in vuex and manip there --- aka the leaderline itself would simply _produce_ the
  //       domain object which we thenceforth manip in vuex ?

  selectBlock(): void {
    let shouldBlockEditorBeVisible
    if (this.activeBlockId !== this.block.uuid) {
      shouldBlockEditorBeVisible = true
    } else {
      shouldBlockEditorBeVisible = !this.isBlockEditorOpen
    }

    this.setIsBlockEditorOpen(shouldBlockEditorBeVisible)

    let routerName
    if (this.isBlockEditorOpen) {
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
          console.warn('Unknown navigation error has occurred when selecting a block')
        } else if (err.name !== 'NavigationDuplicated') {
          console.warn(err)
        }
      },
    )
  }

  handleDraggableEndedForBlock(): void {
    console.debug('Block', 'handleDraggableEndedForBlock')
    forEach(this.block.exits, (exit) => {
      delete this.draggableForExitsByUuid[exit.uuid]
    })
  }

  handleDraggableDestroyedForBlock(): void {
    console.debug('Block', 'handleDraggableDestroyedForBlock')
    forEach(this.block.exits, (exit) => {
      delete this.draggableForExitsByUuid[exit.uuid]
    })
  }
}

export default Block
</script>

<style lang="scss">
@import "../../../scss/custom_variables";

.btn-secondary.btn-flat {
  @extend .btn-secondary;
  background: transparent;
}

.block-editor {
  will-change: transform;
  -webkit-tap-highlight-color: transparent;
}

.pointer-events-none {
  pointer-events: none;
}

.block-draggable {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1*10;
  min-width: 200px;
  padding: 0.4em;
  padding-bottom: 0;
  scroll-margin: 35px;
  scroll-margin-top: 100px;

  background-color: rgba(255, 255, 255, 0.9);
  color: #575757;
  border: 1px solid #5b5b5b;

  border-radius: 0.3em;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);

  transition: opacity 200ms ease-in-out,
  background-color 200ms ease-in-out;

  .block-label {
    font-size: 14px;
    font-weight: normal;
    min-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &.empty {
      color: #aaa;
    }
  }

  .block-type {
    font-size: 11px;
    font-weight: bolder;
    margin-right: 1em;
    margin-bottom: 0.4em;
  }

  .block-target {
    min-height: 3em;
    padding: 0.1em;

    &:hover {
      border-radius: 0.3em;
      border-color: #5b5b5b;
    }
  }

  .block-exits {
    white-space: nowrap;
    position: relative;
    top: 0;
    gap: 0.4rem;
    margin-bottom: 0.4rem;
  }

  // state mutations

  &.is-active {
    box-shadow: 0 3px 6px #CACACA;
  }

  &.target-block-having-active-connection {
    color: #fff;
    background: $primary-600;
    border: none;

    .block-label.empty {
      color: #fff;
    }

    .block-exit-name {
      color: $primary-600 !important;
      background: #fff !important;
    }
  }

  &.target-block-waiting-for-connection {
    color: #fff;
    background: $success-600;
    border: none;

    .block-label.empty {
      color: #fff;
    }

    .block-exit-name {
      color: $success-600 !important;
      background: #fff !important;
    }
  }

  // block exit states
  &.is-active,
  &:hover {
    .block-exit .block-exit-remove {
      opacity: 1;
    }
  }
}
</style>
