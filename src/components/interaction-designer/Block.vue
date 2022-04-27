<template>
  <div @click="selectBlock">
    <block-editor
      v-if="shouldShowBlockEditor"
      class="block-editor"
      :style="{transform: translatedBlockEditorPosition}" />

    <plain-draggable
      v-if="hasLayout"
      ref="draggable"
      class="block"
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
          <div v-if="!(exit.default && block.vendor_metadata.io_viamo.noValidResponse === NoValidResponseHandler.END_CALL)">
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
                      @click="removeConnectionFrom(exit)" />
                  </div>

                  <connection
                    :key="`exit/${exit.uuid}/line`"
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

<script lang="js">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */
import Vue from 'vue'
import {filter, forEach, get, includes, isNumber} from 'lodash'
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'
import {ResourceResolver, SupportedMode} from '@floip/flow-runner'
import {generateConnectionLayoutKeyFor, OperationKind} from '@/store/builder'
import {lang} from '@/lib/filters/lang'
import {NoValidResponseHandler} from '@/components/interaction-designer/block-editors/BlockOutputBranchingConfig.vue'

const LABEL_CONTAINER_MAX_WIDTH = 650

export const Block = {
  mixins: [lang],
  props: ['block', 'x', 'y'],

  data() {
    return {
      livePosition: null,
      labelContainerMaxWidth: LABEL_CONTAINER_MAX_WIDTH,
      blockWidth: 0,
      blockHeight: 0,
      exitHovers: {},
      lineHovers: {},
      NoValidResponseHandler,
    }
  },

  watch: {
    blockExitsLength(newValue, oldValue) {
      this.$nextTick(function () {
        this.updateLabelContainerMaxWidth(newValue, newValue < oldValue)
      })
    },
  },

  updated() {
    this.blockWidth = this.$refs.draggable.$el.clientWidth
  },

  created() {
    this.initDraggableForExitsByUuid()
  },

  mounted() {
    this.$nextTick(function () {
      this.updateLabelContainerMaxWidth()
    })
  },

  computed: {
    ...mapState('flow', [
      'selectedBlocks',
    ]),
    ...mapState('builder', [
      'activeBlockId',
      'operations',
      'activeConnectionsContext',
      'draggableForExitsByUuid',
      'isBlockEditorOpen',
    ]),
    ...mapState({
      blockClasses: ({trees: {ui}}) => ui.blockClasses,
    }),

    ...mapGetters('builder', ['blocksById', 'isEditable', 'interactionDesignerBoundingClientRect']),
    ...mapGetters('flow', ['activeFlow']),

    blockExitsLength() {
      return this.block.exits.length
    },

    numberOfExitsShown() {
      const {exits} = this.block
      const isDefaultShown = get(this.block.vendor_metadata, 'io_viamo.noValidResponse') === NoValidResponseHandler.CONTINUE_THRU_EXIT
      return exits.length - (isDefaultShown ? 0 : 1)
    },

    hasExitsShown() {
      return this.numberOfExitsShown > 0
    },

    hasMultipleExitsShown() {
      return this.numberOfExitsShown > 1
    },

    hasLayout() {
      return isNumber(this.x) && isNumber(this.y)
    },

    isAssociatedWithActiveConnection({block, activeConnectionsContext}) {
      return !!filter(activeConnectionsContext, (context) => context.sourceId === block.uuid || context.targetId === block.uuid).length
    },

    isBlockSelected() {
      return includes(this.selectedBlocks, this.block.uuid)
    },

    // todo: does this component know too much, what out of the above mapped state can be mapped?
    // todo: We should likely also proxy our resource resolving so that as to mitigate the need to see all resources and generate a context

    isConnectionSourceRelocateActive: ({operations}) => !!operations[OperationKind.CONNECTION_SOURCE_RELOCATE].data,
    isConnectionCreateActive: ({operations}) => !!operations[OperationKind.CONNECTION_CREATE].data,
    isBlockActivated: ({
                         activeBlockId, isAssociatedWithActiveConnection, block, operations,
                       }) => {
      if ((activeBlockId && activeBlockId === block.uuid) || isAssociatedWithActiveConnection) {
        return true
      }

      const {data} = operations[OperationKind.CONNECTION_CREATE]
      return data && data.targetId === block.uuid
    },

    translatedBlockEditorPosition() {
      const xOffset = 5
      const yOffset = 32 // Block toolbar height
      const left = this.x + this.blockWidth + xOffset - this.interactionDesignerBoundingClientRect.left
      const top = this.y - yOffset
      return `translate(${left}px, ${top}px)`
    },

    shouldShowBlockEditor() {
      return this.isBlockEditorOpen && this.activeBlockId === this.block.uuid
    },
  },

  methods: {
    // todo: how do we decide whether or not this should be an action or a vanilla domain function?
    ...{
      generateConnectionLayoutKeyFor,
    },

    ...mapMutations('builder', ['activateBlock', 'setBlockPositionTo', 'initDraggableForExitsByUuid', 'setIsBlockEditorOpen']),
    ...mapActions('builder', {
      _removeConnectionFrom: 'removeConnectionFrom',
    }),

    ...mapActions('builder', [
      // ConnectionSourceRelocate
      'initializeConnectionSourceRelocateWith',
      'setConnectionSourceRelocateValue',
      'setConnectionSourceRelocateValueToNullFrom',
      'applyConnectionSourceRelocate',

      // ConnectionCreate
      'initializeConnectionCreateWith',
      'setConnectionCreateTargetBlock',
      'setConnectionCreateTargetBlockToNullFrom',
      'applyConnectionCreate',
    ]),

    exitMouseEnter(exit) {
      this.$set(this.exitHovers, exit.uuid, true)
    },

    exitMouseLeave(exit) {
      this.$set(this.exitHovers, exit.uuid, false)
    },

    setLineHovered(exit, value) {
      this.$nextTick(() => {
        this.$set(this.lineHovers, exit.uuid, value)
      })
    },

    updateLabelContainerMaxWidth(blockExitsLength = this.blockExitsLength, isRemoving = false) {
      // one exit
      const blockExitElement = document.querySelector(`#block\\/${this.block.uuid} .block-exit`)

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
      } else {
        // -1: to force having LABEL_CONTAINER_MAX_WIDTH as possible (especially when removing exits)
        if (LABEL_CONTAINER_MAX_WIDTH < blockExitsLength * blockExitElement.clientWidth) {
          // but set with `n x {outer width}`
          this.labelContainerMaxWidth = blockExitsLength * blockExitElement.offsetWidth
          return
        }
      }

      this.labelContainerMaxWidth = LABEL_CONTAINER_MAX_WIDTH
    },

    resolveTextResource(uuid) {
      const {resources} = this.activeFlow
      const context = {
        resources,
        language_id: '22',
        mode: SupportedMode.SMS,
      }
      // as IContext) // this isn't ts
      const resource = new ResourceResolver(context)
        .resolve(uuid)

      return resource.hasText()
        ? resource.getText()
        : uuid
    },

    // todo: push NodeExit into it's own vue component
    isExitActivatedForRelocate(exit) {
      const {data} = this.operations[OperationKind.CONNECTION_SOURCE_RELOCATE]
      return data
        && data.to
        && data.to.exitId === exit.uuid
    },

    isExitActivatedForCreate(exit) {
      const {data} = this.operations[OperationKind.CONNECTION_CREATE]
      return data
        && data.source
        && data.source.exitId === exit.uuid
    },

    activateExitAsDropZone(e, exit) {
      const {block} = this
      this.setConnectionSourceRelocateValue({block, exit})
    },

    deactivateExitAsDropZone(e, exit) {
      const {block} = this
      this.setConnectionSourceRelocateValueToNullFrom({block, exit})
    },

    // eslint-disable-next-line no-unused-vars
    activateBlockAsDropZone(e) {
      const {block} = this
      this.setConnectionCreateTargetBlock({block})
    },

    // eslint-disable-next-line no-unused-vars
    deactivateBlockAsDropZone(e) {
      const {block} = this
      this.setConnectionCreateTargetBlockToNullFrom({block})
    },

    onMoved({position: {left: x, top: y}}) {
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
    },

    removeConnectionFrom(exit) {
      const {block} = this
      this._removeConnectionFrom({block, exit})
      // force render, useful if the exit label is very short
      this.labelContainerMaxWidth += 0
    },

    handleDraggableInitializedFor({uuid}, {draggable}) {
      this.draggableForExitsByUuid[uuid] = draggable

      const {left, top} = draggable
      const {uuid: blockId} = this.block

      console.debug('Block', 'handleDraggableInitializedFor', {blockId, exitId: uuid, coords: {left, top}})
    },

    handleDraggableDestroyedFor({uuid}) {
      delete this.draggableForExitsByUuid[uuid]
    },

    onCreateExitDragStarted({draggable}, exit) {
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
    },

    onCreateExitDragged({position: {left: x, top: y}}) {
      this.livePosition = {x, y}
    },

    onCreateExitDragEnded({draggable}) {
      const {x: left, y: top} = this.operations[OperationKind.CONNECTION_CREATE].data.position

      console.debug('Block', 'onCreateExitDragEnded', 'operation.data.position', {left, top})
      console.debug('Block', 'onCreateExitDragEnded', 'reset', {left: draggable.left, top: draggable.top})

      Object.assign(draggable, {left, top})

      this.applyConnectionCreate()

      this.livePosition = null
    },

    onMoveExitDragStarted({draggable}, exit) {
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
    },

    onMoveExitDragged({position: {left: x, top: y}}) {
      this.livePosition = {x, y}
    },

    // todo: store the leaderlines in vuex and manip there --- aka the leaderline itself would simply _produce_ the
    //       domain object which we thenceforth manip in vuex ?

    onMoveExitDragEnded({draggable}) {
      const {x: left, y: top} = this.operations[OperationKind.CONNECTION_SOURCE_RELOCATE].data.position

      console.debug('Block', 'onMoveExitDragEnded', 'operation.data.position', {left, top})
      console.debug('Block', 'onMoveExitDragEnded', 'reset', {left: draggable.left, top: draggable.top})

      Object.assign(draggable, {left, top})

      this.applyConnectionSourceRelocate()
      this.livePosition = null
    },

    selectBlock() {
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
    },

    handleDraggableEndedForBlock() {
      console.debug('Block', 'handleDraggableEndedForBlock')
      const self = this
      forEach(this.block.exits, (exit) => {
        delete self.draggableForExitsByUuid[exit.uuid]
      })
    },

    handleDraggableDestroyedForBlock() {
      console.debug('Block', 'handleDraggableDestroyedForBlock')
      const self = this
      forEach(this.block.exits, (exit) => {
        delete self.draggableForExitsByUuid[exit.uuid]
      })
    },
  },
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

.block {
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
