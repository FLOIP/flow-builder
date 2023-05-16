<template>
  <div class="undo-redo-button-group btn-group">
    <button
      class="btn btn-sm btn-outline-primary"
      @click.stop="handleUndo">
      <font-awesome-icon :icon="['fas', 'undo']" />
      <!--v-b-tooltip.hover="undoTooltip"-->
      <!--:disabled="!canUndo"-->
      <!--Undo-->
    </button>
    <button
      class="btn btn-sm btn-outline-primary"
      @click.stop="handleRedo">
      <font-awesome-icon :icon="['fas', 'redo']" />
      <!--v-b-tooltip.hover="redoTooltip"-->
      <!--:disabled="!canRedo"-->
      <!--Redo-->
    </button>
  </div>
</template>

<script setup lang="ts">
import {useStore} from '@/store/useStore'

const store = useStore()

// const canUndo = computed<boolean>(() => store.getters['undoRedo/canUndo'])
// const canRedo = computed<boolean>(() => store.getters['undoRedo/canRedo'])
// const undoTooltip = computed<string | undefined>(() => store.getters['undoRedo/undoTooltip'])
// const redoTooltip = computed<string | undefined>(() => store.getters['undoRedo/redoTooltip'])

function handleUndo(): void {
  store.dispatch('undoRedo/undoAndUpdateState', null, {root: true})
}

function handleRedo(): void {
  store.dispatch('undoRedo/redoAndUpdateState', null, {root: true})
}

// Options API
//
// const undoRedoVuexNamespace = namespace('undoRedo')
//
// @Component({})
// export default class UndoRedoButtonGroup {
//   // @undoRedoVuexNamespace.Getter canUndo: boolean
//   // @undoRedoVuexNamespace.Getter canRedo: boolean
//   // @undoRedoVuexNamespace.Getter undoTooltip: string
//   // @undoRedoVuexNamespace.Getter redoTooltip: string
//
//   handleUndo() {
//     this.undoAndUpdateState()
//   }
//
//   handleRedo() {
//     this.redoAndUpdateState()
//   }
//
//   @undoRedoVuexNamespace.Action undoAndUpdateState!: () => void
//   @undoRedoVuexNamespace.Action redoAndUpdateState!: () => void
// }
</script>
