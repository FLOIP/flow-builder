<template>
  <div class="undo-redo-button-group btn-group">
    <button
      v-b-tooltip.hover="undoTooltip ?? ''"
      class="btn btn-sm btn-outline-primary"
      :disabled="!canUndo"
      @click="undo">
      Undo
    </button>
    <button
      v-b-tooltip.hover="redoTooltip ?? ''"
      class="btn btn-sm btn-outline-primary"
      :disabled="!canRedo"
      @click="redo">
      Redo
    </button>
  </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator'
import {namespace} from 'vuex-class'

const undoVuexNamespace = namespace('undo')

@Component({})
export default class UndoRedoButtonGroup {
  @undoVuexNamespace.Getter canUndo: boolean
  @undoVuexNamespace.Getter canRedo: boolean
  @undoVuexNamespace.Getter undoTooltip: string | undefined
  @undoVuexNamespace.Getter redoTooltip: string | undefined

  @undoVuexNamespace.Action undo: () => void
  @undoVuexNamespace.Action redo: () => void
}

// Composition API:
//
// const canUndo = computed<boolean>(() => store.getters['undo/canUndo'])
// const canRedo = computed<boolean>(() => store.getters['undo/canRedo'])
//
// const undoTooltip = computed<string | undefined>(() => store.getters['undo/undoTooltip'])
// const redoTooltip = computed<string | undefined>(() => store.getters['undo/redoTooltip'])
//
// function undo(): void {
//   store.dispatch('undo/undo', null, {root: true})
// }
//
// function redo(): void {
//   store.dispatch('undo/redo', null, {root: true})
// }
</script>
