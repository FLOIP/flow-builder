<template>
  <div
    class="block"
    @click="selectBlock"
    @mouseenter="setIsMouseOnBlock(true)"
    @mouseleave="setIsMouseOnBlock(false)">
    <block-editor
      v-if="shouldShowBlockEditor"
      class="block-editor"
      :style="{transform: translatedBlockPosition}" />

    <plain-draggable
      v-if="hasLayout"
      ref="draggable"
      class="block-draggable"
      :class="{
        'is-active': isBlockActivated,
        'source-block-having-active-connection': isAssociatedWithActiveConnectionAsSourceBlock,
        'target-block-having-active-connection': isAssociatedWithActiveConnectionAsTargetBlock,
        'target-block-waiting-for-connection': isWaitingForConnection,
        'has-toolbar': isBlockSelected || shouldShowBlockEditor,
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
      @dragStarted="selectBlock"
      @dragEnded="handleDraggableEndedForBlock"
      @destroyed="handleDraggableDestroyedForBlock"
      @mouseenter.native="isConnectionCreateActive && activateBlockAsDropZone($event)"
      @mouseleave.native="isConnectionCreateActive && deactivateBlockAsDropZone($event)">
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
          v-if="shouldShowBlockToolBar"
          :block="block"
          :is-activated-by-connection="isAssociatedWithActiveConnectionAsTargetBlock"
          :is-block-selected="isBlockSelected"
          :is-editor-visible="shouldShowBlockEditor"
          :is-waiting-for-connection="isWaitingForConnection" />

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
        <div
          v-for="(exit) in block.exits"
          :id="`exit/${exit.uuid}`"
          :key="exit.uuid"
          v-b-tooltip.hover.bottom="
            transIf(
              isEditable,
              exit.destination_block
                ? 'flow-builder.tooltip-remove-connection'
                : 'flow-builder.tooltip-new-connection'
            )
          "
          class="block-exit flex-grow-1"
          :class="{
            'initial': false,
            'pending': isConnectionSourceRelocateActive,
            'fulfilled': false,
            'rejected': false,
            'activated': isExitActivatedForRelocate(exit),
          }"
          @mouseenter="isConnectionSourceRelocateActive && activateExitAsDropZone($event, exit)"
          @mouseleave="isConnectionSourceRelocateActive && deactivateExitAsDropZone($event, exit)"
          @mousemove="updateCursorPosition"
          @click="exit.destination_block && handleRemoveConnectionFrom(exit)">
          <div class="visible-exits">
            <div class="total-label-container">
              <span class="badge badge-primary tree-block-item-label tree-block-item-output-subscribers-1" />
            </div>
            <div
              class="block-exit-name badge badge-warning w-100"
              :class="{
                'is-new': exit.destination_block == null && exitOnDragged[exit.uuid] === undefined,
                'is-initiating': exit.destination_block == null && exitOnDragged[exit.uuid] === true,
                'is-connected': exit.destination_block != null,
                'is-disconnected': exit.destination_block == null && exitOnDragged[exit.uuid] === false,
                'is-highlighted-from-connection': exit.destination_block != null
                 && (lineHovers[exit.uuid] === true || linePermanentlyActive[exit.uuid] === true),
                'is-connected-and-on-hover': exit.destination_block != null && exitHovers[exit.uuid] === true,
              }"
              @mouseenter="exitMouseEnter(exit)"
              @mouseleave="exitMouseLeave(exit)">
              <span
                v-if="!(exitHovers[exit.uuid] || isExitActivatedForCreate(exit))"
                v-b-tooltip.hover.bottom="exit.test"
                class="block-exit-name-text align-self-center">
                {{ exit.name || '(untitled)' }}
              </span>

              <span class="align-self-center">
                <template v-if="exit.destination_block == null">
                  <plain-draggable
                    v-if="exitHovers[exit.uuid] || isExitActivatedForCreate(exit)"
                    :id="`exit/${exit.uuid}/pseudo-block-handle`"
                    :key="`exit/${exit.uuid}/pseudo-block-handle`"
                    :drag-handle-id="`exit/${exit.uuid}`"
                    class="btn btn-xs btn-flat p-0"
                    :is-editable="isEditable"
                    content-type="exit"
                    @initialized="handleDraggableInitializedFor(exit, $event)"
                    @dragStarted="onCreateExitDragStarted($event, exit)"
                    @dragged="onCreateExitDragged($event)"
                    @dragEnded="onCreateExitDragEnded($event, exit)"
                    @destroyed="handleDraggableDestroyedFor(exit)">
                    <i class="glyphicon glyphicon-move" />
                  </plain-draggable>

                  <template v-if="isConnectionCreateActive && isExitActivatedForCreate(exit) && livePosition">
                    <div
                      :id="`exit/${exit.uuid}/handle`"
                      class="btn btn-xs p-0 text-white">
                      <i class="glyphicon glyphicon-move" />
                    </div>
                    <connection
                      :key="`exit/${exit.uuid}/line-for-draft`"
                      :color="connectionColorAtSourceDragged"
                      :repaint-cache-key-generator="generateConnectionLayoutKeyFor"
                      :source="block"
                      :target="blocksById[exit.destination_block]"
                      :exit="exit"
                      :position="livePosition" />
                  </template>
                </template>

                <template v-if="exit.destination_block != null">
                  <div
                    :id="`exit/${exit.uuid}/handle`"
                    :key="`exit/${exit.uuid}/handle`"
                    class="btn btn-xs btn-flat">
                    <font-awesome-icon
                      v-if="exitHovers[exit.uuid]"
                      class="text-danger"
                      title="Click to remove this connection"
                      :icon="['far', 'times-circle']" />
                  </div>

                  <connection
                    :key="`exit/${exit.uuid}/line`"
                    :color="connectionColorForKnowDestination"
                    :repaint-cache-key-generator="generateConnectionLayoutKeyFor"
                    :source="livePosition ? null : block"
                    :target="blocksById[exit.destination_block]"
                    :exit="exit"
                    :position="livePosition"
                    @lineMouseIn="setLineHovered(exit, true)"
                    @lineMouseClickedIn="setLineClicked(exit, true)"
                    @lineMouseClickedOut="setLineClicked(exit, false)"
                    @lineMouseOut="setLineHovered(exit, false)" />
                </template>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </plain-draggable>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */
import Vue from 'vue'
import {filter, forEach, get, includes, isNumber} from 'lodash'
import {mixins} from 'vue-class-component'
import {Component, Prop, Watch} from 'vue-property-decorator'
import {namespace, State} from 'vuex-class'
import {IBlock, IBlockExit, IFlow} from '@floip/flow-runner'
import {
  ConnectionLayout,
  generateConnectionLayoutKeyFor, IConnectionContext,
  IConnectionCreateOperation,
  IConnectionSourceRelocateOperation, IPosition,
  OperationKind,
  SupportedOperation,
} from '@/store/builder'
import Lang from '@/lib/filters/lang'
import {BlockClasses, IPositionLeftTop} from '@/lib/types'
import {colorStates} from '@/components/interaction-designer/Connection.vue'

const LABEL_CONTAINER_MAX_WIDTH = 650

const SIDEBAR_POSITION_SETTLE_TIME_MS = 1500
const SIDEBAR_POSITION_UPDATE_INTERVAL_MS = 100
const SIDEBAR_POSITION_UPDATE_COUNT = SIDEBAR_POSITION_SETTLE_TIME_MS / SIDEBAR_POSITION_UPDATE_INTERVAL_MS

const flowNamespace = namespace('flow')
const builderNamespace = namespace('builder')

type Draggable = any

type BlockAction = ({block}: { block: IBlock }) => void;
type BlockExitAction = ({block, exit}: { block: IBlock, exit: IBlockExit }) => void;
type BlockPositionAction = ({block, position}: { block: IBlock, position: IPosition }) => void;
type BlockExitPositionAction = ({block, exit, position}: { block: IBlock, exit: IBlockExit, position: IPosition }) => void;

const ICON_SIZE = 10

@Component({})
export class Block extends mixins(Lang) {
  @Prop({type: Object, required: true}) readonly block!: IBlock
  @Prop({type: Number, required: true}) readonly x!: number
  @Prop({type: Number, required: true}) readonly y!: number

  livePosition: { x: number, y: number } | null = null
  labelContainerMaxWidth = LABEL_CONTAINER_MAX_WIDTH
  blockWidth = 0
  blockHeight = 0
  exitHovers = {}
  exitOnDragged: Record<IBlockExit['uuid'], boolean> = {}
  lineHovers: Record<IBlockExit['uuid'], boolean> = {}
  linePermanentlyActive: Record<IBlockExit['uuid'], boolean> = {}
  cursorPosition: { x: number, y: number } | null = null
  connectionColorAtSourceDragged = colorStates.CONNECTING
  connectionColorForKnowDestination = colorStates.DEFAULT
  isConnectionSource = false
  translatedBlockPosition = ''

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
      this.updateTranslatedBlockEditorPosition()
    })
  }

  @Watch('blockExitsLength')
  onBlockExitsLengthChanged(newValue: number, oldValue: number): void {
    this.$nextTick(() => {
      this.updateLabelContainerMaxWidth(newValue, newValue < oldValue)
      this.updateTranslatedBlockEditorPosition()
    })
  }

  @flowNamespace.State selectedBlocks!: IBlock['uuid'][]
  @builderNamespace.State activeBlockId!: IBlock['uuid'] | null
  @builderNamespace.State operations!: Record<OperationKind, SupportedOperation>
  @builderNamespace.State activeConnectionsContext!: IConnectionContext[]
  @builderNamespace.State draggableForExitsByUuid!: Record<string, Draggable>
  @builderNamespace.State isBlockEditorOpen!: boolean
  @builderNamespace.State isConnectionCreationInProgress!: boolean
  @State(({trees: {ui}}) => ui.blockClasses) blockClasses!: BlockClasses

  @builderNamespace.Getter blocksById!: Record<IBlock['uuid'], IBlock>
  @builderNamespace.Getter isEditable!: boolean
  @builderNamespace.Getter interactionDesignerBoundingClientRect!: DOMRect

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
    return !this.isConnectionSource && this.isMouseOnBlock === true && this.isConnectionCreationInProgress
  }

  get isBlockSelected(): boolean {
    return includes(this.selectedBlocks, this.block.uuid)
  }

  // todo: does this component know too much, what out of the above mapped state can be mapped?
  // todo: We should likely also proxy our resource resolving so that as to mitigate the need to see all resources and generate a context

  get isConnectionSourceRelocateActive(): boolean {
    const {operations} = this
    return !!operations[OperationKind.CONNECTION_SOURCE_RELOCATE].data
  }

  get isConnectionCreateActive(): boolean {
    const {operations} = this
    return !!operations[OperationKind.CONNECTION_CREATE].data
  }

  get isBlockActivated(): boolean {
    const {activeBlockId, isAssociatedWithActiveConnection, block, operations} = this
    if ((activeBlockId && activeBlockId === block.uuid) || isAssociatedWithActiveConnection) {
      return true
    }

    const {data} = operations[OperationKind.CONNECTION_CREATE] as IConnectionCreateOperation
    return data?.targetId === block.uuid
  }

  updateTranslatedBlockEditorPosition(): void {
    let count = 0

    const to = setInterval(() => {
      const xOffset = 10

      const headerRect = document.querySelector('header.interaction-designer-header')?.getBoundingClientRect()
      const headerOffset = (headerRect?.height ?? 0) + (headerRect?.top ?? 0)
      const scroll = document.querySelector('html')?.scrollTop ?? 0

      const left = this.x + this.blockWidth + xOffset - this.interactionDesignerBoundingClientRect.left
      const top = headerOffset + scroll

      const translatedBlockPosition = `translate(${left}px, ${top}px)`

      if (this.translatedBlockPosition !== translatedBlockPosition) {
        this.translatedBlockPosition = translatedBlockPosition
      } else {
        count += 1
        if (count > SIDEBAR_POSITION_UPDATE_COUNT) {
          clearInterval(to)
        }
      }
    }, SIDEBAR_POSITION_UPDATE_INTERVAL_MS)
  }

  get shouldShowBlockEditor(): boolean {
    return this.isBlockEditorOpen && this.activeBlockId === this.block.uuid
  }

  @flowNamespace.Action block_updateShouldShowBlockToolBar!: (
    {blockId, value}: { blockId: string, value: boolean }
  ) => void

  get shouldShowBlockToolBar(): boolean {
    return this.block?.vendor_metadata?.floip?.ui_metadata?.should_show_block_tool_bar ?? false
  }

  // todo: how do we decide whether or not this should be an action or a vanilla domain function?
  generateConnectionLayoutKeyFor(source: IBlock, target: IBlock): ConnectionLayout {
    return generateConnectionLayoutKeyFor(source, target)
  }

  @builderNamespace.Mutation activateBlock!: () => void
  @builderNamespace.Mutation setBlockPositionTo!: BlockPositionAction
  @builderNamespace.Mutation initDraggableForExitsByUuid!: () => void
  @builderNamespace.Mutation setIsBlockEditorOpen!: () => void
  @builderNamespace.Mutation deactivateConnectionFromExitUuid!: ({exitUuid}: {exitUuid: IBlockExit['uuid']}) => void

  @builderNamespace.Action removeConnectionFrom!: BlockExitAction

  // ConnectionSourceRelocate
  @builderNamespace.Action initializeConnectionSourceRelocateWith!: BlockExitPositionAction
  @builderNamespace.Action setConnectionSourceRelocateValue!: BlockExitAction
  @builderNamespace.Action setConnectionSourceRelocateValueToNullFrom!: BlockExitAction
  @builderNamespace.Action applyConnectionSourceRelocate!: () => void

  // ConnectionCreate
  @builderNamespace.Action initializeConnectionCreateWith!: BlockExitPositionAction
  @builderNamespace.Action setConnectionCreateTargetBlock!: BlockAction
  @builderNamespace.Action setConnectionCreateTargetBlockToNullFrom!: BlockAction
  @builderNamespace.Action applyConnectionCreate!: () => void

  updateShouldShowBlockToolBar(): void {
    //do not show the block toolbar when waiting for connection
    if (this.isWaitingForConnection) {
      return
    }

    this.block_updateShouldShowBlockToolBar({
      blockId: this.block.uuid,
      value: this.isBlockSelected || this.isMouseOnBlock,
    });
  }

  setIsMouseOnBlock(value: boolean):void {
    this.isMouseOnBlock = value
    this.updateShouldShowBlockToolBar()
  }

  exitMouseEnter(exit: IBlockExit): void {
    this.$set(this.exitHovers, exit.uuid, true)
    this.updateShouldShowBlockToolBar()
  }

  exitMouseLeave(exit: IBlockExit): void {
    this.$set(this.exitHovers, exit.uuid, false)
    this.updateShouldShowBlockToolBar()
  }

  setLineHovered(exit: IBlockExit, value: boolean): void {
    this.$nextTick(() => {
      this.$set(this.lineHovers, exit.uuid, value)
    })
  }

  setLineClicked(exit: IBlockExit, value: boolean): void {
    this.$nextTick(() => {
      this.$set(this.linePermanentlyActive, exit.uuid, value)
    })
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

  // todo: push NodeExit into it's own vue component
  isExitActivatedForRelocate(exit: IBlockExit): boolean {
    const {data} = this.operations[OperationKind.CONNECTION_SOURCE_RELOCATE] as IConnectionSourceRelocateOperation
    return data?.to?.exitId === exit.uuid
  }

  isExitActivatedForCreate(exit: IBlockExit): boolean {
    const {data} = this.operations[OperationKind.CONNECTION_CREATE] as IConnectionCreateOperation
    return data?.source?.exitId === exit.uuid
  }

  activateExitAsDropZone(e: MouseEvent, exit: IBlockExit): void {
    const {block} = this
    this.setConnectionSourceRelocateValue({block, exit})
  }

  deactivateExitAsDropZone(e: MouseEvent, exit: IBlockExit): void {
    const {block} = this
    this.setConnectionSourceRelocateValueToNullFrom({block, exit})
  }

  // eslint-disable-next-line no-unused-vars
  activateBlockAsDropZone(): void {
    const {block} = this
    this.setConnectionCreateTargetBlock({block})
  }

  // eslint-disable-next-line no-unused-vars
  deactivateBlockAsDropZone(): void {
    const {block} = this

    if ((this.operations[OperationKind.CONNECTION_CREATE] as IConnectionCreateOperation).data?.targetId !== null) {
      this.setConnectionCreateTargetBlockToNullFrom({block})
    }
  }

  onMoved({position: {left: x, top: y}}: {position: {left: number, top: number}}): void {
    // todo: try this the vuejs way where we push the change into state, then return false + modify draggable w/in store ?

    const {block} = this
    this.$nextTick(() => {
      this.setBlockPositionTo({position: {x, y}, block})
      this.updateTranslatedBlockEditorPosition()

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

  handleRemoveConnectionFrom(exit: IBlockExit): void {
    const {block} = this
    this.setLineClicked(exit, false)
    this.deactivateConnectionFromExitUuid({exitUuid: exit.uuid})
    this.removeConnectionFrom({block, exit})
    // force render, useful if the exit label is very short
    this.labelContainerMaxWidth += 0
  }

  handleDraggableInitializedFor({uuid}: {uuid: string}, {draggable}: {draggable: Draggable}): void {
    this.draggableForExitsByUuid[uuid] = draggable

    const {left, top} = draggable
    const {uuid: blockId} = this.block

    console.debug('Block', 'handleDraggableInitializedFor', {blockId, exitId: uuid, coords: {left, top}})
  }

  handleDraggableDestroyedFor({uuid}: {uuid: string}): void {
    delete this.draggableForExitsByUuid[uuid]
  }

  onCreateExitDragStarted({draggable}: {draggable: Draggable}, exit: IBlockExit): void {
    const {block} = this
    const {left: x, top: y} = draggable

    this.$set(this.exitOnDragged, exit.uuid, true)
    this.isConnectionSource = true

    this.initializeConnectionCreateWith({
      block,
      exit,
      position: {x, y},
    })

    this.adjustDraggablePosition(draggable)
  }

  onCreateExitDragged({position: {left: x, top: y}}: {position: {left: number, top: number}}): void {
    this.livePosition = {x, y}
  }

  onCreateExitDragEnded({draggable}: {draggable: Draggable}, exit: IBlockExit): void {
    const {x: left, y: top} = this.operations[OperationKind.CONNECTION_CREATE]!.data!.position

    this.$set(this.exitOnDragged, exit.uuid, false)
    this.isConnectionSource = false

    console.debug('Block', 'onCreateExitDragEnded', 'operation.data.position', {left, top})
    console.debug('Block', 'onCreateExitDragEnded', 'reset', {left: draggable.left, top: draggable.top})

    Object.assign(draggable, {left, top})

    this.applyConnectionCreate()

    this.livePosition = null
  }

  onMoveExitDragStarted({draggable}: {draggable: Draggable}, exit: IBlockExit): void {
    const {block} = this
    const {left: x, top: y} = draggable

    this.initializeConnectionSourceRelocateWith({
      block,
      exit,
      position: {x, y},
    })

    this.adjustDraggablePosition(draggable)
  }

  onMoveExitDragged({position: {left: x, top: y}}: {position: {left: number, top: number}}): void {
    this.livePosition = {x, y}
  }

  // todo: store the leaderlines in vuex and manip there --- aka the leaderline itself would simply _produce_ the
  //       domain object which we thenceforth manip in vuex ?

  onMoveExitDragEnded({draggable}: {draggable: Draggable}): void {
    const {x: left, y: top} = this.operations[OperationKind.CONNECTION_SOURCE_RELOCATE]!.data!.position

    console.debug('Block', 'onMoveExitDragEnded', 'operation.data.position', {left, top})
    console.debug('Block', 'onMoveExitDragEnded', 'reset', {left: draggable.left, top: draggable.top})

    Object.assign(draggable, {left, top})

    this.applyConnectionSourceRelocate()
    this.livePosition = null
  }

  selectBlock(): void {
    const routerName = this.isBlockEditorOpen ? 'block-selected-details' : 'block-selected'
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

    this.$nextTick(() => {
      this.updateTranslatedBlockEditorPosition()
    })
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

  updateCursorPosition(e: MouseEvent): void {
    this.cursorPosition = {
      x: e.clientX + window.scrollX,
      y: e.clientY + window.scrollY,
    }
  }

  adjustDraggablePosition(draggable: Draggable): void {
    const dx = this.cursorPosition!.x - draggable.left - ICON_SIZE
    const dy = this.cursorPosition!.y - draggable.top - ICON_SIZE

    draggable.left += dx
    draggable.top += dy
  }
}

export default Block
</script>

<style lang="scss">
@import "../../scss/custom_variables";

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
    top: 0em;
    gap: 0.4rem;
    margin-bottom: 0.4rem;

    .block-exit {
      display: inline-block;
      border: 1px dashed transparent;
      transition: border-radius 200ms ease-in-out;
      cursor: pointer;

      .block-exit-name {
        display: flex;
        justify-content: center;

        min-width: 100px;
        height: 28px;

        padding: 0.4em;
        border: none;

        font-weight: normal;
        font-size: 12px;

        .block-exit-name-text {
          display: inline-block;
          max-width: calc(100px - 0.8em);
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        &.is-new {
          color: #fff;
          background: $neutral-600;
        }

        &.is-connected {
          color: #000;
          background: #D6D6D6;
        }

        &.is-initiating {
          color: #fff;
          background: $success-600;
        }

        &.is-disconnected {
          color: #fff;
          background: $neutral-600;
        }

        &.is-highlighted-from-connection {
          color: #fff;
          background: $primary-600;
        }

        &.is-connected-and-on-hover {
          background: $primary-50;
        }
      }

      &.activated {
        border-radius: 0.3em;
      }
    }
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
