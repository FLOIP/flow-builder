<template>
  <div @click="selectBlock">
    <plain-draggable
      v-if="hasLayout"
      ref="draggable"
      class="block"
      :class="{
        active: isBlockActivated,
        'has-toolbar': isBlockSelected,
        [`category-${blockClasses[block.type].category}`]: true,
      }"
      :start-x="x"
      :start-y="y"
      :is-editable="isEditable"
      @dragged="onMoved"
      @dragStarted="selectBlock"
      @dragEnded="handleDraggableEndedForBlock"
      @destroyed="handleDraggableDestroyedForBlock">
      <div class="block-toolbar d-flex justify-content-between">
        <div class="header-actions-left">
          <!--Selection-->
          <font-awesome-icon
            v-if="isBlockSelected"
            v-b-tooltip.hover="trans('flow-builder.deselect-block')"
            :icon="['fas', 'check-circle']"
            class="fa-btn text-primary"
            @click="block_deselect({ blockId: block.uuid })" />
          <font-awesome-icon
            v-if="!isBlockSelected"
            v-b-tooltip.hover="trans('flow-builder.select-block')"
            :icon="['far', 'circle']"
            class="fa-btn"
            @click="block_select({ blockId: block.uuid })" />
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
                @click.prevent="handleDeleteBlock()">
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
              :icon="['far', 'clone']"
              class="fa-btn"
              @click.prevent="handleDuplicateBlock" />
          </div>
        </div>
      </div>

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
          {{ block.label || 'Untitled block' }}
        </h3>
      </header>

      <div
        :id="`block/${block.uuid}/exits`"
        :ref="`block/${block.uuid}/exits`"
        class="block-exits d-flex">
        <div
          v-for="(exit, key) in block.exits"
          :key="exit.uuid"
          class="block-exit col flex-shrink-1 pb-1 pt-1 pl-3 pr-3"
          :class="{
            'initial': false,
            'pending': isConnectionSourceRelocateActive,
            'fulfilled': false,
            'rejected': false,
            'activated': isExitActivatedForRelocate(exit),
          }"
          @mouseenter="isConnectionSourceRelocateActive && activateExitAsDropZone($event, exit)"
          @mouseleave="isConnectionSourceRelocateActive && deactivateExitAsDropZone($event, exit)">
          <div class="total-label-container">
            <span class="badge badge-primary tree-block-item-label tree-block-item-output-subscribers-1" />
          </div>

          <h3 class="block-exit-tag badge badge-warning">
            {{ visibleExitTag(key, exit) }}
          </h3>

          <template v-if="exit.destination_block == null">
            <plain-draggable
              :id="`exit/${exit.uuid}/pseudo-block-handle`"
              :key="`exit/${exit.uuid}/pseudo-block-handle`"
              v-b-tooltip.hover.top="transIf(isEditable, 'flow-builder.tooltip-new-connection')"
              class="handle-create-link btn btn-outline-secondary btn-xs btn-flat"
              :class="{
                'btn-info': exit.destination_block != null,
              }"
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
                class="handle-move-link btn btn-secondary btn-xs"
                :class="{
                  'btn-info': exit.destination_block != null,
                }">
                <i class="glyphicon glyphicon-move" />
              </div>

              <connection
                :key="`exit/${exit.uuid}/line-for-draft`"
                :repaint-cache-key-generator="generateConnectionLayoutKeyFor"
                :source="block"
                :target="blocksById[exit.destination_block]"
                :exit="exit"
                :position="livePosition"
                :color-category="blockClasses[block.type].category" />
            </template>
          </template>

          <template v-if="exit.destination_block != null">
            <plain-draggable
              :id="`exit/${exit.uuid}/handle`"
              :key="`exit/${exit.uuid}/handle`"
              v-b-tooltip.hover.top="transIf(isEditable, 'flow-builder.tooltip-relocate-connection')"
              class="block-exit-move-handle handle-move-link btn btn-outline-secondary btn-xs btn-flat"
              :class="{
                // 'btn-secondary': exit.destination_block != null,
              }"
              :is-editable="isEditable"
              @initialized="handleDraggableInitializedFor(exit, $event)"
              @dragStarted="onMoveExitDragStarted($event, exit)"
              @dragged="onMoveExitDragged($event)"
              @dragEnded="onMoveExitDragEnded($event, exit)"
              @destroyed="handleDraggableDestroyedFor(exit)">
              <i class="glyphicon glyphicon-move" />
            </plain-draggable>

            <div
              v-if="isEditable"
              v-b-tooltip.hover.top="trans('flow-builder.tooltip-remove-connection')"
              class="block-exit-remove btn btn-danger btn-xs"
              title="Click to remove this connection"
              @click="removeConnectionFrom(exit)">
              <span class="glyphicon glyphicon-remove" />
            </div>

            <connection
              :key="`exit/${exit.uuid}/line`"
              :repaint-cache-key-generator="generateConnectionLayoutKeyFor"
              :source="livePosition ? null : block"
              :target="blocksById[exit.destination_block]"
              :exit="exit"
              :position="livePosition"
              :color-category="blockClasses[block.type].category" />
          </template>
        </div>
      </div>
    </plain-draggable>
  </div>
</template>

<script lang="js">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/strict-boolean-expressions */
import Vue from 'vue'
import {filter, forEach, includes, isNumber} from 'lodash'
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'
import PlainDraggable from '@/components/common/PlainDraggable.vue'
import {ResourceResolver, SupportedMode} from '@floip/flow-runner'
import {generateConnectionLayoutKeyFor, OperationKind} from '@/store/builder'
import Connection from '@/components/interaction-designer/Connection.vue'
import {lang} from '@/lib/filters/lang'
import {BLOCK_TYPE as BLOCK_TYPE__CASE_BLOCK} from '@/store/flow/block-types/Core_CaseBlockStore'
import {BLOCK_TYPE as BLOCK_TYPE__SELECT_ONE_BLOCK} from '@/store/flow/block-types/MobilePrimitives_SelectOneResponseBlockStore'
import {BLOCK_TYPE as BLOCK_TYPE__SELECT_MANY_BLOCK} from '@/store/flow/block-types/MobilePrimitives_SelectManyResponseBlockStore'

import {BTooltip} from 'bootstrap-vue'

Vue.component('BTooltip', BTooltip)

const LABEL_CONTAINER_MAX_WIDTH = 650

export default {
  components: {
    Connection,
    PlainDraggable,
  },
  mixins: [lang],
  props: ['block', 'x', 'y'],

  data() {
    return {
      isDeleting: false,
      livePosition: null,
      labelContainerMaxWidth: LABEL_CONTAINER_MAX_WIDTH,
    }
  },

  watch: {
    blockExitsLength(newValue, oldValue) {
      this.$nextTick(function () {
        this.updateLabelContainerMaxWidth(newValue, newValue < oldValue)
      })
    },
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
      'resources',
      'selectedBlocks',
    ]),
    ...mapState(
      'builder',
      ['activeBlockId', 'operations', 'activeConnectionsContext', 'draggableForExitsByUuid'],
    ),
    ...mapState({
      blockClasses: ({trees: {ui}}) => ui.blockClasses,
    }),

    ...mapGetters('builder', ['blocksById', 'isEditable']),
    ...mapGetters('flow', ['activeFlow']),

    blockExitsLength() {
      return this.block.exits.length
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
  },

  methods: {
    // todo: how do we decide whether or not this should be an action or a vanilla domain function?
    ...{
      generateConnectionLayoutKeyFor,
    },

    ...mapMutations('builder', ['activateBlock', 'setBlockPositionTo', 'initDraggableForExitsByUuid']),

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

    ...mapActions('flow', [
      'flow_duplicateBlock',
      'flow_removeBlock',
      'block_select',
      'block_deselect',
    ]),

    ...mapMutations('validation', ['removeValidationStatusesFor']),

    handleDeleteBlock() {
      this.block_deselect({blockId: this.block.uuid})
      this.flow_removeBlock({blockId: this.block.uuid})
      this.removeValidationStatusesFor({key: `block/${this.block.uuid}`})
      this.isDeleting = false
    },

    handleDuplicateBlock() {
      this.flow_duplicateBlock({blockId: this.block.uuid}).then((duplicatedBlock) => {
        this.$router.replace({
          name: 'block-selected-details',
          params: {blockId: duplicatedBlock.uuid},
        })
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
      const {resources} = this
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

    visibleExitTag(key, exit) {
      if (!exit.tag && !exit.semantic_label) {
        return '—'
      }

      const {block} = this
      if (block.type === BLOCK_TYPE__CASE_BLOCK) {
        return `${key + 1}: ${exit.tag}`
      } else if ((block.type === BLOCK_TYPE__SELECT_ONE_BLOCK || block.type === BLOCK_TYPE__SELECT_MANY_BLOCK) && exit.semantic_label) {
        return exit.semantic_label
      }

      return exit.tag
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
      const {block: {uuid: blockId}} = this
      const routerName = this.$route.meta.isSidebarShown ? 'block-selected-details' : 'block-selected'
      this.$router.history.replace({
        name: routerName,
        params: {blockId},
      })
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
</script>

<style lang="scss">
.fa-btn {
  cursor: pointer;
}

.btn-secondary.btn-flat {
  @extend .btn-secondary;
  background: transparent;
}

.block {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1*10;

  min-width: 300px;
  padding: 0.4em;
  padding-bottom: 0.25em;
  scroll-margin: 35px;
  scroll-margin-top: 100px;

  background-color: white;
  color: #575757;
  border: 1px solid #5b5b5b;

  border-radius: 0.3em;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  opacity: 0.9;

  transition: opacity 200ms ease-in-out,
  background-color 200ms ease-in-out;

  .block-toolbar {
    transition: opacity 100ms ease-in-out;
    background: white;
    opacity: 0; // default state of hidden

    margin-top: -39.75px;
    margin-right: -7px;
    margin-left: -7px;
    padding: 8px;

    border-top: inherit;
    border-right: inherit;
    border-left: inherit;
    border-top-right-radius: inherit;
    border-top-left-radius: inherit;
  }

  .block-label {
    font-size: 14px;
    font-weight: normal;
    min-width: 300px;
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
    min-height: 4em;
    border: 1px dashed transparent;
    border-bottom: 1px solid #eee;
    padding: 0.1em;

    transition: border-radius 200ms ease-in-out;

    &:hover {
      border-radius: 0.3em;
      border-color: #5b5b5b;
    }
  }

  .block-exits {
    white-space: nowrap;
    position: relative;
    top: 0em;
    margin-top: 0.25em;

    .block-exit {
      display: inline-block;
      border: 1px dashed transparent;
      transition: border-radius 200ms ease-in-out;

      min-width: 25px;
      max-width: 100px;

      text-align: center;

      .block-exit-tag {
        display: block;

        min-width: 25px;

        margin: 0 0 0.5em 0;
        padding: 0.4em;

        background-color: #5b5b5b;
        border: none;

        font-weight: normal;
        font-size: 12px;

        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .block-exit-move-handle {
        margin-right: 0.5em;
      }

      .block-exit-remove {
        background-image: none;
        opacity: 0;
        transition: opacity 200ms ease-in-out;
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

  &:hover {
    opacity: 1;
  }

  // block exit states
  &.active,
  &:hover {
    .block-exit .block-exit-remove {
      opacity: 1;
    }
  }

  // toolbar states
  &.has-toolbar,
  &:hover {
    .block-toolbar {
      opacity: 1;
    }
  }

  &.active {
    .block-toolbar {
      margin-left: -8px;
      margin-right: -8px;
    }
  }
}
</style>
