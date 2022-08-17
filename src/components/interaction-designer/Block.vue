<template>
  <div
    class="block"
    @click="selectBlock">
    <block-editor
      v-if="shouldShowBlockEditor"
      class="block-editor"
      :style="{transform: translatedBlockEditorPosition}" />

    <plain-draggable
      v-if="hasLayout"
      ref="draggable"
      class="block-draggable"
      :class="{
        active: isBlockActivated,
        'has-toolbar': isBlockSelected || shouldShowBlockEditor,
        ['has-exits']: hasExitsShown,
        ['has-multiple-exits']: hasMultipleExitsShown,
        [`has-${numberOfExitsShown}-exits`]: true,
        [`category-${blockClasses[block.type].category}`]: true,
      }"
      :start-x="x"
      :start-y="y"
      :is-editable="isEditable"
      @dragged="onMoved"
      @dragStarted="selectBlock"
      @dragEnded="handleDraggableEndedForBlock"
      @destroyed="handleDraggableDestroyedForBlock">
      <block-toolbar
        :block="block"
        :is-editor-visible="shouldShowBlockEditor"
        :is-block-selected="isBlockSelected" />

      <header
        :id="`block/${block.uuid}/handle`"
        class="block-target draggable-handle"
        :class="{
          'initial': false,
          'pending': isConnectionCreateActive,
          'fulfilled': false,
          'rejected': false,
          'activated': isBlockActivated,
        }"
        @mouseenter="isConnectionCreateActive && activateBlockAsDropZone($event)"
        @mouseleave="isConnectionCreateActive && deactivateBlockAsDropZone($event)">
        <div class="d-flex justify-content-between">
          <p class="block-type text-muted">
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
          :key="exit.uuid"
          class="block-exit mr-2 flex-shrink-1"
          :class="{
            'initial': false,
            'pending': isConnectionSourceRelocateActive,
            'fulfilled': false,
            'rejected': false,
            'activated': isExitActivatedForRelocate(exit),
          }"
          @mouseenter="isConnectionSourceRelocateActive && activateExitAsDropZone($event, exit)"
          @mouseleave="isConnectionSourceRelocateActive && deactivateExitAsDropZone($event, exit)">
          <div class="visible-exits">
            <div class="total-label-container">
              <span class="badge badge-primary tree-block-item-label tree-block-item-output-subscribers-1" />
            </div>

            <div
              class="block-exit-name badge badge-warning is-connected"
              :class="{
                'is-connected': exit.destination_block != null,
                'is-disconnected': exit.destination_block == null,
                'is-connected-and-hovered': (exit.destination_block != null && exitHovers[exit.uuid]) || (exit.destination_block != null && lineHovers[exit.uuid]),
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
                    v-b-tooltip.hover.bottom="transIf(isEditable, 'flow-builder.tooltip-new-connection')"
                    class="btn btn-xs btn-flat p-0"
                    :is-editable="isEditable"
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
                      class="btn btn-xs p-0">
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
                      v-b-tooltip.hover.bottom="trans('flow-builder.tooltip-remove-connection')"
                      class="text-danger"
                      title="Click to remove this connection"
                      :icon="['far', 'times-circle']"
                      @click="handleRemoveConnectionFrom(exit)" />
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

const flowNamespace = namespace('flow')
const builderNamespace = namespace('builder')

type Draggable = any

type BlockAction = ({block}: { block: IBlock }) => void;
type BlockExitAction = ({block, exit}: { block: IBlock, exit: IBlockExit }) => void;
type BlockPositionAction = ({block, position}: { block: IBlock, position: IPosition }) => void;
type BlockExitPositionAction = ({block, exit, position}: { block: IBlock, exit: IBlockExit, position: IPosition }) => void;

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
  lineHovers: Record<IBlockExit['uuid'], boolean> = {}
  connectionColorAtSourceDragged = colorStates.CONNECTING
  connectionColorForKnowDestination = colorStates.DEFAULT

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
  @builderNamespace.State draggableForExitsByUuid!: Record<string, Draggable>
  @builderNamespace.State isBlockEditorOpen!: boolean
  @State(({trees: {ui}}) => ui.blockClasses) blockClasses!: BlockClasses

  @builderNamespace.Getter blocksById!: Record<IBlock['uuid'], IBlock>
  @builderNamespace.Getter isEditable!: boolean
  @builderNamespace.Getter interactionDesignerBoundingClientRect!: DOMRect

  @flowNamespace.Getter activeFlow?: IFlow

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

  get translatedBlockEditorPosition(): string {
    const xOffset = 5
    // Block toolbar height
    const yOffset = 32
    const left = this.x + this.blockWidth + xOffset - this.interactionDesignerBoundingClientRect.left
    const top = this.y - yOffset
    return `translate(${left}px, ${top}px)`
  }

  get shouldShowBlockEditor(): boolean {
    return this.isBlockEditorOpen && this.activeBlockId === this.block.uuid
  }

  // todo: how do we decide whether or not this should be an action or a vanilla domain function?
  generateConnectionLayoutKeyFor(source: IBlock, target: IBlock): ConnectionLayout {
    return generateConnectionLayoutKeyFor(source, target)
  }

  @builderNamespace.Mutation activateBlock!: () => void
  @builderNamespace.Mutation setBlockPositionTo!: BlockPositionAction
  @builderNamespace.Mutation initDraggableForExitsByUuid!: () => void
  @builderNamespace.Mutation setIsBlockEditorOpen!: () => void

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

  exitMouseEnter(exit: IBlockExit): void {
    this.$set(this.exitHovers, exit.uuid, true)
  }

  exitMouseLeave(exit: IBlockExit): void {
    this.$set(this.exitHovers, exit.uuid, false)
  }

  setLineHovered(exit: IBlockExit, value: boolean): void {
    this.$nextTick(() => {
      this.$set(this.lineHovers, exit.uuid, value)
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
    this.setConnectionCreateTargetBlockToNullFrom({block})
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

  handleRemoveConnectionFrom(exit: IBlockExit): void {
    const {block} = this
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

    this.initializeConnectionCreateWith({
      block,
      exit,
      position: {x, y},
    })

    // since mouseenter + mouseleave will not occur when draggable is below cursor
    // we simply snap the draggable out from under the cursor during this operation
    draggable.left += 30
    draggable.top += 25
  }

  onCreateExitDragged({position: {left: x, top: y}}: {position: {left: number, top: number}}): void {
    this.livePosition = {x, y}
  }

  onCreateExitDragEnded({draggable}: {draggable: Draggable}): void {
    const {x: left, y: top} = this.operations[OperationKind.CONNECTION_CREATE]!.data!.position

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

    // since mouseenter + mouseleave will not occur when draggable is below cursor
    // we simply snap the draggable out from under the cursor during this operation
    draggable.left += 30
    draggable.top += 25
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
.fa-btn {
  cursor: pointer;
}

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

    .block-exit {
      display: inline-block;
      border: 1px dashed transparent;
      transition: border-radius 200ms ease-in-out;

      .block-exit-name {
        display: flex;
        justify-content: center;

        width: 100px;
        height: 28px;

        padding: 0.4em;
        border: none;

        font-weight: normal;
        font-size: 12px;

        .block-exit-name-text {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        &.is-connected {
          color: #fff;
          background: #418BCA;
        }

        &.is-disconnected {
          color: #fff;
          background: #858585;
        }

        &.is-connected-and-hovered {
          color: #dc3545;
          background: #FFECEC;
        }
      }

      &.activated {
        border-radius: 0.3em;
        border-color: #333333;
      }
    }
  }

  // state mutations

  &.active {
    border-width: 2px;
    box-shadow: 0 3px 6px #CACACA;
  }

  // block exit states
  &.active,
  &:hover {
    .block-exit .block-exit-remove {
      opacity: 1;
    }
  }
}
</style>
