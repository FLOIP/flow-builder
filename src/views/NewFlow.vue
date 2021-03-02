<template>
  <div class="new-contents">
    <div class="row">
      <div class="col-sm-8 offset-sm-2">
        <div class="card">
          <div class="card-body">
            <flow-editor :flow="activeFlow" flow-header="flow-builder.create-flow" :sidebar=false />

            <div class="float-right">
  //TODO - don't hard code this link, pull from config
              <router-link to="/trees/1/interaction-designer/edit"
                class="btn btn-primary"
                @click.native="handlePersistFlow">
                {{trans('flow-builder.save-and-continue')}}
                //TODO add on submit action which attempts to persist, persist route echos flow back on success - replace the flow with this if not null, otherwise don't redirect and give generic "There was an error" message
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
import lodash, {forEach, invoke} from 'lodash'
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

  handlePersistFlow() {
    this.flow_persist({
      persistRoute: this.route('flows.persistFlow', { flowId: this.activeFlow.uuid }),
      flowContainer: this.activeFlowContainer
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
