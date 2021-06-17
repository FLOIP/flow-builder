<template>
  <div class="new-contents">
    <div
      v-if="activeFlow"
      class="row">
      <div class="col-sm-8 offset-sm-2">
        <div class="card">
          <div class="card-body">
            <div
              v-if="flowError"
              class="alert alert-danger"
              role="alert">
              {{ flowError | trans }}
            </div>
            <flow-editor
              :flow="activeFlow"
              flow-header="flow-builder.create-flow"
              :sidebar="false">
              <div class="float-right">
                <a
                  :href="route('trees.editTree', {treeId: activeFlow.uuid, component: 'interaction-designer', mode: 'edit'})"
                  class="btn btn-primary"
                  @click.prevent="handlePersistFlow(route('trees.editTree', {treeId: activeFlow.uuid, component: 'interaction-designer', mode: 'edit'}))">
                  {{ 'flow-builder.save-and-continue' | trans }}
                </a>
              </div>
            </flow-editor>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import FlowEditor from '@/components/interaction-designer/flow-editors/FlowEditor.vue'
import {lang} from '@/lib/filters/lang'
import Routes from '@/lib/mixins/Routes'
import {Component, Prop} from 'vue-property-decorator'
import Vue from 'vue'
import {Getter, Mutation, namespace} from 'vuex-class'
import {forEach, isEmpty} from 'lodash'
import {store} from '@/store'
import {IContext, IFlow} from '@floip/flow-runner'
import {RawLocation} from 'vue-router'

const flowVuexNamespace = namespace('flow')

@Component(
  {
    components: {
      FlowEditor,
    },
    mixins: [lang, Routes],
  },
)
class NewFlow extends Vue {
  @Prop({default: () => ({})}) readonly appConfig!: object
  @Prop({default: () => ({})}) readonly builderConfig!: object

  async mounted(): Promise<void> {
    await this.flow_addBlankFlow()
  }

  async created(): Promise<void> {
    const {$store} = this

    forEach(store.modules, (v, k) =>
      !$store.hasModule(k) && $store.registerModule(k, v))

    if ((!isEmpty(this.appConfig) && !isEmpty(this.builderConfig)) || !this.isConfigured) {
      this.configure({appConfig: this.appConfig, builderConfig: this.builderConfig})
    }
  }

  async handlePersistFlow(route: RawLocation): Promise<void> {
    this.flowError = null
    const flowContainer = await this.flow_persist({
      // Would need to switch mixins to class components to fix this - https://class-component.vuejs.org/guide/extend-and-mixins.html#mixins
      persistRoute: this.route('flows.persistFlow', {flowId: this.activeFlow.uuid}),
      flowContainer: this.activeFlowContainer,
    })
    if (flowContainer) {
      await this.$router.push(route)
    } else {
      this.flowError = 'flow-builder.problem-creating-flow'
      //TODO - hook into validation system when we have it.
    }
  }

  flowError: string | null = null

  @flowVuexNamespace.Action flow_addBlankFlow!: () => Promise<IFlow>
  @flowVuexNamespace.Action flow_persist!: ({
    persistRoute,
    flowContainer,
  }: { persistRoute: any, flowContainer: IContext }) => Promise<IContext | null>
  @flowVuexNamespace.Getter activeFlow!: IFlow
  @flowVuexNamespace.Getter activeFlowContainer!: IContext
  @Mutation configure!: ({appConfig, builderConfig}: { appConfig: object, builderConfig: object }) => void
  @Getter isConfigured!: boolean
}

export default NewFlow

</script>

<style lang="scss">
</style>
