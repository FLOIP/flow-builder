<template>
  <div class="new-contents">
    <div v-if="activeFlow" class="row">
      <div class="col-sm-8 offset-sm-2">
        <div class="card">
          <div class="card-body">
            <div v-if="flowError" class="alert alert-danger" role="alert">
              {{flowError | trans}}
            </div>
            <flow-editor :flow="activeFlow" flow-header="flow-builder.create-flow" :sidebar=false />

            <div class="float-right">
              <router-link :to="route('trees.editTree', {treeId: activeFlow.uuid, component: 'interaction-designer', mode: 'edit'})"
                class="btn btn-primary"
                event=""
                @click.native.prevent="handlePersistFlow(route('trees.editTree', {treeId: activeFlow.uuid, component: 'interaction-designer', mode: 'edit'}))">
                {{'flow-builder.save-and-continue' | trans}}
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
import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import {Getter, Mutation, namespace} from 'vuex-class'
import { forEach, isEmpty } from 'lodash'
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

      if((!isEmpty(this.appConfig) && !isEmpty(this.builderConfig)) || !this.isConfigured) {
        this.configure({appConfig: this.appConfig, builderConfig: this.builderConfig});
      }
    },
  },
)
class NewFlow extends Vue {
  @Prop({default: () => ({})}) readonly appConfig!: object
  @Prop({default: () => ({})}) readonly builderConfig!: object

  handlePersistFlow(route) {
    this.flowError = null
    this.flow_persist({
      persistRoute: this.route('flows.persistFlow', { flowId: this.activeFlow.uuid }),
      flowContainer: this.activeFlowContainer
    }).then((flowContainer) => {
      if(flowContainer) {
        this.$router.push(route)
      } else {
        this.flowError = 'flow-builder.problem-creating-flow'
        //TODO - hook into validation system when we have it.
      }
    })
  }

  flowError = null;

  @flowVuexNamespace.Action flow_addBlankFlow!: Promise<IFlow>
  @flowVuexNamespace.Action flow_persist!: Promise<IContext>
  @flowVuexNamespace.Getter activeFlow!: IFlow
  @flowVuexNamespace.Getter activeFlowContainer!: IContext
  @Mutation configure 
  @Getter isConfigured!: boolean
}

export default NewFlow

</script>

<style lang="scss">
</style>
