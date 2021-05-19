<template>
  <div>
    <flow-builder-container v-if="block || flow">
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
    </flow-builder-container>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component, Prop} from 'vue-property-decorator'

  import {
    Mutation,
  } from 'vuex-class'

  import FlowBuilderContainer from "./FlowBuilderContainer.vue";
  import {IFlow, IBlock} from '@floip/flow-runner'

  @Component({
    components: {
      FlowBuilderContainer
    }
  })
  export class FlowBuilderSidebarEditorContainer extends Vue {
    @Prop({default: null}) readonly block!: IBlock
    @Prop({default: null}) readonly flow!: IFlow
    created() {

      this.configure({appConfig: {}, builderConfig: {}, supportedBlockTypes: {}});

    }
    @Mutation configure: any
  }

  export default FlowBuilderSidebarEditorContainer
</script>
