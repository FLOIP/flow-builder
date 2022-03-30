import Vue from 'vue'
import {library} from '@fortawesome/fontawesome-svg-core'
import {
  faCheckCircle,
  faCircle,
  faClone,
  faCommentDots, faDotCircle,
  faEdit,
  faEnvelope,
  faTimesCircle,
  faTrashAlt,
} from '@fortawesome/free-regular-svg-icons'
import {faCheck, faChevronDown, faChevronUp, faMobileAlt} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import Vuex from 'vuex'
import CustomIcons from '@/lib/custom-icons'
import * as commonComponents from '@/components/common'
import * as interactionDesignerComponents from '@/components/interaction-designer'
import * as blockEditorsComponents from '@/components/interaction-designer/block-editors'
import * as blockTypesComponents from '@/components/interaction-designer/block-types'
import * as blocksComponents from '@/components/interaction-designer/blocks'
import * as flowEditorsComponents from '@/components/interaction-designer/flow-editors'
import * as flowImportComponents from '@/components/interaction-designer/flow-editors/import'
import * as blockResourceEditorsComponents from '@/components/interaction-designer/resource-editors'
import * as resourceEditorComponents from '@/components/resource-editor'
import * as toolbarComponents from '@/components/interaction-designer/toolbar'

import App from '@/App.vue'
import router from '@/router'

import {shallowMount, createLocalVue} from '@vue/test-utils'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)

const Components: { [key: string]: any } = {
  ...commonComponents,
  ...interactionDesignerComponents,
  ...blockEditorsComponents,
  ...blockTypesComponents,
  ...blocksComponents,
  ...flowEditorsComponents,
  ...flowImportComponents,
  ...blockResourceEditorsComponents,
  ...resourceEditorComponents,
  ...toolbarComponents,
}

Object.entries(Components).forEach((component) => {
  Vue.component(component[0], component[1])
})

library.add(
  faCircle,
  faCheckCircle,
  faEdit,
  faCheck,
  faEnvelope,
  faMobileAlt,
  faCommentDots,
  faClone,
  faTrashAlt,
  faTimesCircle,
  faDotCircle,
  faChevronDown,
  faChevronUp,
  ...CustomIcons,
)
Vue.component('FontAwesomeIcon', FontAwesomeIcon)

Vue.use(Vuex)

Vue.config.productionTip = false

describe('Mounted App', () => {
  const wrapper = shallowMount(App, {
    localVue,
    router,
  })

  test('does a wrapper exist', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
