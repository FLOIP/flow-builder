import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import {IRootState, store} from "@/store"

Vue.use(Vuex)

Vue.config.productionTip = false

import '@/domain/bootstrap-legacy'

new Vue({
  router,
  store: new Vuex.Store<IRootState>(store),
  render: (h) => h(App),
}).$mount('#app')
