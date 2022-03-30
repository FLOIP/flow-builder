import Vuex from 'vuex'
import MobilePrimitives_MessageBlock from '@/components/interaction-designer/block-types/MobilePrimitives_MessageBlock.vue'
import {createLocalVue, mount, shallowMount} from '@vue/test-utils'
import {keyBy} from 'lodash'
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

import trees from '@/store/trees/trees'
import audio from '@/store/trees/audio'
import {store as flow} from '@/store/flow'
import {store as builder} from '@/store/builder'
import {store as validation} from '@/store/validation'
import {store as clipboard} from '@/store/clipboard'

import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
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
import CustomIcons from '@/lib/custom-icons'
import {IRootState} from '@/store'
import SAMPLE_FLOW from './SampleFlow'

const localVue = createLocalVue()
localVue.use(Vuex)

const Components: { [key: string]: any } = {
  ...commonComponents,
  // ...interactionDesignerComponents,
  ...blockEditorsComponents,
  ...blockTypesComponents,
  // ...blocksComponents,
  ...flowEditorsComponents,
  // ...flowImportComponents,
  ...blockResourceEditorsComponents,
  // ...resourceEditorComponents,
  // ...toolbarComponents,
  FontAwesomeIcon,
}

Object.entries(Components).forEach((component) => {
  localVue.component(component[0], component[1])
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

const store = new Vuex.Store<IRootState>({
  modules: {
    flow: {
      ...flow,
      namespaced: true,
      getters: {
        resourcesByUuid: () => keyBy(SAMPLE_FLOW.resources, (resource) => resource.uuid),
      },
    },
    builder,
    validation,
    // trees,
    // audio,
    // clipboard,
  },
})

describe('Unaltered message block has the expected content', () => {
  const wrapper = shallowMount(MobilePrimitives_MessageBlock, {
    store,
    localVue,
    propsData: {
      flow: SAMPLE_FLOW,
      block: SAMPLE_FLOW.flows[0].blocks[0],
    },
  })

  test('It is mounted correctly and the root div is available', () => {
    const rootDiv = wrapper.find('.mobile-primitive-message-block')
    expect(rootDiv.exists()).toBe(true)
  })

  test('It has the default resource editor', () => {
    const el = wrapper.find('.resource-editor')
    expect(el.exists()).toBe(true)
  })

  test('It has the default branching config', () => {
    const el = wrapper.find('.block-output-branching-config')
    expect(el.exists()).toBe(true)
  })

  test('It doesn\'t have a contact property editor', () => {
    const el = wrapper.find('.generic-contact-property-editor')
    expect(el.exists()).toBe(false)
  })
})

const CustomizedMessageBlock = {
  template: `
    <MobilePrimitives_MessageBlock>
      <template slot="resource-editors">
        <div class="my-overridden-resource-editor"/>
      </template>
      <!--<template slot="extras"></template>-->
      <!--<template slot="vendor-extras"></template>-->
      <!--<template slot="branching"></template>-->
      <!--<template slot="contact-props"></template>-->
    </MobilePrimitives_MessageBlock>
  `,
}

describe('Customized message block has the expected content', () => {
  const wrapper = shallowMount(CustomizedMessageBlock, {
    store,
    localVue,
    propsData: {
      // revert default values
      usesDefaultBranchingEditor: false,
      usesDefaultContactPropsEditor: true,
    },
  })

  test('It is mounted correctly and the root div is available', () => {
    const rootDiv = wrapper.find('.mobile-primitive-message-block')
    expect(rootDiv.exists()).toBe(true)
  })

  test('It doesn\'t have the default branching config', () => {
    const el = wrapper.find('.block-output-branching-config')
    expect(el.exists()).toBe(false)
  })

  test('It doesn\'t have the resource editor', () => {
    const el = wrapper.find('.resource-editor')
    expect(el.exists()).toBe(false)
  })

  test('It has the generic contact property editor', () => {
    const el = wrapper.find('.generic-contact-property-editor')
    expect(el.exists()).toBe(true)
  })
})
