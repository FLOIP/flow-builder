<template>
  <div class="fetch-contents">
    <div class="d-flex h-100 text-center">
      <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <main class="px-3">
          <h2>{{message | trans}}</h2>
          <router-link v-if="showNewButton" :to="route('flows.newFlow')"
            title="trans('flow-builder.create-a-new-flow')"
            class="mt-3 btn btn-outline-secondary mr-2 active">{{'flow-builder.new-flow' | trans}}</router-link>
          <router-link v-if="flowLink" :to="flowLink"
              title="trans('flow-builder.edit-flow')"
              class="mt-3 btn btn-outline-secondary mr-2 active">{{'flow-builder.go-to-flow' | trans}}</router-link>
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { forEach, isEmpty } from 'lodash'
import Lang from '@/lib/filters/lang'
import Routes from '@/lib/mixins/Routes'
import { Component, Prop } from 'vue-property-decorator'
import {Getter, Mutation, namespace} from 'vuex-class'
import {store} from '@/store'
const flowVuexNamespace = namespace('flow')
import {IFlow} from '@floip/flow-runner'
import { mixins } from "vue-class-component";
import {RawLocation} from "vue-router";

@Component({})
class FetchFlow extends mixins(Routes, Lang) {
  @Prop({required: true}) readonly uuid!: string
  @Prop({ default: () => ({}) }) readonly appConfig!: object
  @Prop({ default: () => ({}) }) readonly builderConfig!: object

  message = 'flow-builder.fetching-flow'
  showNewButton = false
  flowLink = null

  @flowVuexNamespace.Getter activeFlow!: IFlow
  @flowVuexNamespace.Action flow_fetch!: ({ fetchRoute }: { fetchRoute: string }) => Promise<IFlow>
  @flowVuexNamespace.Mutation flow_setActiveFlowId!: ({ flowId }: { flowId: string }) => void
  @Mutation configure!: ({ appConfig, builderConfig }: { appConfig: object; builderConfig: object }) => void
  @Getter isConfigured!: boolean

  async mounted() {
    const flowContainer = await this.flow_fetch({fetchRoute: this.route('flows.fetchFlowServer', {flowId: this.uuid})})
    if(flowContainer) {
      this.flow_setActiveFlowId({flowId: this.uuid})
      const nextUrl: RawLocation = this.$route.query.nextUrl as RawLocation
      if(nextUrl) {
        await this.$router.replace(nextUrl)
      } else {
        this.message = 'flow-builder.flow-found'
        this.flowLink = this.route('flows.editTree', {flowId: this.activeFlow.uuid, component: 'designer', mode: 'edit'})
      }
    } else{
      this.message = 'flow-builder.flow-not-found'
      this.showNewButton = true
    }
  }

  async created() {
    const {$store} = this

    forEach(store.modules, (v, k) =>
      !$store.hasModule(k) && $store.registerModule(k, v))

    if ((!isEmpty(this.appConfig) && !isEmpty(this.builderConfig)) || !this.isConfigured) {
      this.configure({ appConfig: this.appConfig, builderConfig: this.builderConfig })
    }
  }
}

export default FetchFlow

</script>

<style lang="scss">
</style>
