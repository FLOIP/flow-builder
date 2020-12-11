import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'

Vue.use(Vuex)

Vue.config.productionTip = false

function exportAsGlobal(exports) {
  Object.assign(window, exports)
}

async function initializeBootstrapFramework() {
  import('bootstrap/dist/css/bootstrap.css')
  import('bootstrap/dist/css/bootstrap-theme.css')

  const {default: ImportedJquery} = await import('jquery')
  exportAsGlobal({
    $: ImportedJquery,
    jQuery: ImportedJquery})

  await import('bootstrap')
}

async function main() {
  await initializeBootstrapFramework()

  new Vue({
    router,
    store: new Vuex.Store({}),
    render: (h) => h(App),
  }).$mount('#app')
}

main()
