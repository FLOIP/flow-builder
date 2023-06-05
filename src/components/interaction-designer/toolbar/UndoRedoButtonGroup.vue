<template>
  <fieldset class="undo-redo-button-group btn-group" :disabled="isTreeSaving">
    <button
      v-b-tooltip.hover="undoTooltip"
      class="btn btn-sm btn-outline-primary"
      :disabled="!hasPreviousSnapshot"
      @click.stop="handleUndo">
      <font-awesome-icon :icon="['fas', 'undo']" />
    </button>
    <button
      v-b-tooltip.hover="redoTooltip"
      class="btn btn-sm btn-outline-primary"
      :disabled="!hasFutureSnapshot"
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

const hasPreviousSnapshot = computed<boolean>(() => store.getters['undoRedo/hasPreviousSnapshot'])
const hasFutureSnapshot = computed<boolean>(() => store.getters['undoRedo/hasFutureSnapshot'])
const isTreeSaving = computed<boolean>(() => store.getters['isTreeSaving'])

// we need this check because if hasPreviousSnapshot/hasFutureSnapshot becomes false, the button gets disabled and the tooltip doesn't go away
const undoTooltip = computed<string>(() => (
  hasPreviousSnapshot.value ? lang.trans('flow-builder.undo') : ''
))
const redoTooltip = computed<string>(() => (
  hasFutureSnapshot.value ? lang.trans('flow-builder.redo') : ''
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
