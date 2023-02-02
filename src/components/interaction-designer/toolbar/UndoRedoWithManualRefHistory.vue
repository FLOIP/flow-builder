<template>
  <div class="undo-redo-with-manual-ref-history">
    <div>
      myString
      {{ counter.myString }}
    </div>
    <div>
      myArray
      {{ counter.myArray }}
    </div>
    <div>
      undoStack
      {{ undoStack }}
    </div>
    <div>
      redoStack
      {{ redoStack }}
    </div>
    <div>
      last
      {{ last }}
    </div>
    <div>
      history
      {{ history }}
    </div>
    <div>
      source
      {{ source }}
    </div>
    <div class="btn-group">
      <button
        class="btn btn-sm btn-outline-primary"
        @click="handleDoSmth">
        do smth
      </button>
      <button
        class="btn btn-sm btn-outline-primary"
        @click="handleDoSmthElse">
        do smth else
      </button>
      <button
        class="btn btn-sm btn-outline-primary"
        :disabled="!canUndo"
        @click="undo">
        Undo
      </button>
      <button
        class="btn btn-sm btn-outline-primary"
        :disabled="!canRedo"
        @click="redo">
        Redo
      </button>
      <button
        class="btn btn-sm btn-outline-primary"
        @click="clear">
        Clear
      </button>
      <button
        class="btn btn-sm btn-outline-primary"
        @click="reset">
        Reset
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {history, commit, undo, redo, canUndo, canRedo, undoStack, redoStack, last, source, reset, clear, counter, doSomething, doSomethingElse} from '@/store/undo/testManualRefHistory'

function handleDoSmth(): void {
  commit()
  doSomething()
}

function handleDoSmthElse(): void {
  commit()
  doSomethingElse()
}

</script>
