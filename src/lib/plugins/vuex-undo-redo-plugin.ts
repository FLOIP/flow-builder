/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/prefer-default-export */

import {Store, Plugin, MutationPayload} from 'vuex'
import {debounce} from 'lodash'

export const UNDO_REDO_SNAPSHOT_DEBOUNCE_MS = 100

export const VuexUndoRedoPlugin: Plugin<unknown> = (store: Store<any>) => {
  // Debouncing allows having cascade updates in a single undo/redo step
  const handleStateChangeDebounced = debounce(() => {
    store.dispatch('undoRedo/handleStateChange')
  }, UNDO_REDO_SNAPSHOT_DEBOUNCE_MS)

  const storeChangeHandler = (mutation: MutationPayload): void => {
    if (mutation.type !== 'flow/flow_resetFlowState' && mutation.type.startsWith('flow/')) {
      handleStateChangeDebounced()
    }
  }

  store.subscribe(storeChangeHandler)
}
