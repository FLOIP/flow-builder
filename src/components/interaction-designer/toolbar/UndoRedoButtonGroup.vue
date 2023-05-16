<template>
  <div class="undo-redo-button-group btn-group">
    <button
      class="btn btn-sm btn-outline-primary"
      :disabled="!canUndo"
      @click.stop="handleUndo">
      <font-awesome-icon :icon="['fas', 'undo']" />
      <!--v-b-tooltip.hover="undoTooltip"-->
    </button>
    <button
      class="btn btn-sm btn-outline-primary"
      :disabled="!canRedo"
      @click.stop="handleRedo">
      <font-awesome-icon :icon="['fas', 'redo']" />
      <!--v-b-tooltip.hover="redoTooltip"-->
    </button>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {useStore} from '@/store/useStore'

const store = useStore()

const canUndo = computed<boolean>(() => store.getters['undoRedo/canUndo'])
const canRedo = computed<boolean>(() => store.getters['undoRedo/canRedo'])

// const undoTooltip = computed<string | undefined>(() => store.getters['undoRedo/undoTooltip'])
// const redoTooltip = computed<string | undefined>(() => store.getters['undoRedo/redoTooltip'])

function handleUndo(): void {
  store.dispatch('undoRedo/undoAndUpdateState', null, {root: true})
}

function handleRedo(): void {
  store.dispatch('undoRedo/redoAndUpdateState', null, {root: true})
}
</script>
