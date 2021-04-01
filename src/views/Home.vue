<template>
  <div class="home-contents">
    <div class="d-flex h-100 text-center">
      <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <main class="px-3">
          <h1>Create a new Flow</h1>
          <router-link :to="route('flows.newFlow')"
            title="trans('flow-builder.create-a-new-flow')"
            class="mt-3 btn btn-outline-secondary mr-2 active">{{'flow-builder.new-flow' | trans}}</router-link>
          <div class="mt-4">
            <h2>Existing Flows</h2>
            <div v-for="flow in flows">
              <router-link :to="route('trees.editTree', {treeId: flow.uuid, component: 'interaction-designer', mode: 'edit'})"
                  title="trans('flow-builder.edit-flow')"
                  class="mt-3 btn btn-outline-secondary mr-2 active">{{flow.label || flow.uuid}}</router-link>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import lang from '@/lib/filters/lang'
import Routes from '@/lib/mixins/Routes'
import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import { forEach } from 'lodash'
import {store} from '@/store'
import {Mutation, namespace} from 'vuex-class'
import {IFlow} from '@floip/flow-runner'
const flowVuexNamespace = namespace('flow')

@Component<any>(
  {
    mixins: [lang, Routes],
    async created() {
      const {$store} = this

      forEach(store.modules, (v, k) =>
        !$store.hasModule(k) && $store.registerModule(k, v))

      this.configure({})
    },
  },
)
class Home extends Vue {
  @flowVuexNamespace.State flows!: IFlow[]
  @Mutation configure
}

export default Home

</script>
<style lang="scss">
</style>
