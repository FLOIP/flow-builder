// styles
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.css'
import { app } from '@storybook/vue3';
import registerCustomComponents from '@/common-imports'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

/**
 * This import modifies the jquery that should already be on the page globally at global.$
 * e.g. adding $().modal() and other jquery plugins
 */
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import 'vue-multiselect/dist/vue-multiselect.css'
import '@/scss/main.scss'

import {BTabs, BTab} from 'bootstrap-vue-3'
// Custom parameters
import viewports from './custom/viewports'
// import options from './custom/options'
// import status from './custom/status'
import controls from './custom/controls'
import actions from './custom/actions'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
import Lang from '../src/lib/filters/lang'
import {createStore} from 'vuex'
import storeModules from '../src/store'
const store = createStore({
  ...storeModules
})

export const parameters = {
  // ...components,
  ...actions,
  ...controls,
  ...viewports,
  // ...options,
  // ...status,
};

registerCustomComponents(app)

app.use(FloatingVue)
app.use(store)
app.component('BTabs', BTabs)
app.component('BTab', BTab)
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.mixin([Lang]);
