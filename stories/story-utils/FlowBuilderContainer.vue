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

require('../../src/font-awesome-icon')

@Component({})
export class FlowBuilderContainer extends Vue {
}

export default FlowBuilderContainer
</script>
