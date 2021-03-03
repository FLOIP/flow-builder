<template>
  <div class="new-contents">
    <div class="row">
      <div class="col-sm-8 offset-sm-2">
        <div class="card">
          <div class="card-body">
            <flow-editor :flow="activeFlow" flow-header="flow-builder.create-flow" :sidebar=false />

            <div class="float-right">
              <router-link :to="route('trees.editTree', {treeId: activeFlow.uuid, component: 'interaction-designer', mode: 'edit'})"
                class="btn btn-primary"
                event=""
                @click.native.prevent="handlePersistFlow(route('trees.editTree', {treeId: activeFlow.uuid, component: 'interaction-designer', mode: 'edit'}))">
                {{trans('flow-builder.save-and-continue')}}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import FlowEditor from '@/components/interaction-designer/flow-editors/FlowEditor.vue'
import lang from '@/lib/filters/lang'
import Routes from '@/lib/mixins/Routes'
import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import {Mutation, namespace} from 'vuex-class'
import lodash, {forEach} from 'lodash'
import {store} from '@/store'
const flowVuexNamespace = namespace('flow')
import {IFlow, IContext} from '@floip/flow-runner'

@Component<any>(
  {
    components: {
      FlowEditor,
    },
    mixins: [lang, Routes],
    async mounted() {
        await this.flow_addBlankFlow()
    },
    async created() {
      const {$store} = this

      forEach(store.modules, (v, k) =>
        !$store.hasModule(k) && $store.registerModule(k, v))

      this.configure({appConfig: this.appConfig, builderConfig: this.builderConfig});
    },
  },
)
class NewFlow extends Vue {

  handlePersistFlow(route) {
    this.flow_persist({
      persistRoute: this.route('flows.persistFlow', { flowId: this.activeFlow.uuid }),
      flowContainer: this.activeFlowContainer
    }).then((flowContainer) => {
      if(flowContainer) {
        this.$router.push(route)
      } else {
        //TODO - show error
      }
    })
  }

  @flowVuexNamespace.Action flow_addBlankFlow!: Promise<IFlow>
  @flowVuexNamespace.Action flow_persist!: Promise<IContext>
  @flowVuexNamespace.Getter activeFlow!: IFlow
  @flowVuexNamespace.Getter activeFlowContainer!: IContext
  @Mutation configure 
}

export default NewFlow

</script>

<style lang="scss">
</style>
