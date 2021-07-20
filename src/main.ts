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

/**
 * Vue way for Fontawesome
 * more details: https://www.npmjs.com/package/@fortawesome/vue-fontawesome#the-icon-property
 *
 */
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCheck, faMobileAlt} from '@fortawesome/free-solid-svg-icons'
import {faCheckCircle, faCircle, faClone, faTrashAlt, faEdit, faEnvelope, faCommentDots} from '@fortawesome/free-regular-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import CustomIcons from './lib/custom-icons/index'
import router from './router'
import App from './App.vue'

library.add(faCircle, faCheckCircle, faEdit, faCheck, faEnvelope, faMobileAlt, faCommentDots, faClone, faTrashAlt, ...CustomIcons)
Vue.component('FontAwesomeIcon', FontAwesomeIcon)

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
