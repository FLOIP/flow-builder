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
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/scss/main.scss'

import Vuex from "vuex"
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import lodash from "lodash"
import {bootstrapLegacyGlobalDependencies} from '@/store/trees/bootstrap-legacy-global-dependencies'

Vue.use(Vuex)

const mainStore = {
  state() {
    // Make sure to have permissions & other contexts loaded from __APP__
    bootstrapLegacyGlobalDependencies({}, {})
    return {
      ...lodash.chain(global).get('__APP__', {}).value(),
    }
  }
}

@Component({
  store: new Vuex.Store(mainStore)
})
export class FlowBuilderContainer extends Vue {
}

export default FlowBuilderContainer
</script>
