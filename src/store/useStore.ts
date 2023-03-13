import {inject} from 'vue'
import {Store} from 'vuex'

// todo CORE-155: remove this after migration to Vue3; use the built-in useStore() instead
// eslint-disable-next-line import/prefer-default-export
export function useStore(): Store<unknown> {
  return inject<Store<unknown>>('store')!
}
