import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import {IRootState, store} from "@/stores"

Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
  router,
  store: new Vuex.Store<IRootState>(store),
  render: (h) => h(App),
}).$mount('#app')
