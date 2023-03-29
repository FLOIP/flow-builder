import {inject} from 'vue'
import {Store} from 'vuex'
import {IRootState} from '@/store/index'

// todo CORE-155: remove this after migration to Vue3; use the built-in useStore() instead
// eslint-disable-next-line import/prefer-default-export
export function useStore(): Store<IRootState> {
  return inject('store')!
}
