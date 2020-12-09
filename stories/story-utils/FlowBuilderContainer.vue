<template>
  <div id="viamo-app"
       class="viamo-app-container flow-builder-sidebar-editor-container">
    <div class="container-full">
      <div class="main-content-container">
        <section id="tree-app">
          <div id="tree-interaction-designer" class="edit-tree">
            <div class="interaction-designer-contents panel panel-default">
              <slot/>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import '@/css/InteractionDesigner.css'
import '@/css/voto3.css'

import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'

@Component({})
export class FlowBuilderContainer extends Vue {

}

export default FlowBuilderContainer
</script>
