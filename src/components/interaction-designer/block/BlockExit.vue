<template>
  <div
    :key="componentKey"
    v-b-tooltip.hover.bottom="tooltip"
    class="block-exit flex-grow-1"
    @mousemove="updateCursorPosition"
    @click="exit.destination_block && handleRemoveConnection()">
    <div
      class="block-exit-name badge badge-warning w-100"
      :class="exitNameClass"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false">
      <div
        v-if="!(isHovered || isExitActivatedForCreate)"
        class="d-flex flex-row justify-content-between align-items-center w-100 px-1">
        <div
          v-b-tooltip.hover.bottom="exit.test"
          class="block-exit-name-text">
          {{ exit.name || '(untitled)' }}
        </div>
        <slot name="right" />
      </div>

      <span class="align-self-center">
        <template v-if="exit.destination_block == null">
          <plain-draggable
            v-if="isHovered || isExitActivatedForCreate"
            :id="`exit/${exit.uuid}/pseudo-block-handle`"
            :key="`exit/${exit.uuid}/pseudo-block-handle`"
            :drag-handle-id="`exit/${exit.uuid}`"
            class="btn btn-xs btn-flat p-0"
            :is-editable="isEditable"
            @initialized="handleDraggableInitializedFor($event)"
            @dragStarted="onCreateExitDragStarted($event)"
            @dragged="onCreateExitDragged($event)"
            @dragEnded="onCreateExitDragEnded($event)"
            @destroyed="handleDraggableDestroyedFor()">
            <i class="glyphicon glyphicon-move" />
          </plain-draggable>

          <template v-if="isConnectionCreateActive && isExitActivatedForCreate && livePosition">
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
              v-if="isHovered"
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
            @lineMouseIn="setIsLineHovered(true)"
            @lineMouseClickedIn="setIsLineClicked(true)"
            @lineMouseClickedOut="setIsLineClicked(false)"
            @lineMouseOut="setIsLineHovered(false)" />
        </template>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, defineEmits, defineProps, nextTick, ref} from 'vue'
import {IBlock, IBlockExit} from '@floip/flow-runner'
import {
  generateConnectionLayoutKeyFor,
  OperationKind,
  SupportedOperation,
} from '@/store/builder'
import {BLOCK_RESET_CONNECTIONS} from '@/components/interaction-designer/block/Block.vue'
import {colorStates} from '@/components/interaction-designer/Connection.vue'
import {useStore} from '@/store/useStore'
import {lang} from '@/lib/filters/lang'

const store = useStore()

type Draggable = any
const connectionColorAtSourceDragged = colorStates.CONNECTING
const connectionColorForKnowDestination = colorStates.DEFAULT
const ICON_SIZE = 10

const props = defineProps<{
  block: IBlock,
  exit: IBlockExit,
}>()

// eslint-disable-next-line no-spaced-func,func-call-spacing
const emit = defineEmits<{
  (e: 'connection-create-start'): void,
  (e: 'connection-create-end'): void,
}>()

const isDragged = ref(false)
const isHovered = ref(false)
const isLineHovered = ref(false)
const isLinePermanentlyActive = ref(false)
const livePosition = ref<{x: number, y: number} | null>(null)
const cursorPosition = ref<{x: number, y: number} | null>(null)
const componentKey = ref(0)

const isEditable = computed<boolean>(() => store.getters['builder/isEditable'])

const operations = computed<Record<OperationKind, SupportedOperation>>(() =>
  store.state.builder.operations)

const isConnectionCreateActive = computed(() =>
  operations.value[OperationKind.CONNECTION_CREATE].data !== null)

const isExitActivatedForCreate = computed(() => {
  const {data} = operations.value[OperationKind.CONNECTION_CREATE]
  return data?.source?.exitId === props.exit.uuid
})

const tooltip = computed<string>(() => {
  if (!isEditable.value) {
    return ''
  } else if (props.exit.destination_block !== undefined) {
    return lang.trans('flow-builder.tooltip-remove-connection')
  } else {
    return lang.trans('flow-builder.tooltip-new-connection')
  }
})

const exitNameClass = computed(() => ({
  'is-initiating': props.exit.destination_block == null && isDragged.value,
  'is-connected': props.exit.destination_block != null,
  'is-disconnected': props.exit.destination_block == null && !isDragged.value,
  'is-highlighted-from-connection': props.exit.destination_block != null
    && (isLineHovered.value || isLinePermanentlyActive.value),
  'is-connected-and-on-hover': props.exit.destination_block != null && isHovered.value,
}))

const blocksById = computed<Record<IBlock['uuid'], IBlock>>(() =>
  store.getters['builder/blocksById'])

const draggableForExitsByUuid = computed<Record<string, Draggable>>(() =>
  store.state.builder.draggableForExitsByUuid)

function forceRender() {
  componentKey.value += 1
}

function updateCursorPosition(e: MouseEvent): void {
  cursorPosition.value = {
    x: e.clientX + window.scrollX,
    y: e.clientY + window.scrollY,
  }
}

function handleRemoveConnection(): void {
  setIsLineClicked(false)
  store.commit('builder/deactivateConnectionFromExitUuid', {exitUuid: props.exit.uuid}, {root: true})
  store.dispatch('builder/removeConnectionFrom', {block: props.block, exit: props.exit}, {root: true})
  // force render, useful if the exit label is very short
  this.forceRender()
}

function handleDraggableInitializedFor({draggable}: {draggable: Draggable}): void {
  const exitId = props.exit.uuid
  draggableForExitsByUuid.value[exitId] = draggable

  const {left, top} = draggable

  console.debug('Block', 'handleDraggableInitializedFor', {blockId: props.block.uuid, exitId, coords: {left, top}})
}

function handleDraggableDestroyedFor(): void {
  const exitId = props.exit.uuid
  delete draggableForExitsByUuid.value[exitId]
}

function adjustDraggablePosition(draggable: Draggable): void {
  const dx = cursorPosition.value.x - draggable.left - ICON_SIZE
  const dy = cursorPosition.value.y - draggable.top - ICON_SIZE

  draggable.left += dx
  draggable.top += dy
}

function onCreateExitDragStarted({draggable}: {draggable: Draggable}): void {
  store.commit('builder/setIsConnectionCreationInProgress', {value: true}, {root: true})

  window.postMessage(BLOCK_RESET_CONNECTIONS, '*')

  isDragged.value = true

  emit('connection-create-start')

  const {left: x, top: y} = draggable

  store.dispatch('builder/initializeConnectionCreateWith', {
    block: props.block,
    exit: props.exit,
    position: {x, y},
  }, {root: true})

  adjustDraggablePosition(draggable)
}

function onCreateExitDragged({position: {left: x, top: y}}: {position: {left: number, top: number}}): void {
  livePosition.value = {x, y}
}

function onCreateExitDragEnded({draggable}: {draggable: Draggable}): void {
  store.commit('builder/setIsConnectionCreationInProgress', {value: false}, {root: true})

  isDragged.value = false

  emit('connection-create-end')

  const {x: left, y: top} = operations.value[OperationKind.CONNECTION_CREATE]!.data!.position

  console.debug('Block', 'onCreateExitDragEnded', 'operation.data.position', {left, top})
  console.debug('Block', 'onCreateExitDragEnded', 'reset', {left: draggable.left, top: draggable.top})

  Object.assign(draggable, {left, top})

  store.dispatch('builder/applyConnectionCreate', null, {root: true})

  livePosition.value = null
}

function setIsLineHovered(value: boolean): void {
  nextTick(() => {
    isLineHovered.value = value
  })
}

function setIsLineClicked(value: boolean): void {
  nextTick(() => {
    isLinePermanentlyActive.value = value
  })
}
</script>

<style lang="scss">
@import "../../../scss/custom_variables";

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

    .block-exit-name-text:only-child {
      margin: 0 auto;
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

.target-block-having-active-connection {
  .block-exit-name {
    color: $primary-600 !important;
    background: #fff !important;
  }
}

.target-block-waiting-for-connection {
  .block-exit-name {
    color: $success-600 !important;
    background: #fff !important;
  }
}
</style>
