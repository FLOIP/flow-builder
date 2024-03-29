import Vue from 'vue'
import Vuex from 'vuex'

// allow us to assign new properties to window, eg: window.store = store
// useful cypress setup
declare global {
  interface Window {
    Cypress: any
    app: any
    store: any
  }
}

/**
 * This import modifies the jquery that should already be on the page globally at global.$
 * e.g. adding $().modal() and other jquery plugins
 */
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import 'scss/main.scss'

import registerCustomComponents from '@/common-imports'

import Toast from 'vue-toastification'
import {ToastOptions} from 'vue-toastification/dist/types/src/types'
import {POSITION} from 'vue-toastification/src/ts/constants'
import router from './router'
import App from './App.vue'
import 'vue-toastification/dist/index.css'

registerCustomComponents()

Vue.use(Vuex)

/**
 * For more details about:
 * - available options, see https://vue-toastification.maronato.dev/
 * - Dismiss toasts programmatically OR update toasts' content, see https://www.npmjs.com/package/vue-toastification
 */
const VUE_TOAST_GENERAL_OPTIONS: ToastOptions = {
  position: POSITION.TOP_RIGHT,
  draggable: true,
  draggablePercent: 0.6,
  closeOnClick: false,
  timeout: false,
}
Vue.use(Toast, VUE_TOAST_GENERAL_OPTIONS)

Vue.config.productionTip = false

// todo CORE-155: inline 'store' after migration to Vue3
const store = new Vuex.Store({})

async function main(): Promise<void> {
  new Vue({
    router,
    store,
    // todo CORE-155: remove 'provide' after migration to Vue3; use the built-in useStore() instead
    provide: {store},
    render: (h) => h(Vue.extend(App)),
  }).$mount('#app')

  if (window?.Cypress !== undefined) {
    console.debug('Cypress detected, exposing app on window')
    // This will allow us to test vuex store in Cypress
    window.store = store
  } else {
    console.debug('Cypress not detected, app not exposed on window')
  }
}

main()
