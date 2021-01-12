import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import lodash from 'lodash'
import {bootstrapLegacyGlobalDependencies} from '@/store/trees/bootstrap-legacy-global-dependencies'
/**
 * This import modifies the jquery that should already be on the page globally at global.$
 * e.g. adding $().modal() and other jquery plugins
 */
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// note: we use boostrap3 compatibility, check import in vue.config.js

Vue.use(Vuex)

Vue.config.productionTip = false

const mainStore = {
  state() {
    // Make sure to have permissions loaded
    bootstrapLegacyGlobalDependencies({}, {})
    return {
      ...lodash.chain(global).get('__APP__', {}).value(),
    }
  }
}

async function main() {
  new Vue({
    router,
    store: new Vuex.Store(mainStore),
    render: (h) => h(App),
  }).$mount('#app')
}

main()
