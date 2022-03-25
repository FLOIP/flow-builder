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

import * as commonComponents from '@/components/common'
import * as interactionDesignerComponents from '@/components/interaction-designer/'
import * as blockEditorsComponents from '@/components/interaction-designer/block-editors'
import * as blockTypesComponents from '@/components/interaction-designer/block-types'
import * as flowEditorsComponents from '@/components/interaction-designer/flow-editors'
import * as flowImportComponents from '@/components/interaction-designer/flow-editors/import'
import * as resourceEditorsComponents from '@/components/interaction-designer/resource-editors'
import * as toolbarComponents from '@/components/interaction-designer/toolbar'
import TreeBuilderToolbar from '@/components/interaction-designer/toolbar/TreeBuilderToolbar.vue'
import router from './router'
import App from './App.vue'

require('./font-awesome-icon')

Vue.component('TreeBuilderToolbar', TreeBuilderToolbar)

Object.entries({
  ...commonComponents,
  ...interactionDesignerComponents,
  ...blockEditorsComponents,
  ...blockTypesComponents,
  ...flowEditorsComponents,
  ...flowImportComponents,
  ...resourceEditorsComponents,
  ...toolbarComponents
}).forEach((component) => {
  Vue.component(component[0], component[1])
})

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
