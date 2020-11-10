import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";

Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
  router,
  store: new Vuex.Store({}),
  render: (h) => h(App),
}).$mount('#app')
