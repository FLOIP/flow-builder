<template>
  <div class="undo-redo-button-group btn-group">
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
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {useStore} from '@/store/useStore'
import {lang} from '@/lib/filters/lang'

const store = useStore()

const canUndo = computed<boolean>(() => store.getters['undoRedo/canUndo'])
const canRedo = computed<boolean>(() => store.getters['undoRedo/canRedo'])

// we need this check because if canUndo/canRedo becomes false, the button gets disabled and the tooltip doesn't go away
const undoTooltip = computed<string>(() => (
  canUndo.value ? lang.trans('flow-builder.undo') : ''
))
const redoTooltip = computed<string>(() => (
  canRedo.value ? lang.trans('flow-builder.redo') : ''
))

function handleUndo(): void {
  store.dispatch('undoRedo/undoAndUpdateState', null, {root: true})
}

function handleRedo(): void {
  store.dispatch('undoRedo/redoAndUpdateState', null, {root: true})
}
</script>
