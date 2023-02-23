import Vue from 'vue'
import Vuex from 'vuex'

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

import router from './router'
import App from './App.vue'

registerCustomComponents()

Vue.use(Vuex)

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
}

main()
