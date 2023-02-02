import {ref} from 'vue'
import {useManualRefHistory} from '@vueuse/core'
import {cloneDeep} from 'lodash'

const counter = ref({
  myArray: [0, 0, 0],
  myString: '000',
})

const {history, commit, undo, redo, canUndo, canRedo, undoStack, redoStack, last, source, reset, clear} = useManualRefHistory(counter, {
  // enable 'mutable'
  clone: cloneDeep,
})

// immutable
function doSomething(): void {
  counter.value = {
    ...counter.value,
    myString: `${counter.value.myString}1`,
    myArray: [
      ...counter.value.myArray,
      1,
    ],
  }
}

// mutable
function doSomethingElse(): void {
  counter.value.myArray.push(2)
  counter.value.myString += '2'
}

export {
  counter,
  doSomething,
  doSomethingElse,

  history, commit, undo, redo, canUndo, canRedo, undoStack, redoStack, last, source, reset, clear,
}
