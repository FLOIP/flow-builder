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
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import 'vue-multiselect/dist/vue-multiselect.css'
import '@/scss/main.scss'
import '@/css/customized/vue-multiselect.css'

import {Options, Vue} from 'vue-class-component'

require('../../src/font-awesome-icon')

@Options({})
export class FlowBuilderContainer extends Vue {
}

export default FlowBuilderContainer
</script>
