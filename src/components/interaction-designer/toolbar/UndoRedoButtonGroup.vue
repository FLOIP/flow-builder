<template>
  <fieldset class="undo-redo-button-group btn-group" :disabled="isTreeSaving">
    <button
      v-b-tooltip.hover="undoTooltip"
      class="btn btn-sm btn-outline-primary"
      :disabled="!canUndo"
      @click.stop="handleUndo">
      <font-awesome-icon :icon="['fas', 'undo']" />
    </button>
    <button
      v-b-tooltip.hover="redoTooltip"
      class="btn btn-sm btn-outline-primary"
      :disabled="!canRedo"
      @click.stop="handleRedo">
      <font-awesome-icon :icon="['fas', 'redo']" />
    </button>
  </fieldset>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {useStore} from '@/store/useStore'
import {lang} from '@/lib/filters/lang'
import {BLOCK_RESET_CONNECTIONS} from '../block/Block.vue'

const store = useStore()

const canUndo = computed<boolean>(() => store.getters['undoRedo/canUndo'])
const canRedo = computed<boolean>(() => store.getters['undoRedo/canRedo'])
const isTreeSaving = computed<boolean>(() => store.getters['isTreeSaving'])

// we need this check because if canUndo/canRedo becomes false, the button gets disabled and the tooltip doesn't go away
const undoTooltip = computed<string>(() => (
  canUndo.value ? lang.trans('flow-builder.undo') : ''
))
const redoTooltip = computed<string>(() => (
  canRedo.value ? lang.trans('flow-builder.redo') : ''
))

function handleUndo(): void {
  window.postMessage(BLOCK_RESET_CONNECTIONS, '*')
  store.dispatch('undoRedo/undoAndUpdateState', null, {root: true})
}

function handleRedo(): void {
  window.postMessage(BLOCK_RESET_CONNECTIONS, '*')
  store.dispatch('undoRedo/redoAndUpdateState', null, {root: true})
}
</script>
