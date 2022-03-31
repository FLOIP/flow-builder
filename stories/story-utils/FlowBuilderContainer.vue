<template>
  <div
    id="viamo-app"
    class="viamo-app-container flow-builder-sidebar-editor-container">
    <div class="container-full">
      <div class="main-content-container">
        <section id="tree-app">
          <div
            id="tree-interaction-designer"
            class="edit-tree">
            <div class="interaction-designer-contents panel panel-default">
              <slot />
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import '@/css/stories/InteractionDesigner.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import '@/scss/main.scss'
import '@/css/customized/vue-multiselect.css'

import Vue from 'vue'
import {Component} from 'vue-property-decorator'

/**
 * Vue way for Fontawesome
 * more details: https://www.npmjs.com/package/@fortawesome/vue-fontawesome#the-icon-property
 *
 */
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCheck, faMobileAlt} from '@fortawesome/free-solid-svg-icons'
import {faCheckCircle, faCircle, faClone, faTrashAlt, faEdit, faEnvelope, faCommentDots} from '@fortawesome/free-regular-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import CustomIcons from '../../src/lib/custom-icons/index'

library.add(faCircle, faCheckCircle, faEdit, faCheck, faEnvelope, faMobileAlt, faCommentDots, faClone, faTrashAlt, ...CustomIcons)
Vue.component('FontAwesomeIcon', FontAwesomeIcon)

@Component({})
export class FlowBuilderContainer extends Vue {
}

export default FlowBuilderContainer
</script>
