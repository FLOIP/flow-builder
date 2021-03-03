<template>
  <div class="fetch-contents">
    <div class="d-flex h-100 text-center">
      <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <main class="px-3">
          <p>{{trans(message)}}</p>
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import lodash, {forEach} from 'lodash'
import lang from '@/lib/filters/lang'
import Routes from '@/lib/mixins/Routes'
import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import {Mutation, namespace} from 'vuex-class'
import {store} from '@/store'
const flowVuexNamespace = namespace('flow')
import {IFlow} from '@floip/flow-runner'

@Component<any>(
  {
    mixins: [lang, Routes],
    async mounted() {
      this.flow_fetch({fetchRoute: this.route('flows.fetchFlowServer', {flowId: this.id})}).then((flow) => {
        console.log("fetched")
        if(flow) {
          this.$router.push(this.route('trees.editTree', {treeId: this.activeFlow.uuid, component: 'interaction-designer', mode: 'edit'}))
        } else{
          this.message = 'flow-builder.flow-not-found'
        }
      })
    },
    async created() {
      const {$store} = this

      forEach(store.modules, (v, k) =>
        !$store.hasModule(k) && $store.registerModule(k, v))

      this.configure({appConfig: this.appConfig, builderConfig: this.builderConfig});
    },
  },
)
class FetchFlow extends Vue {
  //TODO - this should be uuid (elsewhere also)
  @Prop({required: true}) readonly id!: string 

  message = 'flow-builder.fetching-flow'

  @flowVuexNamespace.Getter activeFlow!: IFlow
  @flowVuexNamespace.Action flow_fetch!: Promise<IFlow>
  @Mutation configure 
}

export default FetchFlow 

</script>

<style lang="scss">
</style>
