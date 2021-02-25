<template>
  <div class="new-contents">
    <div class="row">
      <div class="col-sm-8 offset-sm-2">
        <div class="card">
          <div class="card-body">
            <flow-editor :flow="activeFlow" flow-header="flow-builder.create-flow" :sidebar=false />

            <div class="float-right">
              <router-link to="/trees/1/interaction-designer/edit"
                           class="btn btn-primary">
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
import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import {Mutation, namespace} from 'vuex-class'
import lodash, {forEach, invoke} from 'lodash'
import {store} from '@/store'
const flowVuexNamespace = namespace('flow')

@Component<any>(
  {
    components: {
      FlowEditor,
    },
    mixins: [lang],
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
  @flowVuexNamespace.Action flow_addBlankFlow!: Promise<IFlow>
  @flowVuexNamespace.Getter activeFlow!: IFlow
  @Mutation configure 
}

export default NewFlow

</script>

<style lang="scss">
</style>
