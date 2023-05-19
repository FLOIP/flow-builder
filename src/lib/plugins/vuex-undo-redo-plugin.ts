/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/prefer-default-export */

import {Store, Plugin, MutationPayload} from 'vuex'
import {debounce} from 'lodash'

export const VuexUndoRedoPlugin: Plugin<unknown> = (store: Store<any>) => {
  const storeChangeHandler = (mutation: MutationPayload): void => {
    if (!mutation.type.startsWith('undoRedo/')) {
      store.dispatch('undoRedo/handleStateChange')
    }
  }

  // Debouncing allows having cascade updates in a single undo/redo step
  store.subscribe(debounce(storeChangeHandler, 100))
}
