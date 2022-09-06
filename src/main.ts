import {createApp} from 'vue'
import BootstrapVue3 from 'bootstrap-vue-3'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import FloatingVue from 'floating-vue'

/**
 * This import modifies the jquery that should already be on the page globally at global.$
 * e.g. adding $().modal() and other jquery plugins
 */
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import 'vue-multiselect/dist/vue-multiselect.css'
// import '@/scss/main.scss'
import 'floating-vue/dist/style.css'

import registerCustomComponents from '@/common-imports'

import {createStore} from 'vuex'
import {BTabs, BTab} from 'bootstrap-vue-3'

import router from './router'
import App from './App.vue'

import storeModules from '../src/store'

const store = createStore({
  ...storeModules
})

// app.config.productionTip = false
export const app = createApp(App)

async function main() {
  app.use(router)
  app.use(store)

  app.use(FloatingVue)
  app.use(BootstrapVue3)

  app.component('BTabs', BTabs)
  app.component('BTab', BTab)
  app.component('FontAwesomeIcon', FontAwesomeIcon)

  registerCustomComponents(app)

  app.mount("#app")
}

main()

export default app;
