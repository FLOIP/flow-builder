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

import './class-component-hooks'
import registerCustomComponents from '@/common-imports'

import router from './router'
import App from './App.vue'

registerCustomComponents()

Vue.use(Vuex)

Vue.config.productionTip = false

async function main() {
  new Vue({
    router,
    store: new Vuex.Store({}),
    render: (h) => h(Vue.extend(App)),
  }).$mount('#app')
}

main()
