<template>
  <div v-if="block || flow"
      id="viamo-app" 
      class="viamo-app-container flow-builder-sidebar-editor-container">
    <div class="container-full">
      <div class="main-content-container">
        <section id="tree-app">
          <div id="tree-interaction-designer" class="edit-tree">
            <div class="interaction-designer-contents panel panel-default">
              <div class="hidden-print hidden-xs hidden-sm tree-sidebar-menu-container">
                <nav class="bs-docs-sidebar">
                  <div id="tree-sidebar" class="tree-sidebar-menu">
                    <div v-if="block" class="tree-sidebar-edit-block"
                        :data-block-type="block.type"
                        :data-for-block-id="block.uuid">
                      <slot/>
                    </div>
                    <div v-else-if="flow" class="tree-sidebar-edit-flow"
                        :data-for-flow-id="flow.uuid">
                      <slot/>
                    </div>
                  </div>
                </nav>
              </div>
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

  import {IFlow, IBlock} from '@floip/flow-runner'

  @Component({})
  export class FlowBuilderSidebarEditorContainer extends Vue {
    @Prop({default: null}) readonly block!: IBlock
    @Prop({default: null}) readonly flow!: IFlow
  }
  export default FlowBuilderSidebarEditorContainer
</script>
